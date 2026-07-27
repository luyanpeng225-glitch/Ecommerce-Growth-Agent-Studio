# WorkTrace Spec

项目：E-commerce Growth Agent Studio / 电商增长 Agent 工作台

本文只定义 WorkTrace 数据规范，不生成实际 Trace、Schema、构建脚本、`worktrace.json` 或报告。WorkTrace 是可观测性扩展，不是 Step 16，也不是新的 Agent。它不得修改 Steps 1-15 历史产物，不得解除任何 release gate，不得生成最终营销文案、最终图片 Prompt、图片、前端页面或发布内容。

## 1. 用途和边界

WorkTrace 用于把现有 ToB 电商多 Agent 工作流的执行过程表达成可审计、可展示、可追踪的数据结构，未来可用于页面展示：

- 节点顺序与上下游依赖。
- 输入文件、输出文件和产物存在性。
- 节点状态、治理状态和 release gate 影响。
- `risk_id`、`claim_id`、Human Approval、Failure Scenario 的关联。
- 错误、修订队列、重试路径和失败原因。
- 机器验证结果与人工判断结果的边界。

严格边界：

- 不得虚构 `request_id`、`trace_id`、时间戳或节点耗时。
- Steps 1-15 没有真实运行时间，必须使用 `historical_not_available`。
- 如果历史执行没有真实 runtime trace id，则 `trace_id = null`。
- 可以定义 `artifact_trace_key` 关联历史产物，但它不是运行时 `trace_id`。
- `outputs/failure_scenario_test_report.json` 中的 58 ms 只能标记为该测试脚本的 measured runtime，不能写成 Planner 或完整工作流耗时。
- 重试次数 1 只属于 Failure Scenario Test，不能写成整个工作流重试次数。
- Schema pass 不代表治理通过、人工审批通过或允许发布。
- 五个关键 release gates 必须继续 `blocked`：`final_marketing_copy`、`final_image_prompt`、`image_generation`、`frontend_page`、`public_release`。

## 2. 状态枚举

WorkTrace 所有 summary、node、gate、validation、failure 字段必须使用受控枚举。

### 2.1 Node / Workflow Status

- `pending`：已定义但尚未开始。
- `running`：正在运行；仅允许真实 runtime Trace 使用。
- `pass`：机器验证或节点输出通过。
- `needs_review`：可继续流转，但需要治理或人工审核。
- `needs_revision`：需要修改后再继续。
- `blocked`：关键前置条件不满足，不能进入下游关键阶段。
- `failed`：执行失败或验证失败。
- `skipped`：因上游 blocked、条件不满足或范围裁剪而跳过。
- `historical_not_available`：历史节点缺少真实运行状态或运行时观测数据。

### 2.2 Time Status

- `measured`：由脚本或真实运行系统实测；必须给出来源文件和字段。
- `historical_not_available`：历史执行缺少真实时间；Steps 1-15 节点时间必须使用此值。
- `not_applicable`：该对象不是运行节点，不适用时间统计。

### 2.3 Trace Summary Controlled Enums

`trace_type` 必须使用以下三种模式之一：

- `historical_artifact_trace`：历史产物回溯 Trace。
- `deterministic_failure_scenario_trace`：确定性 Failure Scenario Test Trace。
- `live_execution_trace`：真实运行时 Trace。

`execution_context` 必须使用以下三种值之一：

- `retrospective_artifact_reconstruction`：历史产物回溯重建。
- `deterministic_test_execution`：确定性测试执行。
- `live_runtime_execution`：真实运行时执行。

`trace_id_status` 必须使用以下四种值之一：

- `measured`：来自真实可观测系统或确定性测量。
- `generated_at_runtime`：真实运行时生成。
- `historical_not_available`：历史执行不可用。
- `not_available`：该测试或对象没有真实 trace id。

Trace Summary 条件约束：

- 当 `trace_type = historical_artifact_trace` 时：`execution_context = retrospective_artifact_reconstruction`，`trace_id = null`，`trace_id_status = historical_not_available`，`time_status = historical_not_available`，`started_at = null`，`completed_at = null`，`duration_ms = null`，`retry_count = null`，`retry_count_status = historical_not_available`。
- 当 `trace_type = deterministic_failure_scenario_trace` 时：`execution_context = deterministic_test_execution`；允许使用 measured 时间；如果原测试没有真实 `trace_id`，则 `trace_id = null` 且 `trace_id_status = not_available`；不得把 `artifact_trace_key` 当成 `trace_id`。
- 当 `trace_type = live_execution_trace` 时：`execution_context = live_runtime_execution`，`trace_id` 必须为非空字符串，`trace_id_status` 必须为 `generated_at_runtime` 或 `measured`，且 `time_status = measured`。

## 3. Trace Summary 字段

未来 `WorkTrace.summary` 建议包含：

```json
{
  "worktrace_version": "0.1.0",
  "project_name": "E-commerce Growth Agent Studio",
  "product_name": "运动相机",
  "workflow_version": "V2",
  "trace_id": null,
  "artifact_trace_key": "worktrace_demo_action_camera_v2",
  "trace_type": "historical_artifact_trace",
  "execution_context": "retrospective_artifact_reconstruction",
  "trace_status": "needs_review",
  "time_status": "historical_not_available",
  "started_at": null,
  "completed_at": null,
  "duration_ms": null,
  "retry_count": null,
  "retry_count_status": "historical_not_available",
  "node_count": 15,
  "measured_node_count": 0,
  "historical_not_available_node_count": 15,
  "schema_validation_status": "pass",
  "governance_status": "needs_review",
  "human_approval_status": "needs_revision",
  "failure_scenario_test_status": "pass",
  "release_gates": {},
  "source_artifacts": []
}
```

字段规则：

- `trace_id`：运行时 trace id。历史执行没有真实 trace id 时必须为 `null`。
- `artifact_trace_key`：为历史产物关联定义的稳定键，例如 `step_12_planner_execution_plan`；它不是 runtime trace id。
- `trace_type`：说明 Trace 模式，只能为 `historical_artifact_trace`、`deterministic_failure_scenario_trace` 或 `live_execution_trace`。
- `execution_context`：说明执行上下文，只能为 `retrospective_artifact_reconstruction`、`deterministic_test_execution` 或 `live_runtime_execution`。
- `time_status`：summary 层不能把构建脚本时间写成完整工作流时间。
- `retry_count`：允许 `integer >= 0` 或 `null`；`retry_count = 0` 只能表示有证据证明该次执行没有发生重试，不知道是否发生重试时不能使用 `0`。
- `retry_count_status`：必须为 `measured`、`deterministic_verified`、`historical_not_available` 或 `not_applicable`；当 `retry_count_status = historical_not_available` 或 `not_applicable` 时，`retry_count` 必须为 `null`。
- Steps 1-15 的历史重试信息不可用：`retry_count = null`，`retry_count_status = historical_not_available`。
- `source_artifacts`：列出 WorkTrace 读取的来源文件，例如 `outputs/workflow_execution_log.json`、`outputs/failure_scenario_test_report.json`、`outputs/claim_trace_matrix.json`、`outputs/workflow_metrics_report.json`、`outputs/human_approval_record.json`、`outputs/two_stage_compliance_validation_report.json`。

## 4. Node Trace 字段

未来 `WorkTrace.nodes[]` 建议包含：

```json
{
  "node_index": 1,
  "step": 1,
  "node_id": "step_01_standard_product_brief_input",
  "node_name": "Standard Product Brief Input",
  "node_type": "input_artifact",
  "agent_or_skill": "Brief Parser Agent | Planner Agent | Brand Compliance Agent | Image Prompt Skill | Human Approval Node | ...",
  "trace_id": null,
  "artifact_trace_key": "step_01_standard_product_brief_input",
  "status": "historical_not_available",
  "governance_status": "needs_review",
  "time_status": "historical_not_available",
  "started_at": null,
  "completed_at": null,
  "duration_ms": null,
  "input_refs": [],
  "output_refs": [],
  "risk_refs": [],
  "claim_refs": [],
  "human_approval_refs": [],
  "failure_refs": [],
  "release_gate_effect": {},
  "retry_count": null,
  "retry_count_status": "historical_not_available",
  "retry_summary": {},
  "validation_refs": [],
  "notes": []
}
```

字段规则：

- Steps 1-15 的 `started_at`、`completed_at`、`duration_ms` 必须为 `null`，`time_status = historical_not_available`。
- `status` 可以来自历史产物状态，但不得把 `historical_completed` 写成有真实 runtime telemetry。
- `agent_or_skill` 用于展示节点职责；不代表本次新增 Agent。
- `validation_refs` 只能引用机器验证结论，不能替代人工审批或治理判断。
- Node Trace 的 `retry_count` 允许 `integer >= 0` 或 `null`；`retry_count = 0` 只能表示有证据证明该节点执行没有发生重试，不知道是否发生重试时不能使用 `0`。
- Node Trace 的 `retry_count_status` 必须为 `measured`、`deterministic_verified`、`historical_not_available` 或 `not_applicable`；Steps 1-15 的历史重试信息不可用，必须使用 `retry_count = null` 和 `retry_count_status = historical_not_available`。

## 5. 输入、输出文件引用格式

文件引用统一使用对象数组，不只写字符串：

```json
{
  "path": "outputs/planner_execution_plan.json",
  "artifact_type": "json | markdown | schema | csv | source_brief | prompt | spec",
  "required": true,
  "exists": true,
  "json_pointer": "/meta/status",
  "role": "input | output | evidence | validation_source | approval_source",
  "source_status": "pass | needs_review | needs_revision | blocked | historical_not_available",
  "notes": "Optional boundary note"
}
```

规则：

- `path` 使用项目根目录相对路径。
- JSON 字段引用必须使用 JSON Pointer，例如 `/workflow_summary/node_count`。
- Markdown 引用可以使用 `json_pointer = null`，并用 `section_hint` 或 `notes` 描述来源章节。
- 文件存在不证明内容事实正确，只证明可被引用。

## 6. risk_id 和 claim_id 关联方式

`risk_refs[]` 用于连接合规风险、双阶段风险继承和治理发现：

```json
{
  "risk_id": "risk_traceability_gap",
  "source_artifact": "outputs/two_stage_compliance_validation_report.json",
  "source_json_pointer": "/governance_findings/risk_traceability_gap_present",
  "risk_status": "needs_review",
  "stage": "post_generation_check",
  "relationship": "detected | inherited | unresolved | resolved | newly_detected",
  "human_review_required": true
}
```

规则：

- `risk_id` 优先来自 Brand Compliance / Two-stage Compliance 产物。
- pre-check 与 post-generation-check 的风险继承必须保留稳定 `risk_id`。
- `risk_traceability_gap` 是治理发现，不是结构验证失败。
- `unresolved = 10` 和 `newly_detected = 1` 必须继续驱动 `governance_status = needs_review`。

`claim_refs[]` 用于连接 Claim Trace Matrix：

```json
{
  "claim_id": "claim_product_capability_001",
  "source_artifact": "outputs/claim_trace_matrix.json",
  "source_json_pointer": "/claims/0",
  "evidence_status": "requires_human_verification | not_available | supported_by_provided_source | derived_from_mock",
  "risk_level": "critical | major | medium | minor",
  "release_gate_effect": {}
}
```

规则：

- `claim_id` 只能说明声明被追踪，不代表声明已被现实证明。
- `source_found` 只代表来源字段存在，不代表事实成立。
- mock、estimated、not_available 不得包装为真实业务结果。

## 7. Human Approval 状态关联

`human_approval_refs[]` 用于连接 `outputs/human_approval_record.json`：

```json
{
  "source_artifact": "outputs/human_approval_record.json",
  "approval_item_id": "approval_item_003",
  "source_json_pointer": "/approval_items/2",
  "overall_decision": "needs_revision",
  "item_decision": "blocked",
  "reviewer_name": null,
  "human_signature": "pending",
  "reviewed_at": null,
  "required_action": "补充测试条件、规格证明和限制说明"
}
```

规则：

- Human Approval 状态必须与 `approval_summary.overall_decision` 和 `approval_items[].decision` 分开展示。
- `reviewer_name = null`、`reviewed_at = null`、`human_signature = pending` 必须保留，不得伪造真实审批人、签字或时间。
- `final_generation_allowed = false` 和 `public_release_allowed = false` 必须继续影响 release gates。

## 8. Failure Scenario 的错误、修订和重试表达

`failure_refs[]` 用于连接 `outputs/failure_scenario_test_report.json`：

```json
{
  "scenario_id": "failure_brief_missing_campaign_goal",
  "source_artifact": "outputs/failure_scenario_test_report.json",
  "failure_status": "pass",
  "initial_error": {
    "workflow_status": "blocked",
    "missing_required_fields": ["campaign_goal"],
    "schema_errors_pointer": "/initial_run/schema_errors"
  },
  "revision": {
    "queue_created": true,
    "repair_action": "restore_from_source",
    "source_modified": false
  },
  "retry": {
    "retry_count": 1,
    "retry_count_status": "deterministic_verified",
    "scope": "failure_scenario_test_only",
    "rerun_status": "pass",
    "next_gate": "brand_compliance_pre_check"
  },
  "runtime": {
    "time_status": "measured",
    "duration_ms": 58,
    "scope": "failure_scenario_test_only"
  }
}
```

规则：

- 58 ms 只能用于 Failure Scenario Test 脚本 measured runtime。
- `retry_count = 1` 且 `retry_count_status = deterministic_verified` 可以用于 Failure Scenario Test 的一次确定性验证重试。
- Failure Scenario Test 的重试次数不能代表完整工作流重试率。
- 初始 blocked、revision queue、rerun pass 必须分开表达，不能写成完整工作流自动恢复成功。
- Failure Scenario pass 不解除合规、人工审批或 release gates。

## 9. Release gate 状态

WorkTrace 必须在 summary 和节点层展示 release gate 状态：

```json
{
  "structured_planning_package": "approved",
  "growth_evaluation": "approved_for_evaluation_only",
  "final_marketing_copy": "blocked",
  "final_image_prompt": "blocked",
  "image_generation": "blocked",
  "frontend_page": "blocked",
  "public_release": "blocked"
}
```

关键规则：

- 五个关键 release gates 必须继续 `blocked`：最终营销文案、最终图片 Prompt、图片生成、前端页面、公开发布。
- `approved_for_evaluation_only` 不等于允许最终生成或公开发布。
- Schema pass、Failure Scenario pass、Two-stage validation pass 均不能解除 release gates。

## 10. 机器验证与人工判断的区别

WorkTrace 必须显式区分：

- 机器验证：JSON parse、Schema validation、JSON Pointer check、deterministic script assertions、file existence check。
- 人工判断：品牌、法务、运营、设计负责人对证明材料、授权、合规措辞、发布风险的判断。

建议字段：

```json
{
  "validation_type": "machine | human | mixed",
  "machine_validation": {
    "status": "pass",
    "source_artifact": "outputs/artifact_validation_report.json",
    "scope": "structure_and_constraints_only"
  },
  "human_judgment": {
    "status": "needs_revision",
    "source_artifact": "outputs/human_approval_record.json",
    "human_signature": "pending"
  },
  "boundary_note": "Schema pass does not prove governance approval or release permission."
}
```

规则：

- 机器验证 `pass` 不得覆盖 `governance_status = needs_review`。
- 人工审批 pending 不得写成 approved。
- WorkTrace 页面需要同时展示机器证据和人工待办。

## 11. WorkTrace 页面未来需要展示的字段

未来页面可按以下区域展示：

### 11.1 Summary Cards

- Workflow status：`needs_review`。
- Trace id：`null`（历史无真实 runtime trace id）。
- Artifact trace key：展示历史产物关联键。
- Timing coverage：15 historical_not_available / 0 measured historical nodes。
- Failure Scenario runtime：58 ms，scope = failure_scenario_test_only。
- Schema / JSON validation：只展示机器验证范围。
- Human Approval：`needs_revision`，signature pending。
- Release gates：五个关键 gates blocked。

### 11.2 Node Timeline

- 节点顺序。
- 节点名称和 Agent / Skill 类型。
- 输入 / 输出文件链接。
- status、governance_status、time_status。
- risk_id / claim_id 数量与详情入口。
- Human Approval 关联项。
- Failure Scenario 关联项。
- 重试路径和修订队列入口。

### 11.3 Evidence Drawer

- Source artifact path。
- JSON Pointer。
- Displayed value。
- Evidence type：machine / human / artifact-derived / not_available。
- Boundary notes。

### 11.4 Gate Panel

- final_marketing_copy：blocked。
- final_image_prompt：blocked。
- image_generation：blocked。
- frontend_page：blocked。
- public_release：blocked。
- blocked reason：证明材料、素材授权、真实人工审批和客户验证未完成。

## 12. 当前来源文件映射

本规范参考但不修改以下文件：

- `outputs/workflow_execution_log.json`：历史节点顺序、输入输出、Steps 1-15 timing policy。
- `outputs/failure_scenario_test_report.json`：Failure Scenario 的 measured 58 ms、修订队列、rerun 和 retry_count 范围。
- `outputs/claim_trace_matrix.json`：`claim_id`、source_found、evidence_status、release gate effect。
- `outputs/workflow_metrics_report.json`：runtime metrics、quality metrics、governance metrics 和 metric integrity。
- `outputs/human_approval_record.json`：Human Approval 状态、审批项、签字和放行边界。
- `outputs/two_stage_compliance_validation_report.json`：validation_status、governance_status、risk_counts、risk_traceability_gap 和 release gate checks。

## 13. 非目标

本小步不做以下事项：

- 不创建 Schema。
- 不创建构建脚本。
- 不生成 `worktrace.json` 或 Markdown 报告。
- 不修改 Steps 1-15 的历史产物。
- 不更新 README、FILE_INDEX、项目记忆或作品集页面。
- 不生成营销文案、图片 Prompt、图片或发布内容。
