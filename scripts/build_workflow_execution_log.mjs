import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const abs = (p) => path.resolve(projectRoot, p);
const exists = (p) => fs.existsSync(abs(p));

const logBuildStarted = new Date();
const logBuildStartedAt = logBuildStarted.toISOString();

const historicalTiming = {
  started_at: null,
  completed_at: null,
  duration_ms: null,
  timing_evidence_type: 'historical_not_available',
  timestamp_source: 'none'
};

const releaseGates = {
  structured_planning_package: 'approved',
  growth_evaluation: 'approved_for_evaluation_only',
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
};

const baseReleaseGateEffect = (notes) => ({
  changes_release_gates: false,
  blocked_gates_preserved: true,
  notes
});

const nodeSpecs = [
  {
    step: 1,
    node_id: 'step_01_standard_product_brief_input',
    node_name: 'Standard Product Brief Input',
    node_type: 'input_artifact',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；README 当前进度',
    governance_status: 'needs_review',
    governance_status_source: 'workflow/agent_workflow.md 输入与前置校验；schemas/product_brief.schema.json 约束；后续节点继承 needs_review',
    input_files: ['docs/product_brief_input_template.md'],
    output_files: ['data/sample_brief.json'],
    release_gate_effect: baseReleaseGateEffect('No final generation release; blocked gates unchanged.')
  },
  {
    step: 2,
    node_id: 'step_02_workflow_schema_io_contract_specification',
    node_name: 'Workflow / Schema / I/O Contract Specification',
    node_type: 'specification',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；workflow/agent_io_contracts.md',
    governance_status: 'not_applicable',
    governance_status_source: 'workflow/agent_io_contracts.md 通用契约 and status rules',
    input_files: ['data/sample_brief.json'],
    output_files: ['schemas/product_brief.schema.json', 'workflow/agent_workflow.md', 'workflow/agent_io_contracts.md'],
    release_gate_effect: baseReleaseGateEffect('Defines status and workflow rules only; blocked gates unchanged.')
  },
  {
    step: 3,
    node_id: 'step_03_brief_parser_agent',
    node_name: 'Brief Parser Agent',
    node_type: 'agent',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Brief Parser Agent]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/standardized_brief_summary.json status=needs_review',
    input_files: ['data/sample_brief.json', 'schemas/product_brief.schema.json', 'prompts/brief_parser.md'],
    output_files: ['outputs/standardized_brief_summary.json', 'outputs/brief_parser_report.md'],
    release_gate_effect: baseReleaseGateEffect('No release permission; downstream review state preserved.')
  },
  {
    step: 4,
    node_id: 'step_04_audience_insight_skill',
    node_name: 'Audience Insight Skill',
    node_type: 'skill',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Audience Insight Skill]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/audience_insight.json status=needs_review',
    input_files: ['data/sample_brief.json', 'outputs/standardized_brief_summary.json', 'prompts/audience_insight.md'],
    output_files: ['outputs/audience_insight.json', 'outputs/audience_insight_report.md'],
    release_gate_effect: baseReleaseGateEffect('No release permission; downstream review state preserved.')
  },
  {
    step: 5,
    node_id: 'step_05_selling_point_analyst_agent',
    node_name: 'Selling Point Analyst Agent',
    node_type: 'agent',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Selling Point Analyst Agent]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/selling_point_matrix.json status=needs_review',
    input_files: ['data/sample_brief.json', 'outputs/standardized_brief_summary.json', 'outputs/audience_insight.json', 'prompts/selling_point_analyst.md'],
    output_files: ['outputs/selling_point_matrix.json', 'outputs/selling_point_matrix.md'],
    release_gate_effect: baseReleaseGateEffect('Unsupported claims remain review-gated; blocked gates unchanged.')
  },
  {
    step: 6,
    node_id: 'step_06_platform_strategy_skill',
    node_name: 'Platform Strategy Skill',
    node_type: 'skill',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Platform Strategy Skill]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/platform_strategy_plan.json status=needs_review',
    input_files: ['data/sample_brief.json', 'outputs/standardized_brief_summary.json', 'outputs/audience_insight.json', 'outputs/selling_point_matrix.json', 'prompts/platform_strategy.md'],
    output_files: ['outputs/platform_strategy_plan.json', 'outputs/platform_strategy_plan.md'],
    release_gate_effect: baseReleaseGateEffect('KPI language remains observational; blocked gates unchanged.')
  },
  {
    step: 7,
    node_id: 'step_07_creative_copy_agent',
    node_name: 'Creative Copy Agent',
    node_type: 'agent',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Creative Copy Agent]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/creative_copy_pack_outline.json status=needs_review',
    input_files: ['outputs/audience_insight.json', 'outputs/selling_point_matrix.json', 'outputs/platform_strategy_plan.json', 'data/sample_brief.json', 'prompts/creative_copy_agent.md'],
    output_files: ['outputs/creative_copy_pack_outline.json', 'outputs/creative_copy_pack_outline.md'],
    release_gate_effect: baseReleaseGateEffect('Produced structure only; final marketing copy remains blocked.')
  },
  {
    step: 8,
    node_id: 'step_08_image_prompt_skill',
    node_name: 'Image Prompt Skill',
    node_type: 'skill',
    execution_status: 'historical_completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Image Prompt Skill]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/image_prompt_pack_outline.json status=needs_review',
    input_files: ['data/sample_brief.json', 'outputs/platform_strategy_plan.json', 'outputs/selling_point_matrix.json', 'outputs/creative_copy_pack_outline.json', 'prompts/image_prompt_skill.md'],
    output_files: ['outputs/image_prompt_pack_outline.json', 'outputs/image_prompt_pack_outline.md'],
    release_gate_effect: baseReleaseGateEffect('Produced visual structure only; final image prompt and image generation remain blocked.')
  },
  {
    step: 9,
    node_id: 'step_09_brand_compliance_agent',
    node_name: 'Brand Compliance Agent',
    node_type: 'agent',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 9 Completion Notes',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json compliance_summary.status=needs_review and blocked final generation fields; outputs/brand_compliance_report.json',
    input_files: ['data/sample_brief.json', 'outputs/selling_point_matrix.json', 'outputs/creative_copy_pack_outline.json', 'outputs/image_prompt_pack_outline.json', 'prompts/brand_compliance_agent.md'],
    output_files: ['outputs/brand_compliance_report.json', 'outputs/brand_compliance_report.md'],
    release_gate_effect: baseReleaseGateEffect('Final marketing copy, final image prompt, image generation and public release remain blocked.')
  },
  {
    step: 10,
    node_id: 'step_10_growth_metrics_agent',
    node_name: 'Growth Metrics Agent',
    node_type: 'agent',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 10 Completion Notes',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/growth_metrics_plan.json status=needs_review',
    input_files: ['outputs/platform_strategy_plan.json', 'outputs/creative_copy_pack_outline.json', 'outputs/image_prompt_pack_outline.json', 'outputs/brand_compliance_report.json', 'prompts/growth_metrics_agent.md'],
    output_files: ['outputs/growth_metrics_plan.json', 'outputs/growth_metrics_plan.md'],
    release_gate_effect: baseReleaseGateEffect('Growth metrics remain observational; no business outcome promise; blocked gates unchanged.')
  },
  {
    step: 11,
    node_id: 'step_11_creative_package_reporter',
    node_name: 'Creative Package Reporter',
    node_type: 'report_generator',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 11 Completion Notes',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/final_creative_package_report.json status=needs_review',
    input_files: ['outputs/standardized_brief_summary.json', 'outputs/audience_insight.json', 'outputs/selling_point_matrix.json', 'outputs/platform_strategy_plan.json', 'outputs/creative_copy_pack_outline.json', 'outputs/image_prompt_pack_outline.json', 'outputs/brand_compliance_report.json', 'outputs/growth_metrics_plan.json', 'prompts/creative_package_reporter.md'],
    output_files: ['outputs/final_creative_package_report.json', 'outputs/final_creative_package_report.md'],
    release_gate_effect: baseReleaseGateEffect('Summarizes V1 only; final generation and public release remain blocked.')
  },
  {
    step: 12,
    node_id: 'step_12_planner_agent',
    node_name: 'Planner Agent',
    node_type: 'agent',
    execution_status: 'completed_revised',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 12 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Planner Agent] status=completed_revised',
    governance_status: 'not_applicable',
    governance_status_source: 'Planner 只负责工作流规划和路由，不独立作出审批或发布决定；现有 blocked release gates 由 Brand Compliance、Human Approval 和 Growth Evaluation 继承控制。',
    input_files: ['PROJECT_MEMORY_FOR_OPENCLAW.md', 'workflow/agent_workflow.md', 'workflow/agent_io_contracts.md', 'outputs/standardized_brief_summary.json', 'outputs/audience_insight.json', 'outputs/selling_point_matrix.json', 'outputs/platform_strategy_plan.json', 'outputs/creative_copy_pack_outline.json', 'outputs/image_prompt_pack_outline.json', 'outputs/brand_compliance_report.json', 'outputs/growth_metrics_plan.json', 'outputs/final_creative_package_report.json', 'prompts/planner_agent.md'],
    output_files: ['outputs/planner_execution_plan.json', 'outputs/planner_execution_plan.md'],
    release_gate_effect: baseReleaseGateEffect('Preserves blocked gates and states that planning does not authorize final generation.')
  },
  {
    step: 13,
    node_id: 'step_13_human_approval_node',
    node_name: 'Human Approval Node',
    node_type: 'approval_node',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 13 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Human Approval Node]',
    governance_status: 'needs_revision',
    governance_status_source: 'outputs/human_approval_record.json meta.status=needs_revision; approval_summary.overall_decision=needs_revision; release_gates',
    input_files: ['outputs/planner_execution_plan.json', 'outputs/creative_copy_pack_outline.json', 'outputs/brand_compliance_report.json', 'data/sample_brief.json', 'prompts/human_approval_node.md'],
    output_files: ['outputs/human_approval_record.json', 'outputs/human_approval_record.md'],
    release_gate_effect: baseReleaseGateEffect('Structured planning and growth evaluation are allowed for evaluation; final generation and public release remain blocked.')
  },
  {
    step: 14,
    node_id: 'step_14_growth_evaluation_agent',
    node_name: 'Growth Evaluation Agent',
    node_type: 'evaluation_agent',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 14 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Growth Evaluation Agent]',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/growth_evaluation_report.json meta.status=needs_review; human_approval_inheritance; release_gates',
    input_files: ['outputs/planner_execution_plan.json', 'outputs/brand_compliance_report.json', 'outputs/human_approval_record.json', 'outputs/growth_metrics_plan.json', 'outputs/final_creative_package_report.json', 'docs/evaluation_metrics_test_plan.md', 'data/evaluation_metrics_sample.csv', 'data/audit_log_sample.json', 'prompts/growth_evaluation_agent.md'],
    output_files: ['outputs/growth_evaluation_report.json', 'outputs/growth_evaluation_report.md'],
    release_gate_effect: baseReleaseGateEffect('Confirms evaluation status only; final marketing copy, final image prompt, image generation and public release remain blocked.')
  },
  {
    step: 15,
    node_id: 'step_15_v2_final_report_generator',
    node_name: 'V2 Final Report Generator',
    node_type: 'report_generator',
    execution_status: 'completed',
    execution_status_source: 'PROJECT_MEMORY_FOR_OPENCLAW.md Step 15 Completion Notes; outputs/v2_final_report.json meta.artifact_name=v2_final_report',
    governance_status: 'needs_review',
    governance_status_source: 'outputs/v2_final_report.json meta.status=needs_review; final_conclusion.overall_status=needs_review; release_gates',
    input_files: ['PROJECT_MEMORY_FOR_OPENCLAW.md', 'README.md', 'outputs/final_creative_package_report.json', 'outputs/planner_execution_plan.json', 'outputs/human_approval_record.json', 'outputs/growth_evaluation_report.json', 'outputs/brand_compliance_report.json', 'prompts/v2_final_report_generator.md'],
    output_files: ['outputs/v2_final_report.json', 'outputs/v2_final_report.md'],
    release_gate_effect: baseReleaseGateEffect('Final report summarizes but does not authorize final marketing copy, final image prompt, image generation, frontend page or public release.')
  }
];

function fileRecord(p) {
  return { path: p, exists: exists(p) };
}

const nodes = nodeSpecs.map((node) => {
  const inputFiles = node.input_files.map(fileRecord);
  const outputFiles = node.output_files.map(fileRecord);
  return {
    step: node.step,
    node_id: node.node_id,
    node_name: node.node_name,
    node_type: node.node_type,
    execution_status: node.execution_status,
    execution_status_source: node.execution_status_source,
    governance_status: node.governance_status,
    governance_status_source: node.governance_status_source,
    input_files: inputFiles,
    output_files: outputFiles,
    missing_input_files: inputFiles.filter((f) => !f.exists).map((f) => f.path),
    missing_output_files: outputFiles.filter((f) => !f.exists).map((f) => f.path),
    ...historicalTiming,
    release_gate_effect: node.release_gate_effect
  };
});

const inputFileChecks = nodes.reduce((sum, node) => sum + node.input_files.length, 0);
const inputFileFailures = nodes.reduce((sum, node) => sum + node.missing_input_files.length, 0);
const outputFileChecks = nodes.reduce((sum, node) => sum + node.output_files.length, 0);
const outputFileFailures = nodes.reduce((sum, node) => sum + node.missing_output_files.length, 0);
const checkedFiles = [...new Map(nodes.flatMap((node) => [...node.input_files, ...node.output_files]).map((f) => [f.path, f])).values()];

const logBuildCompleted = new Date();
const logBuildCompletedAt = logBuildCompleted.toISOString();
const logBuildDurationMs = logBuildCompleted.getTime() - logBuildStarted.getTime();
const exitCode = inputFileFailures > 0 || outputFileFailures > 0 ? 1 : 0;

const log = {
  meta: {
    artifact_name: 'workflow_execution_log',
    artifact_version: '0.1.0',
    validation_extension: 'Validation Extension B',
    schema_draft: '2020-12',
    brief_id: 'brief_demo_action_camera_001',
    workflow_version: 'V2',
    project_name: 'E-commerce Growth Agent Studio',
    project_name_cn: '电商增长 Agent 工作台',
    status: exitCode === 0 ? 'pass' : 'failed',
    log_type: 'retrospective_artifact_derived_log',
    telemetry_type: 'not_runtime_telemetry',
    log_build_started_at: logBuildStartedAt,
    log_build_completed_at: logBuildCompletedAt,
    log_build_duration_ms: logBuildDurationMs,
    log_generated_at: logBuildCompletedAt,
    builder_script: 'scripts/build_workflow_execution_log.mjs',
    builder_exit_code: exitCode
  },
  workflow_summary: {
    covered_steps: Array.from({ length: 15 }, (_, index) => index + 1),
    node_count: nodes.length,
    timing_policy: 'Steps 1-15 are historical nodes; node-level timing is unavailable and must remain null with historical_not_available evidence.',
    steps_1_to_15_rerun: false,
    input_file_checks: {
      total: inputFileChecks,
      passed: inputFileChecks - inputFileFailures,
      failed: inputFileFailures
    },
    output_file_checks: {
      total: outputFileChecks,
      passed: outputFileChecks - outputFileFailures,
      failed: outputFileFailures
    },
    historical_not_available_node_count: nodes.filter((node) => node.timing_evidence_type === 'historical_not_available').length,
    measured_node_time_count: nodes.filter((node) => node.timing_evidence_type !== 'historical_not_available').length
  },
  nodes,
  release_gates: releaseGates,
  artifact_existence_summary: {
    checked_files: checkedFiles,
    missing_input_files: [...new Set(nodes.flatMap((node) => node.missing_input_files))],
    missing_output_files: [...new Set(nodes.flatMap((node) => node.missing_output_files))],
    input_files: {
      total: inputFileChecks,
      passed: inputFileChecks - inputFileFailures,
      failed: inputFileFailures
    },
    output_files: {
      total: outputFileChecks,
      passed: outputFileChecks - outputFileFailures,
      failed: outputFileFailures
    },
    blocked_future_assets_not_counted_as_missing: [
      'final marketing copy',
      'final image prompt',
      'image',
      'frontend page',
      'public release asset'
    ]
  },
  limitations: [
    'This is a retrospective artifact-derived log, not real runtime telemetry.',
    'Node-level started_at, completed_at and duration_ms are intentionally null for all historical Steps 1-15.',
    'File existence is used as artifact evidence, but file modification time is not used as execution timing evidence.',
    'Chat timestamps, report created_at values and estimated durations are not used as node execution timestamps.',
    'Release gates remain blocked for final marketing copy, final image prompt, image generation, frontend page and public release.'
  ]
};

function buildMarkdown(log) {
  const rows = log.nodes.map((node) => `| ${node.step} | ${node.node_name} | ${node.execution_status} | ${node.governance_status} | ${node.missing_input_files.length} | ${node.missing_output_files.length} | ${node.timing_evidence_type} |`).join('\n');
  const gateRows = Object.entries(log.release_gates).map(([gate, status]) => `| ${gate} | ${status} |`).join('\n');
  return `# Workflow Execution Log\n\n` +
    `This is a retrospective artifact-derived log, not real runtime telemetry. It is built from existing project artifacts and file-existence checks. It does not use file modification time, chat time, report created_at values, or estimated durations as node execution timing.\n\n` +
    `## Build Metadata\n\n` +
    `- log_type: ${log.meta.log_type}\n` +
    `- telemetry_type: ${log.meta.telemetry_type}\n` +
    `- log_build_started_at: ${log.meta.log_build_started_at}\n` +
    `- log_build_completed_at: ${log.meta.log_build_completed_at}\n` +
    `- log_build_duration_ms: ${log.meta.log_build_duration_ms}\n` +
    `- builder_exit_code: ${log.meta.builder_exit_code}\n\n` +
    `## File Checks\n\n` +
    `- input_files: ${log.workflow_summary.input_file_checks.passed}/${log.workflow_summary.input_file_checks.total} passed, ${log.workflow_summary.input_file_checks.failed} failed\n` +
    `- output_files: ${log.workflow_summary.output_file_checks.passed}/${log.workflow_summary.output_file_checks.total} passed, ${log.workflow_summary.output_file_checks.failed} failed\n` +
    `- historical_not_available_node_count: ${log.workflow_summary.historical_not_available_node_count}\n` +
    `- measured_node_time_count: ${log.workflow_summary.measured_node_time_count}\n\n` +
    `## Node Summary\n\n` +
    `| Step | Node | execution_status | governance_status | missing inputs | missing outputs | timing_evidence_type |\n` +
    `| --- | --- | --- | --- | ---: | ---: | --- |\n` +
    `${rows}\n\n` +
    `## Release Gates\n\n` +
    `| Gate | Status |\n` +
    `| --- | --- |\n` +
    `${gateRows}\n\n` +
    `## Limitations\n\n` +
    log.limitations.map((item) => `- ${item}`).join('\n') + '\n';
}

fs.mkdirSync(abs('outputs'), { recursive: true });
fs.writeFileSync(abs('outputs/workflow_execution_log.json'), `${JSON.stringify(log, null, 2)}\n`, 'utf8');
fs.writeFileSync(abs('outputs/workflow_execution_log.md'), buildMarkdown(log), 'utf8');

console.log(JSON.stringify({
  status: log.meta.status,
  node_count: log.nodes.length,
  input_file_checks: log.workflow_summary.input_file_checks,
  output_file_checks: log.workflow_summary.output_file_checks,
  historical_not_available_node_count: log.workflow_summary.historical_not_available_node_count,
  measured_node_time_count: log.workflow_summary.measured_node_time_count,
  release_gates: log.release_gates,
  outputs: ['outputs/workflow_execution_log.json', 'outputs/workflow_execution_log.md'],
  exit_code: exitCode
}, null, 2));

process.exit(exitCode);
