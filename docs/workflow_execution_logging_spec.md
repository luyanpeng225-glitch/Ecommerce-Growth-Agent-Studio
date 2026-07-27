# Workflow Execution Logging Spec

Validation Extension B / Substep 1：Workflow Execution Logging Spec。

本文件只定义未来 `workflow_execution_log.json` 的记录口径，不生成日志 JSON、不创建 Schema、不创建脚本、不重跑或修改 Steps 1-15，也不解除任何 release gate。

## 1. Scope and Boundaries

- 覆盖范围：Steps 1-15 的历史节点与既有产物。
- 当前动作：只新增本文档 `docs/workflow_execution_logging_spec.md`。
- 非当前动作：不生成 `workflow_execution_log.json`，不创建 JSON Schema，不创建 JavaScript 验证脚本，不更新 README / 文件导航，不修改任何上游 JSON。
- 不生成：最终营销文案、最终图片 Prompt、图片、前端页面或公开发布素材。
- 保留 blocked release gates：最终营销文案、最终图片 Prompt、图片生成、前端页面、公开发布继续 `blocked`。

## 2. Source Files Read for This Spec

- `PROJECT_MEMORY_FOR_OPENCLAW.md`
- `workflow/agent_workflow.md`
- `workflow/agent_io_contracts.md`
- `outputs/v2_final_report.json`
- Steps 1-15 既有 `outputs/` 产物清单

## 3. Timing Evidence Rule for Historical Nodes

Steps 1-15 是已经完成的历史节点。当前没有生产级执行日志或真实 per-node start/end timestamp。因此未来回填历史 workflow execution log 时，所有历史节点统一使用以下时间字段：

```json
{
  "started_at": null,
  "completed_at": null,
  "duration_ms": null,
  "timing_evidence_type": "historical_not_available",
  "timestamp_source": "none"
}
```

禁止：

- 使用文件修改时间冒充真实运行时间。
- 使用聊天消息时间冒充真实运行时间。
- 使用报告 `created_at` 冒充节点执行开始/完成时间。
- 使用估算耗时冒充真实 `duration_ms`。

允许：

- 在未来真实执行时由运行器、审计日志或人工记录写入真实 `started_at`、`completed_at`、`duration_ms`。
- 将历史节点的执行状态、治理状态和产物存在性作为非时间证据记录。

## 4. Unified Log Field Definitions

未来 `workflow_execution_log.json` 中，每个节点建议使用以下字段。`execution_status` 和 `governance_status` 必须分开，不得互相替代。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `step` | integer | Step 编号，1-15。 |
| `node_id` | string | 稳定节点 ID，例如 `step_03_brief_parser_agent`。 |
| `node_name` | string | 节点显示名称。 |
| `node_type` | string | `input_artifact`、`specification`、`agent`、`skill`、`approval_node`、`evaluation_agent`、`report_generator` 等。 |
| `execution_status` | string | 节点执行/交付状态，例如 `completed`、`completed_revised`、`historical_completed`。只描述节点是否完成交付，不描述是否可发布。 |
| `execution_status_source` | string | execution_status 的来源文件和字段，例如 `PROJECT_MEMORY_FOR_OPENCLAW.md Progress` 或 `outputs/v2_final_report.json artifact_index.v2_artifacts[]`。 |
| `governance_status` | string | 治理/审核状态，例如 `needs_review`、`needs_revision`、`blocked`、`approved_for_evaluation_only`。 |
| `governance_status_source` | string | governance_status 的来源文件和字段，例如产物 `meta.status`、`release_gates` 或 V2 Final Report 汇总。 |
| `input_files` | array | 节点读取或依赖的文件，每项包含 `path` 和 `exists`。 |
| `output_files` | array | 节点生成或维护的文件，每项包含 `path` 和 `exists`。 |
| `missing_input_files` | array | 当前工作区中缺失的输入文件。 |
| `missing_output_files` | array | 当前工作区中缺失的输出文件。 |
| `started_at` | null/string | 历史节点为 `null`；未来真实执行可写 ISO timestamp。 |
| `completed_at` | null/string | 历史节点为 `null`；未来真实执行可写 ISO timestamp。 |
| `duration_ms` | null/integer | 历史节点为 `null`；未来真实执行可写毫秒数。 |
| `timing_evidence_type` | string | 历史节点统一为 `historical_not_available`。 |
| `timestamp_source` | string | 历史节点统一为 `none`。 |
| `release_gate_effect` | object | 节点是否影响 release gates，以及是否保留 blocked 状态。 |
| `notes` | string | 额外边界说明。 |

建议枚举：

- `execution_status`: `completed`、`completed_revised`、`historical_completed`、`not_run`、`blocked_execution`。
- `governance_status`: `needs_review`、`needs_revision`、`blocked`、`approved`、`approved_for_evaluation_only`、`not_applicable`。
- `timing_evidence_type`: `historical_not_available`、`runner_log`、`audit_log`、`manual_record`。
- `timestamp_source`: `none`、`workflow_runner`、`audit_log`、`human_operator_record`。

## 5. Steps 1-15 Node Inventory

存在性说明：`exists` 表示当前工作区已发现该文件；`missing` 表示当前工作区未发现该文件。当前核对结果中，下面列出的必需输入/输出文件均存在。未来 final marketing copy、final image prompt、image、frontend、public release asset 属于被明确阻断的未来产物，不视为本日志规范的缺失输出。

### Step 1 — Standard Product Brief Input

- node_id: `step_01_standard_product_brief_input`
- node_name: Standard Product Brief Input
- node_type: `input_artifact`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；README 当前进度`
- governance_status: `needs_review`
- governance_status_source: `workflow/agent_workflow.md 输入与前置校验；schemas/product_brief.schema.json 约束；后续节点继承 needs_review`
- input_files:
  - `docs/product_brief_input_template.md` — exists
- output_files:
  - `data/sample_brief.json` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies (`started_at: null`, `completed_at: null`, `duration_ms: null`, `timing_evidence_type: historical_not_available`, `timestamp_source: none`)
- release_gate_effect: no final generation release; blocked gates unchanged.

### Step 2 — Workflow / Schema / I/O Contract Specification

- node_id: `step_02_workflow_schema_io_contract_specification`
- node_name: Workflow / Schema / I/O Contract Specification
- node_type: `specification`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；workflow/agent_io_contracts.md`
- governance_status: `not_applicable`
- governance_status_source: `workflow/agent_io_contracts.md 通用契约 and status rules`
- input_files:
  - `data/sample_brief.json` — exists
- output_files:
  - `schemas/product_brief.schema.json` — exists
  - `workflow/agent_workflow.md` — exists
  - `workflow/agent_io_contracts.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: defines status and workflow rules only; blocked gates unchanged.

### Step 3 — Brief Parser Agent

- node_id: `step_03_brief_parser_agent`
- node_name: Brief Parser Agent
- node_type: `agent`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Brief Parser Agent]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/standardized_brief_summary.json status=needs_review`
- input_files:
  - `data/sample_brief.json` — exists
  - `schemas/product_brief.schema.json` — exists
  - `prompts/brief_parser.md` — exists
- output_files:
  - `outputs/standardized_brief_summary.json` — exists
  - `outputs/brief_parser_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: no release permission; downstream review state preserved.

### Step 4 — Audience Insight Skill

- node_id: `step_04_audience_insight_skill`
- node_name: Audience Insight Skill
- node_type: `skill`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Audience Insight Skill]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/audience_insight.json status=needs_review`
- input_files:
  - `data/sample_brief.json` — exists
  - `outputs/standardized_brief_summary.json` — exists
  - `prompts/audience_insight.md` — exists
- output_files:
  - `outputs/audience_insight.json` — exists
  - `outputs/audience_insight_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: no release permission; downstream review state preserved.

### Step 5 — Selling Point Analyst Agent

- node_id: `step_05_selling_point_analyst_agent`
- node_name: Selling Point Analyst Agent
- node_type: `agent`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Selling Point Analyst Agent]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/selling_point_matrix.json status=needs_review`
- input_files:
  - `data/sample_brief.json` — exists
  - `outputs/standardized_brief_summary.json` — exists
  - `outputs/audience_insight.json` — exists
  - `prompts/selling_point_analyst.md` — exists
- output_files:
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/selling_point_matrix.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: unsupported claims remain review-gated; blocked gates unchanged.

### Step 6 — Platform Strategy Skill

- node_id: `step_06_platform_strategy_skill`
- node_name: Platform Strategy Skill
- node_type: `skill`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Platform Strategy Skill]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/platform_strategy_plan.json status=needs_review`
- input_files:
  - `data/sample_brief.json` — exists
  - `outputs/standardized_brief_summary.json` — exists
  - `outputs/audience_insight.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `prompts/platform_strategy.md` — exists
- output_files:
  - `outputs/platform_strategy_plan.json` — exists
  - `outputs/platform_strategy_plan.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: KPI language remains observational; blocked gates unchanged.

### Step 7 — Creative Copy Agent

- node_id: `step_07_creative_copy_agent`
- node_name: Creative Copy Agent
- node_type: `agent`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Creative Copy Agent]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/creative_copy_pack_outline.json status=needs_review`
- input_files:
  - `outputs/audience_insight.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/platform_strategy_plan.json` — exists
  - `data/sample_brief.json` — exists
  - `prompts/creative_copy_agent.md` — exists
- output_files:
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/creative_copy_pack_outline.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: produced structure only; final marketing copy remains `blocked`.

### Step 8 — Image Prompt Skill

- node_id: `step_08_image_prompt_skill`
- node_name: Image Prompt Skill
- node_type: `skill`
- execution_status: `historical_completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Image Prompt Skill]`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/image_prompt_pack_outline.json status=needs_review`
- input_files:
  - `data/sample_brief.json` — exists
  - `outputs/platform_strategy_plan.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `prompts/image_prompt_skill.md` — exists
- output_files:
  - `outputs/image_prompt_pack_outline.json` — exists
  - `outputs/image_prompt_pack_outline.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: produced visual structure only; final image prompt and image generation remain `blocked`.

### Step 9 — Brand Compliance Agent

- node_id: `step_09_brand_compliance_agent`
- node_name: Brand Compliance Agent
- node_type: `agent`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 9 Completion Notes`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json compliance_summary.status=needs_review and blocked final generation fields; outputs/brand_compliance_report.json`
- input_files:
  - `data/sample_brief.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/image_prompt_pack_outline.json` — exists
  - `prompts/brand_compliance_agent.md` — exists
- output_files:
  - `outputs/brand_compliance_report.json` — exists
  - `outputs/brand_compliance_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: final marketing copy, final image prompt, image generation and public release remain `blocked`.

### Step 10 — Growth Metrics Agent

- node_id: `step_10_growth_metrics_agent`
- node_name: Growth Metrics Agent
- node_type: `agent`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 10 Completion Notes`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/growth_metrics_plan.json status=needs_review`
- input_files:
  - `outputs/platform_strategy_plan.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/image_prompt_pack_outline.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `prompts/growth_metrics_agent.md` — exists
- output_files:
  - `outputs/growth_metrics_plan.json` — exists
  - `outputs/growth_metrics_plan.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: growth metrics remain observational; no business outcome promise; blocked gates unchanged.

### Step 11 — Creative Package Reporter

- node_id: `step_11_creative_package_reporter`
- node_name: Creative Package Reporter
- node_type: `report_generator`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 11 Completion Notes`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/final_creative_package_report.json status=needs_review`
- input_files:
  - `outputs/standardized_brief_summary.json` — exists
  - `outputs/audience_insight.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/platform_strategy_plan.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/image_prompt_pack_outline.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `outputs/growth_metrics_plan.json` — exists
  - `prompts/creative_package_reporter.md` — exists
- output_files:
  - `outputs/final_creative_package_report.json` — exists
  - `outputs/final_creative_package_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: summarizes V1 only; final generation and public release remain `blocked`.

### Step 12 — Planner Agent

- node_id: `step_12_planner_agent`
- node_name: Planner Agent
- node_type: `agent`
- execution_status: `completed_revised`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 12 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Planner Agent] status=completed_revised`
- governance_status: `not_applicable`
- governance_status_source: Planner 只负责工作流规划和路由，不独立作出审批或发布决定；现有 blocked release gates 由 Brand Compliance、Human Approval 和 Growth Evaluation 继承控制。
- input_files:
  - `PROJECT_MEMORY_FOR_OPENCLAW.md` — exists
  - `workflow/agent_workflow.md` — exists
  - `workflow/agent_io_contracts.md` — exists
  - `outputs/standardized_brief_summary.json` — exists
  - `outputs/audience_insight.json` — exists
  - `outputs/selling_point_matrix.json` — exists
  - `outputs/platform_strategy_plan.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/image_prompt_pack_outline.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `outputs/growth_metrics_plan.json` — exists
  - `outputs/final_creative_package_report.json` — exists
  - `prompts/planner_agent.md` — exists
- output_files:
  - `outputs/planner_execution_plan.json` — exists
  - `outputs/planner_execution_plan.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: preserves blocked gates and states that planning does not authorize final generation.

### Step 13 — Human Approval Node

- node_id: `step_13_human_approval_node`
- node_name: Human Approval Node
- node_type: `approval_node`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 13 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Human Approval Node]`
- governance_status: `needs_revision`
- governance_status_source: `outputs/human_approval_record.json meta.status=needs_revision; approval_summary.overall_decision=needs_revision; release_gates`
- input_files:
  - `outputs/planner_execution_plan.json` — exists
  - `outputs/creative_copy_pack_outline.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `data/sample_brief.json` — exists
  - `prompts/human_approval_node.md` — exists
- output_files:
  - `outputs/human_approval_record.json` — exists
  - `outputs/human_approval_record.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies; do not treat `reviewed_at: null` as missing historical execution time.
- release_gate_effect: structured planning and growth evaluation are allowed for evaluation; final generation and public release remain `blocked`.

### Step 14 — Growth Evaluation Agent

- node_id: `step_14_growth_evaluation_agent`
- node_name: Growth Evaluation Agent
- node_type: `evaluation_agent`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 14 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Growth Evaluation Agent]`
- governance_status: `needs_review`
- governance_status_source: `outputs/growth_evaluation_report.json meta.status=needs_review; human_approval_inheritance; release_gates`
- input_files:
  - `outputs/planner_execution_plan.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `outputs/human_approval_record.json` — exists
  - `outputs/growth_metrics_plan.json` — exists
  - `outputs/final_creative_package_report.json` — exists
  - `docs/evaluation_metrics_test_plan.md` — exists
  - `data/evaluation_metrics_sample.csv` — exists
  - `data/audit_log_sample.json` — exists
  - `prompts/growth_evaluation_agent.md` — exists
- output_files:
  - `outputs/growth_evaluation_report.json` — exists
  - `outputs/growth_evaluation_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies.
- release_gate_effect: confirms evaluation status only; final marketing copy, final image prompt, image generation and public release remain `blocked`.

### Step 15 — V2 Final Report Generator

- node_id: `step_15_v2_final_report_generator`
- node_name: V2 Final Report Generator
- node_type: `report_generator`
- execution_status: `completed`
- execution_status_source: `PROJECT_MEMORY_FOR_OPENCLAW.md Step 15 Completion Notes; outputs/v2_final_report.json meta.artifact_name=v2_final_report`
- governance_status: `needs_review`
- governance_status_source: `outputs/v2_final_report.json meta.status=needs_review; final_conclusion.overall_status=needs_review; release_gates`
- input_files:
  - `PROJECT_MEMORY_FOR_OPENCLAW.md` — exists
  - `README.md` — exists
  - `outputs/final_creative_package_report.json` — exists
  - `outputs/planner_execution_plan.json` — exists
  - `outputs/human_approval_record.json` — exists
  - `outputs/growth_evaluation_report.json` — exists
  - `outputs/brand_compliance_report.json` — exists
  - `prompts/v2_final_report_generator.md` — exists
- output_files:
  - `outputs/v2_final_report.json` — exists
  - `outputs/v2_final_report.md` — exists
- missing_input_files: []
- missing_output_files: []
- timing fields: historical rule applies; do not use `meta.created_at` as node execution timestamp.
- release_gate_effect: final report summarizes but does not authorize final marketing copy, final image prompt, image generation, frontend page or public release.

## 6. Missing File Summary

Required inputs and outputs listed in this spec were checked against the current workspace.

- missing_input_files: []
- missing_output_files: []

Blocked future assets are intentionally not generated and should not be treated as missing outputs for Steps 1-15:

- final marketing copy
- final image prompt
- image
- frontend page
- public release asset

## 7. Current Release Gate Baseline

The future execution log must preserve this baseline from `outputs/human_approval_record.json`, `outputs/growth_evaluation_report.json`, and `outputs/v2_final_report.json`:

| Gate | Status |
| --- | --- |
| structured_planning_package | `approved` |
| growth_evaluation | `approved_for_evaluation_only` in V2 final report; evaluation allowed does not equal generation approval |
| final_marketing_copy | `blocked` |
| final_image_prompt | `blocked` |
| image_generation | `blocked` |
| frontend_page | `blocked` |
| public_release | `blocked` |

## 8. Implementation Notes for Future Substeps

When a future substep generates `workflow_execution_log.json`, it should:

1. Use the 15-node inventory above as the authoritative node list.
2. Separate `execution_status` from `governance_status`.
3. Use historical null timing fields for Steps 1-15 unless real execution logs are provided.
4. Record file existence as evidence, but never convert file mtime into execution time.
5. Preserve blocked release gates exactly.
6. Mark any future real execution timestamps with explicit `timestamp_source` and `timing_evidence_type`.
