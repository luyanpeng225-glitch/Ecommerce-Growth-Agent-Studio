#!/usr/bin/env node

/**
 * Instrumented Runtime Runner
 *
 * Deterministic local Runtime only:
 * - reads/checks existing JSON and Markdown artifacts
 * - does not call any model
 * - does not call OpenClaw Agent
 * - writes outputs/runtime_execution.json and outputs/runtime_execution.md only when executed
 *
 * This is not a model Runtime. Timings measure this local artifact-check runner only.
 */

import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'outputs');
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, 'runtime_execution.json');
const MARKDOWN_OUTPUT_PATH = path.join(OUTPUT_DIR, 'runtime_execution.md');

const SCHEMA_VERSION = 'runtime_execution.schema.v1';
const PARALLEL_GROUP_ID = 'insight_skills_parallel_group';

const MODEL_USAGE_NOT_USED = Object.freeze({
  usage_status: 'not_used',
  provider: null,
  model: null,
  prompt_tokens: null,
  completion_tokens: null,
  total_tokens: null,
  estimated_cost: null,
  currency: null
});

const HUMAN_APPROVAL = Object.freeze({
  overall_decision: 'needs_revision',
  human_signature: 'pending',
  reviewer_name: null,
  reviewed_at: null
});

const RELEASE_GATES = Object.freeze({
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
});

const BUSINESS_STAGES = Object.freeze([
  'Brief Parser',
  'Compliance Pre',
  'Planner',
  'Insight Skills',
  'Creative Agent',
  'Image Prompt Skill',
  'Compliance Post',
  'Human Approval',
  'Growth Evaluation',
  'Final Report'
]);

const SERIAL_STAGES = Object.freeze([
  {
    node_id: 'brief_parser',
    node_name: 'Brief Parser',
    node_type: 'agent',
    sequence: 1,
    execution_group: 'serial',
    input_paths: ['data/sample_brief.json', 'schemas/product_brief.schema.json'],
    output_paths: ['outputs/standardized_brief_summary.json', 'outputs/brief_parser_report.md']
  },
  {
    node_id: 'compliance_pre',
    node_name: 'Compliance Pre',
    node_type: 'governance',
    sequence: 2,
    execution_group: 'serial',
    input_paths: ['outputs/standardized_brief_summary.json', 'data/sample_brief.json'],
    output_paths: ['outputs/brand_compliance_pre_check.json', 'outputs/brand_compliance_pre_check.md']
  },
  {
    node_id: 'planner',
    node_name: 'Planner',
    node_type: 'agent',
    sequence: 3,
    execution_group: 'serial',
    input_paths: ['outputs/standardized_brief_summary.json', 'outputs/brand_compliance_pre_check.json', 'workflow/agent_workflow.md'],
    output_paths: ['outputs/planner_execution_plan.json', 'outputs/planner_execution_plan.md']
  },
  {
    node_id: 'creative_agent',
    node_name: 'Creative Agent',
    node_type: 'agent',
    sequence: 5,
    execution_group: 'serial',
    input_paths: ['outputs/audience_insight.json', 'outputs/selling_point_matrix.json', 'outputs/platform_strategy_plan.json'],
    output_paths: ['outputs/creative_copy_pack_outline.json', 'outputs/creative_copy_pack_outline.md']
  },
  {
    node_id: 'image_prompt_skill',
    node_name: 'Image Prompt Skill',
    node_type: 'skill',
    sequence: 6,
    execution_group: 'serial',
    input_paths: ['outputs/creative_copy_pack_outline.json', 'outputs/selling_point_matrix.json', 'outputs/platform_strategy_plan.json'],
    output_paths: ['outputs/image_prompt_pack_outline.json', 'outputs/image_prompt_pack_outline.md']
  },
  {
    node_id: 'compliance_post',
    node_name: 'Compliance Post',
    node_type: 'governance',
    sequence: 7,
    execution_group: 'serial',
    input_paths: ['outputs/creative_copy_pack_outline.json', 'outputs/image_prompt_pack_outline.json'],
    output_paths: ['outputs/brand_compliance_post_generation_check.json', 'outputs/brand_compliance_post_generation_check.md']
  },
  {
    node_id: 'human_approval',
    node_name: 'Human Approval',
    node_type: 'human',
    sequence: 8,
    execution_group: 'serial',
    input_paths: ['outputs/brand_compliance_post_generation_check.json', 'outputs/creative_copy_pack_outline.json'],
    output_paths: ['outputs/human_approval_record.json', 'outputs/human_approval_record.md'],
    forced_status: 'needs_revision'
  },
  {
    node_id: 'growth_evaluation',
    node_name: 'Growth Evaluation',
    node_type: 'evaluation',
    sequence: 9,
    execution_group: 'serial',
    input_paths: ['outputs/planner_execution_plan.json', 'outputs/human_approval_record.json', 'data/evaluation_metrics_sample.csv', 'data/audit_log_sample.json'],
    output_paths: ['outputs/growth_evaluation_report.json', 'outputs/growth_evaluation_report.md']
  },
  {
    node_id: 'final_report',
    node_name: 'Final Report',
    node_type: 'report',
    sequence: 10,
    execution_group: 'serial',
    input_paths: ['outputs/planner_execution_plan.json', 'outputs/human_approval_record.json', 'outputs/growth_evaluation_report.json'],
    output_paths: ['outputs/v2_final_report.json', 'outputs/v2_final_report.md'],
    forced_status: 'needs_review'
  }
]);

const INSIGHT_SKILLS = Object.freeze([
  {
    node_id: 'audience_insight',
    node_name: 'Audience Insight',
    node_type: 'skill',
    sequence: 4,
    execution_group: PARALLEL_GROUP_ID,
    input_paths: ['outputs/standardized_brief_summary.json', 'outputs/planner_execution_plan.json'],
    output_paths: ['outputs/audience_insight.json', 'outputs/audience_insight_report.md']
  },
  {
    node_id: 'selling_point_analyst',
    node_name: 'Selling Point Analyst',
    node_type: 'skill',
    sequence: 4,
    execution_group: PARALLEL_GROUP_ID,
    input_paths: ['outputs/standardized_brief_summary.json', 'outputs/planner_execution_plan.json', 'outputs/audience_insight.json'],
    output_paths: ['outputs/selling_point_matrix.json', 'outputs/selling_point_matrix.md']
  },
  {
    node_id: 'platform_strategy',
    node_name: 'Platform Strategy',
    node_type: 'skill',
    sequence: 4,
    execution_group: PARALLEL_GROUP_ID,
    input_paths: ['outputs/standardized_brief_summary.json', 'outputs/planner_execution_plan.json'],
    output_paths: ['outputs/platform_strategy_plan.json', 'outputs/platform_strategy_plan.md']
  }
]);

function nowIso() {
  return new Date().toISOString();
}

function elapsedMs(startMark) {
  return Math.max(0, Math.round(performance.now() - startMark));
}

function projectPath(relativePath) {
  return path.join(PROJECT_ROOT, relativePath);
}

function artifactRefs(paths) {
  return paths.map((file_path) => ({ file_path }));
}

function createBaseNode(stage, startedAt) {
  return {
    node_id: stage.node_id,
    node_name: stage.node_name,
    node_type: stage.node_type,
    sequence: stage.sequence,
    execution_group: stage.execution_group,
    status: 'running',
    started_at: startedAt,
    ended_at: null,
    duration_ms: null,
    timing_status: 'measured',
    input_refs: artifactRefs(stage.input_paths),
    output_refs: artifactRefs(stage.output_paths),
    retry_count: 0,
    retry_count_status: 'measured',
    model_usage: { ...MODEL_USAGE_NOT_USED },
    tool_calls: [],
    error: {
      error_code: null,
      error_message: null
    },
    risk_ids: [],
    claim_ids: []
  };
}

async function readExistingArtifact(relativePath) {
  const absolutePath = projectPath(relativePath);
  await access(absolutePath);
  const content = await readFile(absolutePath, 'utf8');

  if (relativePath.endsWith('.json')) {
    JSON.parse(content);
  }
}

async function checkArtifacts(relativePaths) {
  await Promise.all(relativePaths.map((relativePath) => readExistingArtifact(relativePath)));
}

async function executeNode(stage) {
  const startedAt = nowIso();
  const startMark = performance.now();
  const node = createBaseNode(stage, startedAt);

  try {
    await checkArtifacts(stage.input_paths);
    await checkArtifacts(stage.output_paths);
    node.status = stage.forced_status ?? 'pass';
  } catch (error) {
    node.status = 'failed';
    node.error = {
      error_code: 'artifact_check_failed',
      error_message: error instanceof Error ? error.message : String(error)
    };
  } finally {
    node.ended_at = nowIso();
    node.duration_ms = elapsedMs(startMark);
  }

  return node;
}

async function executeInsightSkills() {
  const startedAt = nowIso();
  const startMark = performance.now();

  const nodes = await Promise.all(INSIGHT_SKILLS.map((skill) => executeNode(skill)));

  const endedAt = nowIso();
  const durationMs = elapsedMs(startMark);

  return {
    nodes,
    parallel_group: {
      group_id: PARALLEL_GROUP_ID,
      fan_out_from: 'planner',
      parallel_node_ids: nodes.map((node) => node.node_id),
      fan_in_to: 'creative_agent',
      started_at: startedAt,
      ended_at: endedAt,
      duration_ms: durationMs,
      timing_status: 'measured',
      status: nodes.every((node) => node.status === 'pass') ? 'pass' : 'failed'
    }
  };
}

function buildRuntimeSummary(nodes) {
  return {
    node_count: nodes.length,
    completed_node_count: nodes.filter((node) => ['pass', 'needs_review', 'needs_revision'].includes(node.status)).length,
    failed_node_count: nodes.filter((node) => node.status === 'failed').length,
    blocked_node_count: nodes.filter((node) => node.status === 'blocked').length,
    retry_count: 0,
    model_call_count: 0,
    tool_call_count: 0,
    total_input_tokens: null,
    total_output_tokens: null,
    estimated_cost: null,
    currency: null,
    summary_status: 'measured'
  };
}

function buildMarkdown(runtime) {
  const nodeRows = runtime.nodes
    .map((node) => `| ${node.sequence} | ${node.node_name} | ${node.execution_group} | ${node.status} | ${node.timing_status} | ${node.started_at} | ${node.ended_at} | ${node.duration_ms} |`)
    .join('\n');

  const parallelGroup = runtime.parallel_groups[0];
  const parallelNodes = runtime.nodes.filter((node) => parallelGroup.parallel_node_ids.includes(node.node_id));
  const parallelRows = parallelNodes
    .map((node) => `| ${node.node_name} | ${node.status} | ${node.started_at} | ${node.ended_at} | ${node.duration_ms} |`)
    .join('\n');

  return `# Instrumented Runtime Execution Report\n\n` +
    `This report was generated by a deterministic local Runtime Runner. It is not a model Runtime and not an OpenClaw Agent execution. The runner only read and checked existing local JSON/Markdown artifacts.\n\n` +
    `- run_id: ${runtime.run_id}\n` +
    `- run_type: ${runtime.run_type}\n` +
    `- execution_context: ${runtime.execution_context}\n` +
    `- run_status: ${runtime.run_status}\n` +
    `- started_at: ${runtime.started_at}\n` +
    `- ended_at: ${runtime.ended_at}\n` +
    `- duration_ms: ${runtime.duration_ms}\n` +
    `- model_usage: not_used / not_applicable for this deterministic local artifact-check Runtime\n` +
    `- prompt_tokens: null\n` +
    `- completion_tokens: null\n` +
    `- estimated_cost: null\n\n` +
    `## 10 Business Stages\n\n` +
    BUSINESS_STAGES.map((stage, index) => `${index + 1}. ${stage}`).join('\n') +
    `\n\n## Node Timings\n\n` +
    `| Sequence | Node | Execution Group | Status | Timing Status | Started At | Ended At | Duration ms |\n` +
    `| --- | --- | --- | --- | --- | --- | --- | --- |\n` +
    `${nodeRows}\n\n` +
    `## Parallel fan-out / fan-in\n\n` +
    `- group_id: ${parallelGroup.group_id}\n` +
    `- fan_out_from: ${parallelGroup.fan_out_from}\n` +
    `- fan_in_to: ${parallelGroup.fan_in_to}\n` +
    `- started_at: ${parallelGroup.started_at}\n` +
    `- ended_at: ${parallelGroup.ended_at}\n` +
    `- duration_ms: ${parallelGroup.duration_ms}\n` +
    `- parallel_node_ids: ${parallelGroup.parallel_node_ids.join(', ')}\n\n` +
    `| Parallel Skill | Status | Started At | Ended At | Duration ms |\n` +
    `| --- | --- | --- | --- | --- |\n` +
    `${parallelRows}\n\n` +
    `## Human Approval\n\n` +
    `- overall_decision: ${runtime.human_approval.overall_decision}\n` +
    `- human_signature: ${runtime.human_approval.human_signature}\n` +
    `- reviewer_name: ${runtime.human_approval.reviewer_name}\n` +
    `- reviewed_at: ${runtime.human_approval.reviewed_at}\n\n` +
    `## Release Gates\n\n` +
    Object.entries(runtime.release_gates).map(([gate, status]) => `- ${gate}: ${status}`).join('\n') +
    `\n`;
}

async function run() {
  const runId = `runtime_${randomUUID()}`;
  const startedAt = nowIso();
  const startMark = performance.now();
  const nodes = [];
  let parallelGroup = null;

  for (const stage of SERIAL_STAGES) {
    if (stage.node_id === 'creative_agent') {
      const insightRun = await executeInsightSkills();
      nodes.push(...insightRun.nodes);
      parallelGroup = insightRun.parallel_group;
    }

    nodes.push(await executeNode(stage));
  }

  const endedAt = nowIso();
  const runStatus = nodes.some((node) => node.status === 'failed') ? 'failed' : 'needs_revision';

  const runtime = {
    schema_version: SCHEMA_VERSION,
    run_id: runId,
    run_type: 'real_runtime',
    execution_context: 'instrumented_local_run',
    scenario_name: '运动相机 deterministic local artifact-check runtime',
    run_status: runStatus,
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: elapsedMs(startMark),
    timing_status: 'measured',
    nodes,
    parallel_groups: parallelGroup ? [parallelGroup] : [],
    runtime_summary: buildRuntimeSummary(nodes),
    human_approval: { ...HUMAN_APPROVAL },
    release_gates: { ...RELEASE_GATES },
    boundaries: {
      production_ready: false,
      customer_validated: false,
      real_customer_data_used: false,
      realtime_model_execution: false
    }
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(JSON_OUTPUT_PATH, `${JSON.stringify(runtime, null, 2)}\n`, 'utf8');
  await writeFile(MARKDOWN_OUTPUT_PATH, buildMarkdown(runtime), 'utf8');

  console.log(`Wrote ${path.relative(PROJECT_ROOT, JSON_OUTPUT_PATH)}`);
  console.log(`Wrote ${path.relative(PROJECT_ROOT, MARKDOWN_OUTPUT_PATH)}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
