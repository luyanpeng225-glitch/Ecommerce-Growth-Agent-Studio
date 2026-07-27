import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const startedAtMs = Date.now();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const abs = (relativePath) => path.resolve(projectRoot, relativePath);

const paths = {
  executionLog: 'outputs/workflow_execution_log.json',
  failureTest: 'outputs/failure_scenario_test_report.json',
  artifactValidation: 'outputs/artifact_validation_report.json',
  complianceValidation: 'outputs/two_stage_compliance_validation_report.json',
  humanApproval: 'outputs/human_approval_record.json',
  schema: 'schemas/artifacts/workflow_metrics_report.schema.json',
  reportJson: 'outputs/workflow_metrics_report.json',
  reportMd: 'outputs/workflow_metrics_report.md'
};

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(abs(relativePath), 'utf8'));
}

function rate(passed, total) {
  return total === 0 ? 0 : Number(((passed / total) * 100).toFixed(2));
}

function check(checkId, condition, sourcePath) {
  return { check_id: checkId, status: condition ? 'pass' : 'failed', source_path: sourcePath };
}

function buildMarkdown(report) {
  const checks = report.metric_integrity.checks
    .map((item) => `| ${item.check_id} | ${item.status} | ${item.source_path} |`)
    .join('\n');

  return `# Workflow Metrics Report\n\n` +
    `## Dashboard\n\n` +
    `| Metric | Value | Evidence |\n| --- | --- | --- |\n` +
    `| Planner Time | not available | historical_not_available |\n` +
    `| Failure Scenario Test Time | ${report.runtime_metrics.failure_scenario_test_runtime.value} ms | measured |\n` +
    `| Workflow Retry | ${report.runtime_metrics.workflow_retry_count.value} | deterministic_verified, failure test only |\n` +
    `| JSON Parse | ${report.quality_metrics.json_parse_rate.passed}/${report.quality_metrics.json_parse_rate.total} (${report.quality_metrics.json_parse_rate.rate_percent}%) | deterministic_verified |\n` +
    `| Schema Match | ${report.quality_metrics.schema_match_rate.passed}/${report.quality_metrics.schema_match_rate.total} (${report.quality_metrics.schema_match_rate.rate_percent}%) | deterministic_verified |\n` +
    `| Failure Assertions | ${report.quality_metrics.failure_assertion_rate.passed}/${report.quality_metrics.failure_assertion_rate.total} | deterministic_verified |\n` +
    `| Compliance Validation | ${report.governance_metrics.compliance.validation_status} | artifact_derived |\n` +
    `| Compliance Governance | ${report.governance_metrics.compliance.governance_status} | artifact_derived |\n` +
    `| Human Review | ${report.governance_metrics.human_review.status} | artifact_derived |\n` +
    `| Risk | ${report.governance_metrics.risk_tracking.unresolved} unresolved + ${report.governance_metrics.risk_tracking.newly_detected} newly detected | artifact_derived |\n` +
    `| Final Score | not available | no calibrated weighting |\n\n` +
    `## Overall\n\n` +
    `- workflow_status: ${report.overall.workflow_status}\n` +
    `- final_score: ${report.overall.final_score.value}\n` +
    `- final_score_availability: ${report.overall.final_score.availability}\n` +
    `- production_ready: ${report.boundaries.production_ready}\n` +
    `- customer_validated: ${report.boundaries.customer_validated}\n\n` +
    `${report.overall.summary}\n\n` +
    `## Metric Integrity Checks\n\n` +
    `| check_id | status | source |\n| --- | --- | --- |\n${checks}\n\n` +
    `## Release Gates\n\n` +
    Object.entries(report.release_gates).map(([gate, status]) => `- ${gate}: ${status}`).join('\n') +
    `\n\n## Limitations\n\n` +
    report.limitations.map((item) => `- ${item}`).join('\n') + '\n';
}

const executionLog = readJson(paths.executionLog);
const failureTest = readJson(paths.failureTest);
const artifactValidation = readJson(paths.artifactValidation);
const complianceValidation = readJson(paths.complianceValidation);
const humanApproval = readJson(paths.humanApproval);
const reportSchema = readJson(paths.schema);

const historicalSummary = executionLog.workflow_summary;
const failureAssertionsPassed = failureTest.assertions.filter((item) => item.status === 'pass').length;
const checkedGates = complianceValidation.release_gate_checks.checked_gates;
const releaseGates = failureTest.release_gates;
const releaseGatesBlocked = checkedGates.every((gate) => releaseGates[gate] === 'blocked');
const riskSets = complianceValidation.risk_tracking_checks.sets;

const integrityChecks = [
  check('historical_node_count_is_15', historicalSummary.node_count === 15, paths.executionLog),
  check('historical_runtime_not_fabricated', historicalSummary.measured_node_time_count === 0 && historicalSummary.historical_not_available_node_count === 15, paths.executionLog),
  check('failure_scenario_passed', failureTest.meta.status === 'pass', paths.failureTest),
  check('failure_retry_observed_once', failureTest.initial_run.workflow_status === 'blocked' && failureTest.rerun.workflow_status === 'pass', paths.failureTest),
  check('json_parse_all_passed', artifactValidation.parse_validation.failed === 0, paths.artifactValidation),
  check('schema_mapping_all_passed', artifactValidation.schema_validation.failed === 0, paths.artifactValidation),
  check('compliance_structure_passed', complianceValidation.validation_status === 'pass', paths.complianceValidation),
  check('governance_needs_review_preserved', complianceValidation.governance_status === 'needs_review', paths.complianceValidation),
  check('human_review_needs_revision_preserved', humanApproval.approval_summary.overall_decision === 'needs_revision', paths.humanApproval),
  check('release_gates_remain_blocked', releaseGatesBlocked, paths.failureTest)
];

const integrityPassed = integrityChecks.every((item) => item.status === 'pass');
const completedAtMs = Date.now();
const report = {
  meta: {
    artifact_name: 'workflow_metrics_report',
    artifact_version: '0.1.0',
    producer: 'build_workflow_metrics.mjs',
    build_status: integrityPassed ? 'pass' : 'failed',
    script_path: 'scripts/build_workflow_metrics.mjs',
    script_exit_code: integrityPassed ? 0 : 1
  },
  execution: {
    time_status: 'measured',
    started_at: new Date(startedAtMs).toISOString(),
    completed_at: new Date(completedAtMs).toISOString(),
    duration_ms: completedAtMs - startedAtMs
  },
  source_artifacts: {
    workflow_execution_log: paths.executionLog,
    failure_scenario_test: paths.failureTest,
    artifact_validation: paths.artifactValidation,
    two_stage_compliance_validation: paths.complianceValidation,
    human_approval: paths.humanApproval
  },
  runtime_metrics: {
    planner_runtime: {
      value: null,
      unit: 'ms',
      status: 'historical_not_available',
      source_path: paths.executionLog,
      source_pointer: '/nodes/11/duration_ms'
    },
    historical_node_timing_coverage: {
      total_nodes: historicalSummary.node_count,
      measured_nodes: historicalSummary.measured_node_time_count,
      historical_not_available_nodes: historicalSummary.historical_not_available_node_count,
      coverage_percent: rate(historicalSummary.measured_node_time_count, historicalSummary.node_count),
      status: 'historical_not_available'
    },
    failure_scenario_test_runtime: {
      value: failureTest.execution.duration_ms,
      unit: 'ms',
      status: 'measured',
      scope: 'failure_scenario_test_only',
      source_path: paths.failureTest,
      source_pointer: '/execution/duration_ms'
    },
    workflow_retry_count: {
      value: 1,
      status: 'deterministic_verified',
      scope: 'failure_scenario_test_only',
      source_path: paths.failureTest
    }
  },
  quality_metrics: {
    json_parse_rate: {
      passed: artifactValidation.parse_validation.passed,
      total: artifactValidation.parse_validation.total_json_files,
      rate_percent: rate(artifactValidation.parse_validation.passed, artifactValidation.parse_validation.total_json_files),
      status: artifactValidation.parse_validation.failed === 0 ? 'pass' : 'failed',
      evidence_type: 'deterministic_verified',
      source_path: paths.artifactValidation
    },
    schema_match_rate: {
      passed: artifactValidation.schema_validation.passed,
      total: artifactValidation.schema_validation.mapped_artifacts,
      rate_percent: rate(artifactValidation.schema_validation.passed, artifactValidation.schema_validation.mapped_artifacts),
      status: artifactValidation.schema_validation.failed === 0 ? 'pass' : 'failed',
      evidence_type: 'deterministic_verified',
      source_path: paths.artifactValidation
    },
    failure_assertion_rate: {
      passed: failureAssertionsPassed,
      total: failureTest.assertions.length,
      rate_percent: rate(failureAssertionsPassed, failureTest.assertions.length),
      status: failureAssertionsPassed === failureTest.assertions.length ? 'pass' : 'failed',
      evidence_type: 'deterministic_verified',
      source_path: paths.failureTest
    },
    release_gate_preservation_rate: {
      passed: checkedGates.filter((gate) => releaseGates[gate] === 'blocked').length,
      total: checkedGates.length,
      rate_percent: rate(checkedGates.filter((gate) => releaseGates[gate] === 'blocked').length, checkedGates.length),
      status: releaseGatesBlocked ? 'pass' : 'failed',
      evidence_type: 'deterministic_verified',
      source_path: paths.complianceValidation
    }
  },
  governance_metrics: {
    compliance: {
      validation_status: complianceValidation.validation_status,
      governance_status: complianceValidation.governance_status,
      evidence_type: 'artifact_derived',
      source_path: paths.complianceValidation
    },
    human_review: {
      status: humanApproval.approval_summary.overall_decision,
      human_signature: humanApproval.reviewer_record.human_signature,
      evidence_type: 'artifact_derived',
      source_path: paths.humanApproval
    },
    risk_tracking: {
      inherited: riskSets.post_inherited.length,
      resolved: riskSets.post_resolved.length,
      unresolved: riskSets.post_unresolved.length,
      newly_detected: riskSets.post_newly_detected.length,
      total_post_check: riskSets.post_risk_record_ids.length,
      status: 'needs_review',
      source_path: paths.complianceValidation
    }
  },
  overall: {
    workflow_status: 'needs_review',
    final_score: {
      availability: 'not_available',
      value: null,
      reason: 'No calibrated weighting, production baseline, or multi-case validation exists; a numeric final score would be misleading.'
    },
    summary: 'Deterministic structure and gate checks pass, while governance, human approval, runtime coverage, and customer validation remain incomplete.'
  },
  metric_integrity: {
    status: integrityPassed ? 'pass' : 'failed',
    checks: integrityChecks
  },
  release_gates: releaseGates,
  boundaries: {
    historical_execution_claimed: false,
    planner_time_fabricated: false,
    production_ready: false,
    customer_validated: false
  },
  limitations: [
    'Planner and all 15 historical node runtimes remain historical_not_available; no time value is fabricated.',
    'The measured Failure Scenario Test runtime is not Planner time and not full workflow latency.',
    'Compliance validation pass describes deterministic structure checks; governance remains needs_review.',
    'Workflow retry count applies only to the single Failure Scenario Test.',
    'Final score is intentionally unavailable until weighting and multi-case baselines are calibrated.',
    'All final generation and release gates remain blocked.'
  ]
};

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validateReport = ajv.compile(reportSchema);
if (!validateReport(report)) {
  console.error(JSON.stringify(validateReport.errors, null, 2));
  process.exit(1);
}

fs.writeFileSync(abs(paths.reportJson), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(abs(paths.reportMd), buildMarkdown(report), 'utf8');

console.log(JSON.stringify({
  build_status: report.meta.build_status,
  workflow_status: report.overall.workflow_status,
  planner_runtime_status: report.runtime_metrics.planner_runtime.status,
  failure_scenario_test_runtime_ms: report.runtime_metrics.failure_scenario_test_runtime.value,
  workflow_retry_count: report.runtime_metrics.workflow_retry_count.value,
  json_parse_rate: report.quality_metrics.json_parse_rate,
  schema_match_rate: report.quality_metrics.schema_match_rate,
  compliance_validation_status: report.governance_metrics.compliance.validation_status,
  compliance_governance_status: report.governance_metrics.compliance.governance_status,
  human_review_status: report.governance_metrics.human_review.status,
  risk_tracking: report.governance_metrics.risk_tracking,
  final_score_availability: report.overall.final_score.availability,
  metric_integrity_checks_passed: integrityChecks.filter((item) => item.status === 'pass').length,
  metric_integrity_checks_total: integrityChecks.length,
  release_gates_all_blocked: releaseGatesBlocked,
  report_json: paths.reportJson,
  report_md: paths.reportMd,
  exit_code: report.meta.script_exit_code
}, null, 2));

process.exit(report.meta.script_exit_code);

