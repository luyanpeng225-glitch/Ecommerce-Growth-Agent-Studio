#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const outputJsonPath = path.join(projectRoot, 'outputs/portfolio_evidence_pack.json');
const outputMdPath = path.join(projectRoot, 'outputs/portfolio_evidence_pack.md');

const SECTION_KEYS = [
  'project_overview',
  'business_problem',
  'workflow_evidence',
  'validation_evidence',
  'execution_trace_evidence',
  'claim_trace_evidence',
  'evaluation_evidence',
  'enterprise_governance',
  'limitations',
  'reproducibility'
];

const SECTION_TITLES = {
  project_overview: 'Project Overview',
  business_problem: 'Business Problem',
  workflow_evidence: 'Workflow Evidence',
  validation_evidence: 'Validation Evidence',
  execution_trace_evidence: 'Execution Trace Evidence',
  claim_trace_evidence: 'Claim Trace Evidence',
  evaluation_evidence: 'Evaluation Evidence',
  enterprise_governance: 'Enterprise Governance',
  limitations: 'Limitations',
  reproducibility: 'Reproducibility'
};

const EVIDENCE_TYPES = [
  'measured',
  'deterministic_verified',
  'artifact_derived',
  'derived_from_mock',
  'estimated',
  'human_review_required',
  'not_available'
];

const FIXED_RELEASE_GATES = {
  structured_planning_package: 'approved',
  growth_evaluation: 'approved_for_evaluation_only',
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
};

const jsonCache = new Map();
const sourceFileChecks = [];
const jsonPointerChecks = [];
const errors = [];

function abs(relPath) {
  return path.join(projectRoot, relPath);
}

function fileExists(relPath) {
  return fs.existsSync(abs(relPath));
}

function readJson(relPath) {
  if (jsonCache.has(relPath)) return jsonCache.get(relPath);
  const parsed = JSON.parse(fs.readFileSync(abs(relPath), 'utf8'));
  jsonCache.set(relPath, parsed);
  return parsed;
}

function decodePointerPart(part) {
  return part.replace(/~1/g, '/').replace(/~0/g, '~');
}

function pointerGet(obj, pointer) {
  if (pointer === '') return { exists: true, value: obj };
  if (typeof pointer !== 'string' || !pointer.startsWith('/')) return { exists: false, value: undefined };
  let current = obj;
  for (const rawPart of pointer.slice(1).split('/')) {
    const part = decodePointerPart(rawPart);
    if (Array.isArray(current)) {
      if (!/^0$|^[1-9][0-9]*$/.test(part)) return { exists: false, value: undefined };
      const idx = Number(part);
      if (idx < 0 || idx >= current.length) return { exists: false, value: undefined };
      current = current[idx];
      continue;
    }
    if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
      continue;
    }
    return { exists: false, value: undefined };
  }
  return { exists: true, value: current };
}

function isMarkdownSource(pointer) {
  return pointer === 'n/a_markdown_section';
}

function jsonRecord(sectionKey, evidence_id, evidence_title, evidence_type, source_artifact, source_json_pointer, limitation) {
  const portfolio_section = SECTION_TITLES[sectionKey];
  const fileOk = fileExists(source_artifact);
  sourceFileChecks.push({ evidence_id, source_artifact, passed: fileOk });
  if (!fileOk) {
    errors.push(`Missing source file for ${evidence_id}: ${source_artifact}`);
    return { evidence_id, evidence_title, evidence_type, source_artifact, source_json_pointer, displayed_value: null, limitation, portfolio_section };
  }

  let pointerOk = false;
  let displayed_value = null;
  try {
    const json = readJson(source_artifact);
    const pointerResult = pointerGet(json, source_json_pointer);
    pointerOk = pointerResult.exists;
    displayed_value = pointerResult.exists ? pointerResult.value : null;
  } catch (error) {
    errors.push(`JSON read failed for ${evidence_id}: ${source_artifact}: ${error.message}`);
  }
  jsonPointerChecks.push({ evidence_id, source_artifact, source_json_pointer, passed: pointerOk });
  if (!pointerOk) errors.push(`Missing JSON Pointer for ${evidence_id}: ${source_artifact} ${source_json_pointer}`);

  return { evidence_id, evidence_title, statement: evidence_title, evidence_type, source_path: source_artifact, source_artifact, source_json_pointer, displayed_value, limitation, portfolio_section };
}

function computedJsonRecord(sectionKey, evidence_id, evidence_title, evidence_type, source_artifact, source_json_pointer, displayed_value, limitation) {
  const portfolio_section = SECTION_TITLES[sectionKey];
  const fileOk = fileExists(source_artifact);
  sourceFileChecks.push({ evidence_id, source_artifact, passed: fileOk });
  if (!fileOk) {
    errors.push(`Missing source file for ${evidence_id}: ${source_artifact}`);
    return { evidence_id, evidence_title, statement: evidence_title, evidence_type, source_path: source_artifact, source_artifact, source_json_pointer, displayed_value: null, limitation, portfolio_section };
  }

  let pointerOk = false;
  try {
    const json = readJson(source_artifact);
    pointerOk = pointerGet(json, source_json_pointer).exists;
  } catch (error) {
    errors.push(`JSON read failed for ${evidence_id}: ${source_artifact}: ${error.message}`);
  }
  jsonPointerChecks.push({ evidence_id, source_artifact, source_json_pointer, passed: pointerOk });
  if (!pointerOk) errors.push(`Missing JSON Pointer for ${evidence_id}: ${source_artifact} ${source_json_pointer}`);

  return { evidence_id, evidence_title, statement: evidence_title, evidence_type, source_path: source_artifact, source_artifact, source_json_pointer, displayed_value, limitation, portfolio_section };
}

function markdownRecord(sectionKey, evidence_id, evidence_title, source_artifact, displayed_value, limitation) {
  const portfolio_section = SECTION_TITLES[sectionKey];
  const source_json_pointer = 'n/a_markdown_section';
  const fileOk = fileExists(source_artifact);
  sourceFileChecks.push({ evidence_id, source_artifact, passed: fileOk });
  if (!fileOk) errors.push(`Missing markdown source file for ${evidence_id}: ${source_artifact}`);
  return { evidence_id, evidence_title, statement: evidence_title, evidence_type: 'artifact_derived', source_path: source_artifact, source_artifact, source_json_pointer, displayed_value, limitation, portfolio_section };
}


const runtimeExecution = readJson('outputs/runtime_execution.json');
const realBriefParserRuntimeSource = 'outputs/real_agent_brief_parser_runtime.json';
const realBriefParserRuntime = readJson(realBriefParserRuntimeSource);
const realAgentTraceSource = 'outputs/real_agent_trace.json';
const realAgentTrace = readJson(realAgentTraceSource);
const artifactValidationReport = readJson('outputs/artifact_validation_report.json');
const runtimeSchemaValidationResult = (artifactValidationReport.results || []).find((result) => result.validation === 'schema' && result.artifact_path === 'outputs/runtime_execution.json') || null;
const runtimeParallelGroup = (runtimeExecution.parallel_groups || [])[0] || {};
const runtimeParallelNodeIds = runtimeParallelGroup.parallel_node_ids || [];
const runtimeMeasuredNodeCount = (runtimeExecution.nodes || []).filter((node) => node.timing_status === 'measured' && typeof node.duration_ms === 'number').length;
const runtimeBusinessStageCount = runtimeParallelNodeIds.length > 0 ? (runtimeExecution.nodes || []).length - runtimeParallelNodeIds.length + 1 : (runtimeExecution.nodes || []).length;
const runtimeModelUsageStatuses = [...new Set((runtimeExecution.nodes || []).map((node) => node.model_usage && node.model_usage.usage_status).filter(Boolean))];
const runtimeTokenAndCostNull = (runtimeExecution.nodes || []).every((node) => {
  const usage = node.model_usage || {};
  return usage.prompt_tokens === null
    && usage.completion_tokens === null
    && usage.total_tokens === null
    && usage.estimated_cost === null;
}) && runtimeExecution.runtime_summary.total_input_tokens === null
  && runtimeExecution.runtime_summary.total_output_tokens === null
  && runtimeExecution.runtime_summary.estimated_cost === null;
const runtimeFanOutFanIn = {
  fan_out_from: runtimeParallelGroup.fan_out_from || null,
  parallel_node_ids: runtimeParallelNodeIds,
  fan_in_to: runtimeParallelGroup.fan_in_to || null,
  status: runtimeParallelGroup.status || null,
  expected_parallel_skills_present: ['audience_insight', 'selling_point_analyst', 'platform_strategy'].every((id) => runtimeParallelNodeIds.includes(id))
};

const pack = {
  meta: {
    artifact_name: 'portfolio_evidence_pack',
    evidence_pack_version: '0.1.0',
    product_name: '运动相机',
    status: 'needs_review',
    production_ready: false,
    customer_validated: false,
    artifact_version: '0.1.0',
    brief_id: 'brief_demo_action_camera_001',
    producer: 'Deterministic Portfolio Evidence Pack Builder',
    generated_at: new Date().toISOString(),
    generated_at_type: 'measured_build_time',
    notes: [
      'Deterministic script output; no model call is used.',
      'source_found, Schema pass, JSON Pointer checks, and file existence do not prove real-world truth.',
      'Mock, estimated, not_available, and human_review_required evidence must keep their limitations.',
      'This package is not production ready and has not been customer validated.',
      'generated_at is the Evidence Pack build time, not a historical timestamp for Steps 1-15; historical node timestamps must not be fabricated.'
    ]
  },
  project_overview: [
    jsonRecord('project_overview', 'ev_project_overview_001', '项目定位', 'artifact_derived', 'outputs/v2_final_report.json', '/project_overview/positioning', '项目定位来自 V2 报告，不代表生产系统上线。'),
    jsonRecord('project_overview', 'ev_project_overview_002', '中文项目名称', 'artifact_derived', 'outputs/v2_final_report.json', '/meta/project_name_cn', '名称只说明作品集项目，不代表商业产品已发布。'),
    jsonRecord('project_overview', 'ev_project_overview_003', 'Demo 商品命名', 'artifact_derived', 'outputs/v2_final_report.json', '/project_overview/demo_product', '商品名称只能使用“运动相机”，不能把参数词恢复为商品名称或事实承诺。'),
    jsonRecord('project_overview', 'ev_project_overview_004', '作品集能力焦点', 'artifact_derived', 'outputs/v2_final_report.json', '/project_overview/portfolio_focus', '能力焦点是作品集展示范围，不代表真实客户部署。')
  ],
  business_problem: [
    jsonRecord('business_problem', 'ev_business_problem_001', '业务问题摘要', 'artifact_derived', 'outputs/v2_final_report.json', '/business_problem/summary', '这是问题定义，不是客户访谈或客户验证完成。'),
    jsonRecord('business_problem', 'ev_business_problem_002', '业务问题清单', 'artifact_derived', 'outputs/v2_final_report.json', '/business_problem/problems', '来自项目报告总结，不代表覆盖所有行业场景。'),
    markdownRecord('business_problem', 'ev_business_problem_003', '作品集定位建议', 'docs/portfolio_requirements_mapping.md', '面向电商运营团队的多 Agent 增长工作台，强调活动规划、合规审核和复盘指标设计。', 'Markdown 来源只作为 artifact-derived 定位说明；涉及耗时只能标注为 estimated。')
  ],
  workflow_evidence: [
    jsonRecord('workflow_evidence', 'ev_workflow_001', 'Steps 1-15 覆盖', 'artifact_derived', 'outputs/workflow_execution_log.json', '/workflow_summary/covered_steps', '覆盖来自 retrospective artifact-derived log，不代表重新执行 Steps 1-15。'),
    jsonRecord('workflow_evidence', 'ev_workflow_002', '节点数量', 'artifact_derived', 'outputs/workflow_execution_log.json', '/workflow_summary/node_count', '节点数量是历史 artifact 覆盖数量，不是真实运行 telemetry。'),
    jsonRecord('workflow_evidence', 'ev_workflow_003', 'V2 工作流顺序', 'artifact_derived', 'outputs/v2_final_report.json', '/designed_v2_workflow/sequence', '这是目标治理工作流描述，不解除 release gates。'),
    jsonRecord('workflow_evidence', 'ev_workflow_004', 'V2 治理节点', 'artifact_derived', 'outputs/v2_final_report.json', '/designed_v2_workflow/v2_nodes_added', '这些是既有治理/汇总节点，不是本证据包新增 Agent 节点。'),
    jsonRecord('workflow_evidence', 'ev_workflow_005', 'V1 Artifact Index', 'artifact_derived', 'outputs/v2_final_report.json', '/artifact_index/v1_artifacts', '只展示结构化规划产物，不展示最终营销素材。'),
    jsonRecord('workflow_evidence', 'ev_workflow_006', 'V2 Artifact Index', 'artifact_derived', 'outputs/v2_final_report.json', '/artifact_index/v2_artifacts', 'V2 产物是治理与测评汇总，不授权最终生成或发布。'),
    markdownRecord('workflow_evidence', 'ev_workflow_007', '工作流图', 'docs/workflow_diagram.md', 'V2 图展示 Brief、Parser、Planner、分析节点、Creative、Brand Compliance、Human Approval、Image Prompt Skill、Growth Evaluation、Final Report Generator 的关系。', '工作流图用于作品集说明，不代表真实 per-node runtime telemetry。'),
    markdownRecord('workflow_evidence', 'ev_workflow_two_stage_001', '双阶段合规目标工作流', 'docs/two_stage_compliance_spec.md', '正式目标工作流包含 Brand Compliance Agent 的 pre_check 和 post_generation_check 两次调用。', '这是后续正式工作流目标设计，不改写 Steps 1-15 的历史真实执行顺序。'),
    markdownRecord('workflow_evidence', 'ev_workflow_two_stage_002', '单一合规 Agent 与单一 Image Prompt Skill', 'docs/two_stage_compliance_spec.md', '双阶段合规是同一个 Brand Compliance Agent 的两次调用，并保持单一 Image Prompt Skill。', '不是两个 Compliance Agent，也不拆分 Image Prompt Skill。'),
    computedJsonRecord('workflow_evidence', 'ev_worktrace_workflow_001', '历史 WorkTrace 覆盖 15 个节点', 'artifact_derived', 'outputs/worktrace.json', '/nodes', 15, '历史 WorkTrace 覆盖 Steps 1-15，但不改变历史工作流，也不是 Step 16。'),
    computedJsonRecord('workflow_evidence', 'ev_worktrace_workflow_002', 'Failure Scenario WorkTrace 覆盖 3 个节点', 'artifact_derived', 'outputs/worktrace_failure_scenario.json', '/nodes', 3, 'Failure Scenario WorkTrace 是确定性测试链路，不是新增 Agent。'),
    computedJsonRecord('workflow_evidence', 'ev_worktrace_workflow_003', '两个 artifact_trace_key 均稳定', 'deterministic_verified', 'outputs/worktrace.json', '/trace_summary/artifact_trace_key', {
      historical_artifact_trace_key: 'historical_artifact_trace_534a02a2ce551ed2',
      failure_scenario_artifact_trace_key: 'failure_scenario_trace_80a52dcaa5997a67',
      stable: true
    }, 'artifact_trace_key 根据来源产物确定性生成，只用于历史/测试产物关联。'),
    computedJsonRecord('workflow_evidence', 'ev_worktrace_workflow_004', 'artifact_trace_key 不等于运行时 trace_id', 'not_available', 'outputs/worktrace.json', '/limitations/0', 'artifact_trace_key is not runtime trace_id; both trace_id values are null.', 'artifact_trace_key 不能写成 request_id 或 trace_id。')
  ],
  validation_evidence: [
    jsonRecord('validation_evidence', 'ev_validation_001', 'JSON 解析总数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/parse_validation/total_json_files', 'JSON parse pass 只代表可解析为 JSON，不代表通过 Schema 或事实正确。'),
    jsonRecord('validation_evidence', 'ev_validation_002', 'JSON 解析通过数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/parse_validation/passed', '只验证 JSON 语法。'),
    jsonRecord('validation_evidence', 'ev_validation_003', 'JSON 解析失败数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/parse_validation/failed', '不代表内容事实已证明。'),
    jsonRecord('validation_evidence', 'ev_validation_004', 'Schema 映射数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/schema_validation/mapped_artifacts', '当前只覆盖映射的关键治理 artifact，不代表 100% Schema coverage。'),
    jsonRecord('validation_evidence', 'ev_validation_005', 'Schema 通过数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/schema_validation/passed', 'Schema pass 不证明真实业务效果。'),
    jsonRecord('validation_evidence', 'ev_validation_006', 'Schema 失败数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/schema_validation/failed', '仅表示映射 Schema 未失败。'),
    jsonRecord('validation_evidence', 'ev_validation_007', '验证脚本路径', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/script_path', '脚本验证结构和关键状态，不验证现实事实。'),
    jsonRecord('validation_evidence', 'ev_validation_008', '验证脚本退出码', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/script_exit_code', '退出码 0 不解除 blocked release gates。'),
    computedJsonRecord('validation_evidence', 'ev_runtime_validation_001', 'Runtime Schema 验证通过', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/results', runtimeSchemaValidationResult, 'Runtime Schema pass 只证明 outputs/runtime_execution.json 符合结构契约，不证明模型调用、真实人工审批或业务效果。'),
    jsonRecord('validation_evidence', 'ev_validation_two_stage_001', '双阶段 validation_status', 'deterministic_verified', 'outputs/two_stage_compliance_validation_report.json', '/validation_status', 'validation_status = pass 只代表双阶段验证脚本的结构与治理约束通过，不解除 needs_review。'),
    jsonRecord('validation_evidence', 'ev_validation_two_stage_002', '双阶段 identity checks', 'deterministic_verified', 'outputs/two_stage_compliance_validation_report.json', '/identity_checks/all_passed', 'identity checks 通过不代表历史执行顺序被改写。'),
    jsonRecord('validation_evidence', 'ev_validation_two_stage_003', '双阶段 risk tracking checks', 'deterministic_verified', 'outputs/two_stage_compliance_validation_report.json', '/risk_tracking_checks/all_passed', 'risk tracking checks 通过不代表所有风险被解决。'),
    jsonRecord('validation_evidence', 'ev_validation_two_stage_004', '双阶段 release gate checks', 'deterministic_verified', 'outputs/two_stage_compliance_validation_report.json', '/release_gate_checks/all_passed', 'release gate checks 通过表示五个关键 release gates 继续 blocked。'),
    computedJsonRecord('validation_evidence', 'ev_worktrace_validation_001', 'JSON 解析通过数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/parse_validation', { passed: artifactValidationReport.parse_validation.passed, total: artifactValidationReport.parse_validation.total_json_files, failed: artifactValidationReport.parse_validation.failed }, 'JSON parse pass 只代表文件可解析，不代表治理通过或生产可用。'),
    computedJsonRecord('validation_evidence', 'ev_worktrace_validation_002', 'Schema 映射通过数', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/schema_validation', { passed: artifactValidationReport.schema_validation.passed, mapped_artifacts: artifactValidationReport.schema_validation.mapped_artifacts, failed: artifactValidationReport.schema_validation.failed }, 'Schema pass 不代表 Governance pass、人工审批通过或 release permission。'),
    computedJsonRecord('validation_evidence', 'ev_worktrace_validation_003', '两个 WorkTrace 均通过同一 WorkTrace Schema', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/schema_coverage/covered_artifacts', ['outputs/worktrace.json -> schemas/artifacts/worktrace.schema.json', 'outputs/worktrace_failure_scenario.json -> schemas/artifacts/worktrace.schema.json'], '同一 Schema 验证只证明结构与约束通过，不证明生产可用。'),
    computedJsonRecord('validation_evidence', 'ev_worktrace_validation_004', 'WorkTrace 文件引用检查全部通过', 'deterministic_verified', 'outputs/worktrace.json', '/nodes', { historical: '118/118', failure_scenario: '18/18' }, '文件引用存在不证明内容事实正确、治理通过或发布许可。')
  ],
  execution_trace_evidence: [
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_001', 'Log 类型', 'artifact_derived', 'outputs/workflow_execution_log.json', '/meta/log_type', '这是 retrospective artifact-derived log，不是生产 telemetry。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_002', 'Telemetry 类型', 'artifact_derived', 'outputs/workflow_execution_log.json', '/meta/telemetry_type', '不得用于展示真实每节点运行耗时。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_003', '输入文件检查', 'deterministic_verified', 'outputs/workflow_execution_log.json', '/workflow_summary/input_file_checks', '文件存在检查不证明内容事实正确。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_004', '输出文件检查', 'deterministic_verified', 'outputs/workflow_execution_log.json', '/workflow_summary/output_file_checks', '输出存在不代表生产交付。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_005', 'historical_not_available 节点数', 'not_available', 'outputs/workflow_execution_log.json', '/workflow_summary/historical_not_available_node_count', '节点时间均不可用，不能补造时间。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_006', 'measured node runtime 数量', 'not_available', 'outputs/workflow_execution_log.json', '/workflow_summary/measured_node_time_count', '当前没有真实 per-node runtime。'),
    jsonRecord('execution_trace_evidence', 'ev_execution_trace_007', 'Timing policy', 'not_available', 'outputs/workflow_execution_log.json', '/workflow_summary/timing_policy', '必须保留 historical_not_available 边界，不能写成真实运行时间。'),
    jsonRecord('execution_trace_evidence', 'ev_worktrace_execution_001', '历史 Trace 的 trace_id = null', 'not_available', 'outputs/worktrace.json', '/trace_summary/trace_id', '历史执行没有真实运行时 trace_id，不得补造。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_002', '15 个历史节点全部 historical_not_available', 'not_available', 'outputs/worktrace.json', '/nodes', 15, '历史节点时间不可用，不能补造 started_at、completed_at 或 duration_ms。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_003', 'measured 历史节点数量为 0', 'not_available', 'outputs/worktrace.json', '/nodes', 0, '历史 WorkTrace 没有 measured 节点 runtime。'),
    jsonRecord('execution_trace_evidence', 'ev_worktrace_execution_004', 'Failure Scenario duration_ms = 58', 'measured', 'outputs/worktrace_failure_scenario.json', '/trace_summary/duration_ms', '58 ms 只属于 Failure Scenario Test 脚本总耗时，不是 Planner 或完整工作流耗时。'),
    jsonRecord('execution_trace_evidence', 'ev_worktrace_execution_005', 'Failure Scenario retry_count = 1', 'deterministic_verified', 'outputs/worktrace_failure_scenario.json', '/trace_summary/retry_count', 'retry_count = 1 只属于 Failure Scenario Test。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_006', '初次 blocked，修复后 pass', 'deterministic_verified', 'outputs/worktrace_failure_scenario.json', '/nodes', { initial_status: 'blocked', revision_status: 'pass', rerun_status: 'pass' }, '该状态只验证输入结构错误和修复路径，不评估商品声明。'),
    jsonRecord('execution_trace_evidence', 'ev_worktrace_execution_007', 'Human Approval = needs_revision', 'human_review_required', 'outputs/human_approval_record.json', '/approval_summary/overall_decision', 'Human Approval 仍需修订，不能写成 approved。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_008', 'Claim links 44，unique claim_ids 14', 'artifact_derived', 'outputs/worktrace.json', '/nodes', { claim_links: 44, unique_claim_ids: 14 }, '关联规则为 direct_output_lineage，不使用公共输入文件批量传播。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_009', 'Risk links 18，unique risk_ids 10', 'artifact_derived', 'outputs/worktrace.json', '/nodes', { risk_links: 18, unique_risk_ids: 10, unlinked_risk_ids: 1 }, '1 个 risk_id 无法直接归属历史节点时不强行关联。'),
    computedJsonRecord('execution_trace_evidence', 'ev_worktrace_execution_010', '节点内无重复关联', 'deterministic_verified', 'outputs/worktrace.json', '/nodes', { duplicate_risk_ids_in_node: false, duplicate_claim_ids_in_node: false }, '去重只证明关联结构质量，不代表风险或声明已获批准。'),
    jsonRecord('execution_trace_evidence', 'ev_runtime_execution_001', 'Runtime run_id', 'measured', 'outputs/runtime_execution.json', '/run_id', 'run_id 来自本次 Runtime Runner 输出，不得用于补写历史 WorkTrace。'),
    jsonRecord('execution_trace_evidence', 'ev_runtime_execution_002', 'Runtime started_at', 'measured', 'outputs/runtime_execution.json', '/started_at', 'started_at 是本地 instrumented workflow 的运行开始时间，不是 Steps 1-15 历史时间。'),
    jsonRecord('execution_trace_evidence', 'ev_runtime_execution_003', 'Runtime ended_at', 'measured', 'outputs/runtime_execution.json', '/ended_at', 'ended_at 是本地 instrumented workflow 的运行结束时间，不是历史节点时间。'),
    jsonRecord('execution_trace_evidence', 'ev_runtime_execution_004', 'Runtime duration_ms', 'measured', 'outputs/runtime_execution.json', '/duration_ms', 'duration_ms 是本地插桩脚本读取、检查和编排已有结构化产物的实测耗时；不是模型推理耗时、生产 Agent 延迟或业务效率提升。'),
    computedJsonRecord('execution_trace_evidence', 'ev_runtime_execution_005', '10 个业务阶段与 12 个 Runtime 节点的区别', 'deterministic_verified', 'outputs/runtime_execution.json', '/nodes', { business_stage_count: runtimeBusinessStageCount, measured_runtime_node_count: runtimeMeasuredNodeCount, runtime_node_count: (runtimeExecution.nodes || []).length }, 'Insight Skills 是一个业务阶段，但在 Runtime 中拆为三个 measured 并行 Skill 节点，因此 10 个业务阶段对应 12 个 Runtime 节点。'),
    computedJsonRecord('execution_trace_evidence', 'ev_runtime_execution_006', 'Planner fan-out / fan-in 并行关系', 'measured', 'outputs/runtime_execution.json', '/parallel_groups/0', runtimeFanOutFanIn, 'Planner fan-out 到三个 Insight Skill，再 fan-in 到 Creative Agent；这是本地 Promise.all 编排记录，不是额外 Agent 节点。'),
    computedJsonRecord('execution_trace_evidence', 'ev_runtime_execution_007', 'Runtime model usage 未使用模型', 'measured', 'outputs/runtime_execution.json', '/nodes', { usage_statuses: runtimeModelUsageStatuses, model_call_count: runtimeExecution.runtime_summary.model_call_count }, 'Runtime 只读取、检查和编排已有结构化产物，没有调用模型、OpenClaw Agent、网络服务或外部 API。'),
    computedJsonRecord('execution_trace_evidence', 'ev_runtime_execution_008', 'Runtime Token 与成本均为 null', 'measured', 'outputs/runtime_execution.json', '/runtime_summary', { token_and_cost_null: runtimeTokenAndCostNull, total_input_tokens: runtimeExecution.runtime_summary.total_input_tokens, total_output_tokens: runtimeExecution.runtime_summary.total_output_tokens, estimated_cost: runtimeExecution.runtime_summary.estimated_cost }, '未采集且未发生模型调用时，Token 与成本保持 null；不得补造 Token、成本或业务指标。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_001', 'Brief Parser 完成真实模型 Runtime 调用', 'measured', realBriefParserRuntimeSource, '/runtime_type', '该证据只说明 Brief Parser 单节点出现真实模型 Runtime 记录；不代表完整多 Agent Runtime。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_002', 'Brief Parser Runtime provider', 'measured', realBriefParserRuntimeSource, '/provider', 'provider 来自 Runtime JSON；不代表完整多 Agent Runtime。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_003', 'Brief Parser Runtime model', 'measured', realBriefParserRuntimeSource, '/model', 'model 来自 Runtime JSON；不代表完整多 Agent Runtime。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_004', 'Brief Parser Runtime duration_ms', 'measured', realBriefParserRuntimeSource, '/duration_ms', 'duration_ms 来自 Brief Parser Runtime JSON；不得外推为完整工作流耗时。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_005', 'Brief Parser Runtime usage.total', 'measured', realBriefParserRuntimeSource, '/usage/total', 'usage.total 来自 Brief Parser Runtime JSON；不得补造其他节点 Token。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_006', 'Brief Parser Runtime stop_reason', 'measured', realBriefParserRuntimeSource, '/stop_reason', 'stop_reason 来自 Brief Parser Runtime JSON；不代表业务效果通过。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_007', 'Brief Parser Runtime fallback_used', 'measured', realBriefParserRuntimeSource, '/fallback_used', 'fallback_used 来自 Brief Parser Runtime JSON；不代表完整多 Agent Runtime。'),
    computedJsonRecord('execution_trace_evidence', 'ev_real_agent_runtime_008', 'Brief Parser Runtime cost 当前不可用', 'not_available', realBriefParserRuntimeSource, '', realBriefParserRuntime.cost ?? null, 'Runtime JSON 未提供可用 cost；成本证据保持 not_available，不补造成本。'),
    computedJsonRecord('execution_trace_evidence', 'ev_real_agent_trace_001', 'Brief Parser 单节点 Real Agent Trace', 'measured', realAgentTraceSource, '/trace_type', { trace_type: realAgentTrace.trace_type, node_id: realAgentTrace.node_id, scope: 'brief_parser_single_node' }, '该证据只说明 Brief Parser 单节点 Real Agent Trace；不是完整工作流 Trace。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_trace_002', 'Brief Parser Trace artifact_trace_key', 'deterministic_verified', realAgentTraceSource, '/artifact_trace_key', 'artifact_trace_key 只用于稳定关联该 Brief Parser 单节点 Trace；不得写成 runtime trace_id。'),
    computedJsonRecord('execution_trace_evidence', 'ev_real_agent_trace_003', 'Brief Parser Trace 事件数量', 'measured', realAgentTraceSource, '/events', realAgentTrace.event_count ?? (realAgentTrace.events || []).length, '事件数量只属于 Brief Parser 单节点 Trace，不代表完整工作流事件数量。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_trace_004', 'Brief Parser Trace 真实 Tool Call 数量', 'measured', realAgentTraceSource, '/tool_call_count', 'tool_call_count = 0 必须如实记录；该单节点 Trace 没有真实 Tool Call。'),
    computedJsonRecord('execution_trace_evidence', 'ev_real_agent_trace_005', 'Brief Parser Trace 错误与重试数量', 'measured', realAgentTraceSource, '', { error_count: realAgentTrace.error_count, retry_count: realAgentTrace.retry_count }, '错误与重试数量只属于 Brief Parser 单节点 Trace，不代表完整工作流错误率或重试率。'),
    jsonRecord('execution_trace_evidence', 'ev_real_agent_trace_006', 'Brief Parser Runtime 未提供 trace_id', 'not_available', realAgentTraceSource, '/trace_id_status', 'Runtime 未提供 trace_id；不得把 artifact_trace_key 写成 runtime trace_id。')
  ],
  claim_trace_evidence: [
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_001', '声明总数', 'artifact_derived', 'outputs/claim_trace_matrix.json', '/summary/claim_total', '声明被追踪不代表现实事实已证明。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_002', '六类声明覆盖', 'artifact_derived', 'outputs/claim_trace_matrix.json', '/summary/claim_category_counts', '覆盖类别不等于各声明已获正式证明或授权。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_003', 'source_found 计数', 'human_review_required', 'outputs/claim_trace_matrix.json', '/summary/source_exists_counts/source_found', 'source_found 只代表来源字段存在，不代表现实事实已经证明。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_004', '证据状态计数', 'artifact_derived', 'outputs/claim_trace_matrix.json', '/summary/evidence_status_counts', 'requires_human_verification、not_available 和 derived_from_mock 必须显式展示边界。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_005', '人工审核要求数量', 'human_review_required', 'outputs/claim_trace_matrix.json', '/summary/human_review_required_count', '需要人工审核的声明不能展示为已被现实证明。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_006', 'Claim file checks', 'deterministic_verified', 'outputs/claim_trace_matrix.json', '/summary/file_checks', '文件检查通过不证明事实真实性。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_007', 'Claim JSON Pointer checks', 'deterministic_verified', 'outputs/claim_trace_matrix.json', '/summary/json_pointer_checks', 'JSON Pointer 存在不等于现实事实成立。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_008', 'Release gates preserved', 'measured', 'outputs/claim_trace_matrix.json', '/summary/release_gates_preserved', '只表示 Claim Trace 扩展未解除 gates。'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_009', 'Claim release gates', 'measured', 'outputs/claim_trace_matrix.json', '/release_gates', 'Evaluation permission does not equal final generation permission.'),
    jsonRecord('claim_trace_evidence', 'ev_claim_trace_010', 'Source priority rules', 'artifact_derived', 'outputs/claim_trace_matrix.json', '/source_priority', 'Agent 下游产物不能反向证明原始事实；mock 数据不能证明真实业务效果。')
  ],
  evaluation_evidence: [
    jsonRecord('evaluation_evidence', 'ev_evaluation_001', 'Overall evaluation status', 'artifact_derived', 'outputs/growth_evaluation_report.json', '/meta/status', '不是 pass，不代表生产可用。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_002', 'Data quality', 'artifact_derived', 'outputs/growth_evaluation_report.json', '/data_quality_summary/overall_data_quality', '数据质量为 partial，不能写成完整真实数据闭环。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_003', 'Completed demo cases', 'derived_from_mock', 'outputs/growth_evaluation_report.json', '/data_quality_summary/completed_demo_cases', '单一 Demo 案例，不能外推到多品类稳定性。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_004', 'Pending demo cases', 'not_available', 'outputs/growth_evaluation_report.json', '/data_quality_summary/pending_demo_cases', '未提供完整 Brief，不能伪造结果。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_005', 'Data source type rules', 'artifact_derived', 'outputs/growth_evaluation_report.json', '/data_quality_summary/data_source_type_rules', '类型定义必须在展示中保留，不得混写成真实效果。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_006', 'Benchmark case data source', 'derived_from_mock', 'outputs/growth_evaluation_report.json', '/benchmark_cases/0/data_source_type', '完整 Demo 的测试数据来源为 mock 派生。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_007', '平均耗时指标类型', 'estimated', 'outputs/growth_evaluation_report.json', '/metric_results/1/data_source_type', '不能写成真实效率提升。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_008', '人工修改率可用性', 'not_available', 'outputs/growth_evaluation_report.json', '/metric_results/2/data_source_type', '缺少人工字段级标注。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_009', '幻觉率可用性', 'not_available', 'outputs/growth_evaluation_report.json', '/metric_results/3/data_source_type', '缺少 claim 抽检分母和 unsupported-claim 分子。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_010', '审批闸口正确率来源类型', 'measured', 'outputs/growth_evaluation_report.json', '/metric_results/7/data_source_type', '只证明当前 artifact 中 gate 继承正确，不代表最终发布可用。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_011', 'Rubric 结果', 'measured', 'outputs/growth_evaluation_report.json', '/rubric_results', 'Rubric 来自当前 artifact 测评，不代表真实客户场景稳定性。'),
    jsonRecord('evaluation_evidence', 'ev_evaluation_012', 'Workflow gate checks', 'measured', 'outputs/growth_evaluation_report.json', '/workflow_gate_checks', '只证明当前 gate 继承符合预期，不证明生产上线。')
  ],
  enterprise_governance: [
    jsonRecord('enterprise_governance', 'ev_governance_001', 'Human Approval status', 'measured', 'outputs/human_approval_record.json', '/meta/status', 'needs_revision 不是最终放行。'),
    jsonRecord('enterprise_governance', 'ev_governance_002', 'Final generation allowed', 'measured', 'outputs/human_approval_record.json', '/approval_summary/final_generation_allowed', '最终生成仍 blocked。'),
    jsonRecord('enterprise_governance', 'ev_governance_003', 'Public release allowed', 'measured', 'outputs/human_approval_record.json', '/approval_summary/public_release_allowed', '公开发布仍 blocked。'),
    jsonRecord('enterprise_governance', 'ev_governance_004', 'Reviewer authenticity boundary', 'human_review_required', 'outputs/human_approval_record.json', '/reviewer_record', '不得伪造真实人工审批、签字或授权证明。'),
    jsonRecord('enterprise_governance', 'ev_governance_005', 'Release gates', 'measured', 'outputs/v2_final_report.json', '/release_gates', 'approved_for_evaluation_only 不等于最终生成或公开发布许可。'),
    jsonRecord('enterprise_governance', 'ev_governance_006', 'Schema validation status', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/status', 'Schema pass 不证明事实、授权或业务效果。'),
    jsonRecord('enterprise_governance', 'ev_governance_007', 'Claim source priority', 'artifact_derived', 'outputs/claim_trace_matrix.json', '/source_priority', '必须展示 source_found、downstream artifact 和 mock data 的边界。'),
    jsonRecord('enterprise_governance', 'ev_governance_008', 'Revision queue', 'human_review_required', 'outputs/human_approval_record.json', '/revision_queue', '修订队列说明仍有人工审核与补证要求。'),
    jsonRecord('enterprise_governance', 'ev_governance_two_stage_001', 'Pre-check decision', 'human_review_required', 'outputs/brand_compliance_pre_check.json', '/decision_summary/decision', 'pre_check 结论仍为 needs_review，需要人工审核与补证。'),
    jsonRecord('enterprise_governance', 'ev_governance_two_stage_002', 'Post-generation-check decision', 'human_review_required', 'outputs/brand_compliance_post_generation_check.json', '/decision_summary/decision', 'post_generation_check 结论仍为 needs_review，只允许进入人工审核，不允许最终生成或发布。'),
    jsonRecord('enterprise_governance', 'ev_governance_two_stage_003', '双阶段风险计数', 'artifact_derived', 'outputs/two_stage_compliance_validation_report.json', '/risk_counts', '10 个 inherited/unresolved risks 和 1 个 newly detected risk 表示治理风险仍需审阅。'),
    jsonRecord('enterprise_governance', 'ev_governance_two_stage_004', 'risk_traceability_gap 治理发现', 'human_review_required', 'outputs/two_stage_compliance_validation_report.json', '/governance_findings/risk_traceability_gap_present', 'risk_traceability_gap 是治理发现，不是结构验证失败；需要人工审核跨阶段风险追踪。'),
    computedJsonRecord('enterprise_governance', 'ev_worktrace_governance_001', '五个关键 release gates 在两个 Trace 中均为 blocked', 'deterministic_verified', 'outputs/worktrace.json', '/release_gates', { historical_trace_blocked: true, failure_scenario_trace_blocked: true }, '两个 WorkTrace 均不解除最终营销文案、最终图片 Prompt、图片生成、前端页面或公开发布。'),
    jsonRecord('enterprise_governance', 'ev_worktrace_governance_002', 'Schema pass 不代表 Governance pass', 'artifact_derived', 'outputs/worktrace.json', '/limitations/4', 'Schema 和文件检查通过不证明治理通过、人工审批通过或生产可用。'),
    jsonRecord('enterprise_governance', 'ev_worktrace_governance_003', 'Human signature 仍为 pending', 'human_review_required', 'outputs/human_approval_record.json', '/reviewer_record/human_signature', '不得伪造真实人工签字、审核人或审核时间。'),
    jsonRecord('enterprise_governance', 'ev_runtime_governance_001', 'Runtime Human Approval 保持 needs_revision / pending', 'human_review_required', 'outputs/runtime_execution.json', '/human_approval', 'Runtime 中的 Human Approval 只是状态记录；没有真实人工审批、审核人或审核时间。'),
    jsonRecord('enterprise_governance', 'ev_runtime_governance_002', 'Runtime Release Gates 继续 blocked', 'measured', 'outputs/runtime_execution.json', '/release_gates', '五个 Runtime release gates 继续 blocked；不得解除最终营销文案、最终图片 Prompt、图片生成、前端页面或公开发布。')
  ],
  limitations: [
    jsonRecord('limitations', 'ev_limitation_001', '单一完整 Demo 案例', 'derived_from_mock', 'outputs/growth_evaluation_report.json', '/data_quality_summary/completed_demo_cases', '不能外推跨品类稳定性。'),
    jsonRecord('limitations', 'ev_limitation_002', '缺少真实客户数据', 'not_available', 'outputs/growth_evaluation_report.json', '/data_quality_summary/not_available_sources', '不得写客户验证完成。'),
    jsonRecord('limitations', 'ev_limitation_003', '缺少真实 per-node runtime', 'not_available', 'outputs/workflow_execution_log.json', '/workflow_summary/measured_node_time_count', '不得伪装成真实 runtime telemetry。'),
    jsonRecord('limitations', 'ev_limitation_004', 'mock 数据边界', 'derived_from_mock', 'outputs/claim_trace_matrix.json', '/source_priority/mock_data_rule', 'mock 或 demo 数据不能证明真实业务效果。'),
    jsonRecord('limitations', 'ev_limitation_005', '素材授权证明缺口', 'human_review_required', 'outputs/human_approval_record.json', '/approval_items/5', '没有正式素材授权证明，不能生成最终图片 Prompt、图片或公开发布。'),
    jsonRecord('limitations', 'ev_limitation_006', 'V2 limitations', 'artifact_derived', 'outputs/v2_final_report.json', '/limitations', 'V2 报告局限性必须保留，不能写成生产系统上线。'),
    jsonRecord('limitations', 'ev_limitation_007', 'blocked release gates', 'measured', 'outputs/v2_final_report.json', '/release_gates', '不得解除任何 blocked release gate。'),
    markdownRecord('limitations', 'ev_limitation_008', '作品集要求边界', 'docs/portfolio_requirements_mapping.md', '不夸大前端、接口、真实平台 API、真实客户数据或公开投放能力。', 'Markdown 来源只作为 artifact-derived 边界说明。'),
    jsonRecord('limitations', 'ev_limitation_two_stage_001', '双阶段合规回溯验证边界', 'artifact_derived', 'outputs/two_stage_compliance_validation_report.json', '/meta/execution_context', '这是 retrospective_design_validation，不是 Steps 1-15 的历史真实执行顺序。'),
    computedJsonRecord('limitations', 'ev_worktrace_limitation_001', '两个 trace_id 均为 null', 'not_available', 'outputs/worktrace.json', '/trace_summary/trace_id', { historical_trace_id: null, failure_scenario_trace_id: null }, '没有真实运行时 trace_id，不能补造。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_002', 'historical artifact_trace_key 不是运行时 ID', 'not_available', 'outputs/worktrace.json', '/limitations/0', 'artifact_trace_key 只能用于稳定关联历史产物，不能写成 request_id 或 trace_id。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_003', '58 ms 不是 Planner 或完整工作流耗时', 'measured', 'outputs/worktrace_failure_scenario.json', '/limitations/1', '58 ms 只属于 Failure Scenario Test 脚本总耗时。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_004', 'retry_count = 1 只属于 Failure Scenario Test', 'deterministic_verified', 'outputs/worktrace_failure_scenario.json', '/trace_summary/retry_count', '不能代表完整工作流或历史节点重试次数。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_005', '历史节点时间不可用', 'not_available', 'outputs/worktrace.json', '/limitations/2', '历史节点时间全部 historical_not_available，不能补造。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_006', '1 个 risk_id 无法直接归属历史节点', 'artifact_derived', 'outputs/worktrace.json', '/limitations/5', '无直接 output lineage 时不强行关联风险。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_007', 'production_ready = false', 'not_available', 'outputs/worktrace.json', '/boundaries/production_ready', 'Schema pass 和 WorkTrace pass 不代表生产可用。'),
    jsonRecord('limitations', 'ev_worktrace_limitation_008', 'customer_validated = false', 'not_available', 'outputs/worktrace.json', '/boundaries/customer_validated', '当前没有真实客户验证。'),
    computedJsonRecord('limitations', 'ev_runtime_limitation_001', 'Runtime 本地插桩边界', 'measured', 'outputs/runtime_execution.json', '/boundaries', { execution_context: runtimeExecution.execution_context, duration_ms: runtimeExecution.duration_ms, model_usage: runtimeModelUsageStatuses, token_and_cost_null: runtimeTokenAndCostNull }, '当前 Runtime 是本地 instrumented workflow，只读取、检查和编排已有结构化产物；没有调用模型、外部 API 或真实人工审批，duration_ms 不能描述成模型推理耗时、生产 Agent 延迟或业务效率提升。'),
    computedJsonRecord('limitations', 'ev_real_agent_runtime_limitation_001', '真实模型 Runtime 目前只覆盖 Brief Parser 单节点', 'measured', realBriefParserRuntimeSource, '/node_id', { node_id: realBriefParserRuntime.node_id, runtime_type: realBriefParserRuntime.runtime_type }, '当前只完成 Brief Parser 单节点真实模型 Runtime；不代表完整多 Agent Runtime 已实现。')
  ],
  reproducibility: [
    jsonRecord('reproducibility', 'ev_repro_001', 'Validation script command', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/script_path', '该命令验证 artifact，不生成最终营销内容。'),
    jsonRecord('reproducibility', 'ev_repro_002', 'Validation script exit code', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/script_exit_code', '退出码 0 不等于事实或业务效果已证明。'),
    jsonRecord('reproducibility', 'ev_repro_003', 'Workflow log builder', 'deterministic_verified', 'outputs/workflow_execution_log.json', '/meta/builder_script', '生成 retrospective artifact-derived log，不是真实 runtime telemetry。'),
    jsonRecord('reproducibility', 'ev_repro_004', 'Workflow log builder exit code', 'deterministic_verified', 'outputs/workflow_execution_log.json', '/meta/builder_exit_code', '退出码 0 不代表节点重新运行。'),
    jsonRecord('reproducibility', 'ev_repro_005', 'Claim Trace file checks', 'deterministic_verified', 'outputs/claim_trace_matrix.json', '/summary/file_checks', '文件存在不证明现实事实成立。'),
    jsonRecord('reproducibility', 'ev_repro_006', 'Claim Trace pointer checks', 'deterministic_verified', 'outputs/claim_trace_matrix.json', '/summary/json_pointer_checks', 'Pointer 存在不证明现实事实成立。'),
    jsonRecord('reproducibility', 'ev_repro_007', 'Validation report JSON root', 'deterministic_verified', 'outputs/artifact_validation_report.json', '', '报告入口，不是最终营销内容。'),
    jsonRecord('reproducibility', 'ev_repro_008', 'Claim Trace output JSON root', 'artifact_derived', 'outputs/claim_trace_matrix.json', '', '声明追踪矩阵不是正式证明材料库。'),
    jsonRecord('reproducibility', 'ev_repro_009', 'Workflow Trace output JSON root', 'artifact_derived', 'outputs/workflow_execution_log.json', '', '执行追踪来自历史 artifact，不是真实 per-node runtime。'),
    markdownRecord('reproducibility', 'ev_repro_010', 'Portfolio Evidence Pack Spec', 'docs/portfolio_evidence_pack_spec.md', 'Portfolio Evidence Pack Spec defines the evidence fields, evidence types, traceability rules, limitations, reproducibility entries, and blocked release gate preservation rules.', 'Spec 定义证据包结构和边界，不生成营销内容。'),
    jsonRecord('reproducibility', 'ev_repro_two_stage_001', '双阶段验证脚本 producer', 'deterministic_verified', 'outputs/two_stage_compliance_validation_report.json', '/meta/producer', '验证脚本为确定性脚本，不调用大模型。'),
    computedJsonRecord('reproducibility', 'ev_worktrace_repro_001', 'node scripts/build_worktrace.mjs', 'deterministic_verified', 'outputs/worktrace.json', '/trace_summary/artifact_trace_key', 'node scripts/build_worktrace.mjs', '构建历史 WorkTrace，不生成最终营销内容。'),
    computedJsonRecord('reproducibility', 'ev_worktrace_repro_002', 'node scripts/build_failure_worktrace.mjs', 'deterministic_verified', 'outputs/worktrace_failure_scenario.json', '/trace_summary/artifact_trace_key', 'node scripts/build_failure_worktrace.mjs', '构建 Failure Scenario WorkTrace，不调用 Planner 或模型。'),
    computedJsonRecord('reproducibility', 'ev_worktrace_repro_003', 'node scripts/build_portfolio_evidence_pack.mjs', 'deterministic_verified', 'outputs/portfolio_evidence_pack.json', '/meta/artifact_name', 'node scripts/build_portfolio_evidence_pack.mjs', '刷新证据包，不解除 release gates。'),
    computedJsonRecord('reproducibility', 'ev_worktrace_repro_004', 'node scripts/validate_artifacts.mjs', 'deterministic_verified', 'outputs/artifact_validation_report.json', '/meta/script_path', 'node scripts/validate_artifacts.mjs', '统一 JSON/Schema 验证，不证明治理通过。'),
    computedJsonRecord('reproducibility', 'ev_runtime_repro_001', 'node scripts/run_instrumented_workflow.mjs', 'deterministic_verified', 'outputs/runtime_execution.json', '/run_id', 'node scripts/run_instrumented_workflow.mjs', '运行本地插桩 Runtime Runner 并生成 Runtime 记录；不调用实时模型、不生成营销文案、不解除 release gates。')
  ],
  evidence_summary: {},
  release_gates: { ...FIXED_RELEASE_GATES }
};

function summarizeChecks(checks) {
  const total = checks.length;
  const passed = checks.filter((c) => c.passed).length;
  return { total, passed, failed: total - passed };
}

function validateInternal() {
  const ids = new Set();
  const duplicateIds = [];
  const sectionCounts = Object.fromEntries(SECTION_KEYS.map((k) => [k, 0]));
  const evidenceTypeCounts = Object.fromEntries(EVIDENCE_TYPES.map((k) => [k, 0]));

  for (const sectionKey of SECTION_KEYS) {
    const records = pack[sectionKey];
    if (!Array.isArray(records) || records.length === 0) {
      errors.push(`Section is empty: ${sectionKey}`);
      continue;
    }
    sectionCounts[sectionKey] = records.length;
    for (const record of records) {
      if (ids.has(record.evidence_id)) duplicateIds.push(record.evidence_id);
      ids.add(record.evidence_id);
      if (record.portfolio_section !== SECTION_TITLES[sectionKey]) {
        errors.push(`Portfolio section mismatch for ${record.evidence_id}: ${record.portfolio_section} !== ${SECTION_TITLES[sectionKey]}`);
      }
      if (!EVIDENCE_TYPES.includes(record.evidence_type)) {
        errors.push(`Invalid evidence_type for ${record.evidence_id}: ${record.evidence_type}`);
      } else {
        evidenceTypeCounts[record.evidence_type] += 1;
      }
      for (const field of ['evidence_id', 'evidence_title', 'source_artifact', 'limitation', 'portfolio_section']) {
        if (typeof record[field] !== 'string' || record[field].length === 0) {
          errors.push(`Missing non-empty field ${field} for ${record.evidence_id}`);
        }
      }
      if (!isMarkdownSource(record.source_json_pointer) && record.source_artifact.endsWith('.md')) {
        errors.push(`Markdown record must use n/a_markdown_section: ${record.evidence_id}`);
      }
      if (isMarkdownSource(record.source_json_pointer) && record.evidence_type !== 'artifact_derived') {
        errors.push(`Markdown record must be artifact_derived: ${record.evidence_id}`);
      }
    }
  }

  for (const id of duplicateIds) errors.push(`Duplicate evidence_id: ${id}`);

  for (const [gate, expected] of Object.entries(FIXED_RELEASE_GATES)) {
    if (pack.release_gates[gate] !== expected) errors.push(`Release gate changed: ${gate}`);
  }

  pack.evidence_summary = {
    evidence_total: [...ids].length,
    section_counts: sectionCounts,
    evidence_type_counts: evidenceTypeCounts,
    source_file_checks: summarizeChecks(sourceFileChecks),
    json_pointer_checks: summarizeChecks(jsonPointerChecks),
    duplicate_evidence_ids: duplicateIds,
    source_file_check_log: sourceFileChecks,
    json_pointer_check_log: jsonPointerChecks,
    boundary_notes: [
      'source_found only means the source field exists; it does not prove real-world truth.',
      'Schema pass validates structure and governance constraints; it does not prove real business outcomes.',
      'File existence does not prove factual correctness, customer validation, or production readiness.'
    ]
  };

  if (pack.evidence_summary.evidence_total < 30) errors.push('Evidence total is below 30.');
}

function formatValue(value) {
  if (typeof value === 'string') return value;
  return JSON.stringify(value, null, 2);
}

function buildMarkdown() {
  let md = '# Portfolio Evidence Pack\n\n';
  md += 'This deterministic evidence pack is generated from existing artifacts only. It is not Step 16, not a new Agent node, not production ready, and not customer validated. `source_found`, Schema pass, JSON Pointer checks, and file existence do not prove real-world truth.\n\n';
  md += '## Meta\n\n';
  md += `- product_name: ${pack.meta.product_name}\n`;
  md += `- status: ${pack.meta.status}\n`;
  md += `- production_ready: ${pack.meta.production_ready}\n`;
  md += `- customer_validated: ${pack.meta.customer_validated}\n`;
  md += '\n## Evidence Summary\n\n';
  md += `- evidence_total: ${pack.evidence_summary.evidence_total}\n`;
  md += `- section_counts: ${JSON.stringify(pack.evidence_summary.section_counts)}\n`;
  md += `- evidence_type_counts: ${JSON.stringify(pack.evidence_summary.evidence_type_counts)}\n`;
  md += `- source_file_checks: ${JSON.stringify(pack.evidence_summary.source_file_checks)}\n`;
  md += `- json_pointer_checks: ${JSON.stringify(pack.evidence_summary.json_pointer_checks)}\n`;
  md += '\n## Release Gates\n\n';
  for (const [gate, value] of Object.entries(pack.release_gates)) md += `- ${gate}: ${value}\n`;
  md += '\n';

  for (const sectionKey of SECTION_KEYS) {
    md += `## ${SECTION_TITLES[sectionKey]}\n\n`;
    for (const record of pack[sectionKey]) {
      md += `### ${record.evidence_id}: ${record.evidence_title}\n\n`;
      md += `- evidence_type: ${record.evidence_type}\n`;
      md += `- source_artifact: ${record.source_artifact}\n`;
      md += `- source_json_pointer: ${record.source_json_pointer}\n`;
      md += `- portfolio_section: ${record.portfolio_section}\n`;
      md += `- displayed_value:\n\n`;
      md += '```json\n' + JSON.stringify(record.displayed_value, null, 2) + '\n```\n\n';
      md += `- limitation: ${record.limitation}\n\n`;
    }
  }

  md += '## Boundary Notes\n\n';
  md += '- `source_found` only means a source field exists; it does not prove real-world truth.\n';
  md += '- Schema pass only validates structure and selected governance constraints.\n';
  md += '- File existence does not prove factual correctness.\n';
  md += '- Mock, estimated, not_available, and human_review_required evidence must remain labeled.\n';
  md += '- Blocked release gates remain unchanged.\n';
  return md;
}

validateInternal();

fs.mkdirSync(path.dirname(outputJsonPath), { recursive: true });
fs.writeFileSync(outputJsonPath, `${JSON.stringify(pack, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputMdPath, buildMarkdown(), 'utf8');

const exitCode = errors.length === 0 ? 0 : 1;
console.log(JSON.stringify({
  status: exitCode === 0 ? 'pass' : 'failed',
  outputs: ['outputs/portfolio_evidence_pack.json', 'outputs/portfolio_evidence_pack.md'],
  evidence_total: pack.evidence_summary.evidence_total,
  section_counts: pack.evidence_summary.section_counts,
  evidence_type_counts: pack.evidence_summary.evidence_type_counts,
  source_file_checks: pack.evidence_summary.source_file_checks,
  json_pointer_checks: pack.evidence_summary.json_pointer_checks,
  duplicate_evidence_ids: pack.evidence_summary.duplicate_evidence_ids,
  release_gates: pack.release_gates,
  errors,
  exit_code: exitCode
}, null, 2));

process.exit(exitCode);
