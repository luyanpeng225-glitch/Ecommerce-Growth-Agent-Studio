#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Ajv = require('ajv/dist/2020');

const ROOT = process.cwd();
const SCHEMA_PATH = 'schemas/artifacts/worktrace.schema.json';
const OUTPUT_JSON = 'outputs/worktrace_failure_scenario.json';
const OUTPUT_MD = 'outputs/worktrace_failure_scenario.md';

const SOURCE_PATHS = [
  'docs/worktrace_spec.md',
  SCHEMA_PATH,
  'data/failure_scenarios/brief_missing_campaign_goal.scenario.json',
  'outputs/failure_scenario_test_report.json',
  'outputs/workflow_metrics_report.json'
];

const EVIDENCE_FILE_PATHS = [
  'data/sample_brief.json',
  'data/failure_scenarios/brief_missing_campaign_goal.scenario.json',
  'schemas/product_brief.schema.json',
  'outputs/failure_scenario_test_report.json'
];

const RELEASE_GATES = {
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
};

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function readText(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function artifactType(relPath) {
  if (relPath.endsWith('.schema.json')) return 'schema';
  if (relPath.endsWith('.json')) return 'json';
  if (relPath.endsWith('.md')) return 'markdown';
  if (relPath.endsWith('.csv')) return 'csv';
  return null;
}

function fileRef(relPath, role, notes = null, jsonPointer = null, sourceStatus = null) {
  return {
    path: relPath,
    exists: exists(relPath),
    evidence_type: 'artifact_derived',
    artifact_type: artifactType(relPath),
    required: true,
    json_pointer: jsonPointer,
    section_hint: null,
    role,
    source_status: sourceStatus,
    notes
  };
}

function stableFailureArtifactTraceKey(reportText) {
  const digest = crypto.createHash('sha256').update(reportText).digest('hex').slice(0, 16);
  return `failure_scenario_trace_${digest}`;
}

function getByJsonPointer(obj, pointer) {
  if (!pointer || pointer === '/') return obj;
  return pointer.slice(1).split('/').reduce((acc, token) => {
    const key = token.replace(/~1/g, '/').replace(/~0/g, '~');
    return acc == null ? undefined : acc[key];
  }, obj);
}

function buildWorkTrace() {
  const missingSources = [...SOURCE_PATHS, ...EVIDENCE_FILE_PATHS].filter((p, i, arr) => arr.indexOf(p) === i && !exists(p));
  if (missingSources.length) {
    throw new Error(`Missing required source artifacts: ${missingSources.join(', ')}`);
  }

  // Read all required source artifacts up front. WorkTrace is built fully in memory and Ajv-validated before writing.
  readText('docs/worktrace_spec.md');
  const schema = readJson(SCHEMA_PATH);
  const scenario = readJson('data/failure_scenarios/brief_missing_campaign_goal.scenario.json');
  const reportText = readText('outputs/failure_scenario_test_report.json');
  const report = JSON.parse(reportText);
  const metrics = readJson('outputs/workflow_metrics_report.json');

  const artifact_trace_key = stableFailureArtifactTraceKey(reportText);
  const missingField = report.scenario?.missing_field || scenario.fault_injection?.missing_field || 'campaign_goal';

  const scenarioRef = fileRef('data/failure_scenarios/brief_missing_campaign_goal.scenario.json', 'input', 'Deterministic failure scenario definition.', null, 'pass');
  const sampleBriefRef = fileRef('data/sample_brief.json', 'input', 'Original source brief used for deterministic restore; source file is not modified by this WorkTrace.', null, 'pass');
  const productSchemaRef = fileRef('schemas/product_brief.schema.json', 'validation_source', 'Product Brief Schema used for initial validation and rerun.', null, 'pass');
  const reportRef = fileRef('outputs/failure_scenario_test_report.json', 'evidence', 'Deterministic test report with measured total script runtime and assertions.', null, 'pass');

  const nodes = [
    {
      node_id: 'failure_node_01_initial_validation',
      sequence: 1,
      node_name: 'Initial Validation',
      node_type: 'validation',
      status: 'blocked',
      time_status: 'not_applicable',
      started_at: null,
      completed_at: null,
      duration_ms: null,
      input_refs: [scenarioRef, sampleBriefRef, productSchemaRef],
      output_refs: [reportRef],
      risk_ids: [],
      claim_ids: [],
      retry_count: 0,
      retry_count_status: 'deterministic_verified',
      error: {
        error_code: 'missing_required_campaign_goal',
        reason: `Initial schema validation is blocked because required field ${missingField} is missing after deterministic fault injection.`,
        revision_action: `Create revision queue item to restore ${missingField} from the original source brief before rerun.`,
        source_ref: fileRef('outputs/failure_scenario_test_report.json', 'evidence', 'Initial run reports missing campaign_goal and workflow_status=blocked.', '/initial_run/schema_errors/0', 'blocked')
      },
      human_approval: null,
      next_node: 'failure_node_02_revision_queue'
    },
    {
      node_id: 'failure_node_02_revision_queue',
      sequence: 2,
      node_name: 'Revision Queue',
      node_type: 'revision',
      status: 'pass',
      time_status: 'not_applicable',
      started_at: null,
      completed_at: null,
      duration_ms: null,
      input_refs: [reportRef, sampleBriefRef],
      output_refs: [reportRef],
      risk_ids: [],
      claim_ids: [],
      retry_count: null,
      retry_count_status: 'not_applicable',
      error: null,
      human_approval: null,
      next_node: 'failure_node_03_schema_rerun'
    },
    {
      node_id: 'failure_node_03_schema_rerun',
      sequence: 3,
      node_name: 'Schema Rerun',
      node_type: 'validation',
      status: 'pass',
      time_status: 'not_applicable',
      started_at: null,
      completed_at: null,
      duration_ms: null,
      input_refs: [scenarioRef, sampleBriefRef, productSchemaRef, reportRef],
      output_refs: [reportRef],
      risk_ids: [],
      claim_ids: [],
      retry_count: 1,
      retry_count_status: 'deterministic_verified',
      error: null,
      human_approval: null,
      next_node: null
    }
  ];

  const worktrace = {
    meta: {
      worktrace_version: '0.1.0',
      schema_version: schema.title || 'WorkTrace Artifact Schema',
      project_name: 'E-commerce Growth Agent Studio',
      product_name: '运动相机',
      workflow_version: 'V2'
    },
    trace_summary: {
      trace_id: null,
      trace_id_status: 'not_available',
      artifact_trace_key,
      trace_type: 'deterministic_failure_scenario_trace',
      execution_context: 'deterministic_test_execution',
      workflow_status: 'pass',
      time_status: report.execution?.time_status || 'measured',
      started_at: report.execution?.started_at,
      completed_at: report.execution?.completed_at,
      duration_ms: report.execution?.duration_ms,
      retry_count: 1,
      retry_count_status: 'deterministic_verified',
      source_artifacts: SOURCE_PATHS.map((p) => fileRef(p, 'evidence', p === SCHEMA_PATH ? 'Schema used for Ajv validation.' : 'Source artifact for deterministic Failure Scenario WorkTrace.'))
    },
    nodes,
    release_gates: { ...RELEASE_GATES },
    boundaries: {
      historical_execution_claimed: false,
      production_ready: false,
      customer_validated: false,
      fabricated_runtime_allowed: false
    },
    limitations: [
      `${report.execution?.duration_ms} ms is the measured total runtime of the Failure Scenario Test script only.`,
      'The measured duration is not Planner runtime and is not full Agent workflow runtime.',
      'artifact_trace_key is derived from the Failure Scenario report and is not a runtime trace_id.',
      'This WorkTrace validates deterministic input structure recovery only; it does not evaluate product claims or compliance risks, so risk_ids and claim_ids are empty.',
      'Revision Queue records deterministic restore_from_source behavior only; it does not claim a real human edited the brief.',
      `Workflow metrics boundary preserved: failure runtime scope=${metrics.runtime_metrics?.failure_scenario_test_runtime?.scope || 'failure_scenario_test_only'}.`,
      'Final marketing copy, final image prompt, image generation, frontend page, and public release remain blocked.'
    ]
  };

  const ajv = new Ajv({ strict: false, allErrors: true, validateFormats: false });
  const validate = ajv.compile(schema);
  if (!validate(worktrace)) {
    const conflicts = validate.errors.map((err) => ({
      json_pointer: err.instancePath || '/',
      schema_pointer: err.schemaPath,
      actual_value: err.instancePath ? getByJsonPointer(worktrace, err.instancePath) : worktrace,
      allowed: err.params?.allowedValues || err.params?.allowedValue || err.params?.type || err.params?.const || err.keyword,
      message: err.message
    }));
    const error = new Error('Schema conflict: Failure Scenario WorkTrace failed Ajv validation before write.');
    error.conflicts = conflicts;
    throw error;
  }

  const refChecks = [];
  for (const ref of worktrace.trace_summary.source_artifacts) refChecks.push(ref);
  for (const n of worktrace.nodes) {
    refChecks.push(...n.input_refs, ...n.output_refs);
    if (n.error?.source_ref) refChecks.push(n.error.source_ref);
  }
  const failedRefs = refChecks.filter((ref) => !ref.exists);
  if (failedRefs.length) {
    const error = new Error('File reference check failed before write.');
    error.conflicts = failedRefs.map((ref) => ({ json_pointer: '/file_refs', actual_value: ref.path, allowed: 'existing file', message: 'Referenced file does not exist.' }));
    throw error;
  }

  return worktrace;
}

function buildMarkdown(worktrace) {
  const riskCount = worktrace.nodes.reduce((sum, n) => sum + n.risk_ids.length, 0);
  const claimCount = worktrace.nodes.reduce((sum, n) => sum + n.claim_ids.length, 0);
  return `# Failure Scenario WorkTrace\n\n` +
    `- trace_id: ${worktrace.trace_summary.trace_id}\n` +
    `- trace_id_status: ${worktrace.trace_summary.trace_id_status}\n` +
    `- artifact_trace_key: ${worktrace.trace_summary.artifact_trace_key}\n` +
    `- artifact_trace_key_note: artifact_trace_key is derived from the Failure Scenario report and is not a runtime trace_id.\n` +
    `- trace_type: ${worktrace.trace_summary.trace_type}\n` +
    `- execution_context: ${worktrace.trace_summary.execution_context}\n` +
    `- workflow_status: ${worktrace.trace_summary.workflow_status}\n` +
    `- duration_ms: ${worktrace.trace_summary.duration_ms}\n` +
    `- duration_scope: Failure Scenario Test script total runtime only; not Planner runtime and not full Agent workflow runtime.\n` +
    `- retry_count: ${worktrace.trace_summary.retry_count}\n` +
    `- risk_id_count: ${riskCount}\n` +
    `- claim_id_count: ${claimCount}\n\n` +
    `## Release Gates\n\n` +
    Object.entries(worktrace.release_gates).map(([k, v]) => `- ${k}: ${v}`).join('\n') +
    `\n\n## Nodes\n\n` +
    `| sequence | node_id | node_name | node_type | status | retry_count | next_node |\n` +
    `|---:|---|---|---|---|---:|---|\n` +
    worktrace.nodes.map((n) => `| ${n.sequence} | ${n.node_id} | ${n.node_name} | ${n.node_type} | ${n.status} | ${n.retry_count ?? 'null'} | ${n.next_node ?? 'null'} |`).join('\n') +
    `\n`;
}

try {
  const worktrace = buildWorkTrace();
  fs.writeFileSync(path.join(ROOT, OUTPUT_JSON), `${JSON.stringify(worktrace, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUTPUT_MD), buildMarkdown(worktrace));
  console.log(JSON.stringify({
    status: 'pass',
    outputs: [OUTPUT_JSON, OUTPUT_MD],
    node_count: worktrace.nodes.length,
    trace_id: worktrace.trace_summary.trace_id,
    artifact_trace_key: worktrace.trace_summary.artifact_trace_key,
    duration_ms: worktrace.trace_summary.duration_ms,
    retry_count: worktrace.trace_summary.retry_count
  }, null, 2));
} catch (err) {
  console.error(JSON.stringify({
    status: 'failed',
    message: err.message,
    conflicts: err.conflicts || []
  }, null, 2));
  process.exitCode = 1;
}
