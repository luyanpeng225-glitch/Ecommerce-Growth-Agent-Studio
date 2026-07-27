# Portfolio Evidence Pack

This deterministic evidence pack is generated from existing artifacts only. It is not Step 16, not a new Agent node, not production ready, and not customer validated. `source_found`, Schema pass, JSON Pointer checks, and file existence do not prove real-world truth.

## Meta

- product_name: 运动相机
- status: needs_review
- production_ready: false
- customer_validated: false

## Evidence Summary

- evidence_total: 150
- section_counts: {"project_overview":4,"business_problem":3,"workflow_evidence":13,"validation_evidence":17,"execution_trace_evidence":39,"claim_trace_evidence":10,"evaluation_evidence":12,"enterprise_governance":17,"limitations":19,"reproducibility":16}
- evidence_type_counts: {"measured":33,"deterministic_verified":43,"artifact_derived":39,"derived_from_mock":4,"estimated":1,"human_review_required":11,"not_available":19}
- source_file_checks: {"total":150,"passed":150,"failed":0}
- json_pointer_checks: {"total":144,"passed":144,"failed":0}

## Release Gates

- structured_planning_package: approved
- growth_evaluation: approved_for_evaluation_only
- final_marketing_copy: blocked
- final_image_prompt: blocked
- image_generation: blocked
- frontend_page: blocked
- public_release: blocked

## Project Overview

### ev_project_overview_001: 项目定位

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /project_overview/positioning
- portfolio_section: Project Overview
- displayed_value:

```json
"A ToB multi-agent ecommerce growth workflow demo that turns product briefs into governed, auditable, reviewable and evaluable structured creative planning packages."
```

- limitation: 项目定位来自 V2 报告，不代表生产系统上线。

### ev_project_overview_002: 中文项目名称

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /meta/project_name_cn
- portfolio_section: Project Overview
- displayed_value:

```json
"电商增长 Agent 工作台"
```

- limitation: 名称只说明作品集项目，不代表商业产品已发布。

### ev_project_overview_003: Demo 商品命名

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /project_overview/demo_product
- portfolio_section: Project Overview
- displayed_value:

```json
"运动相机"
```

- limitation: 商品名称只能使用“运动相机”，不能把参数词恢复为商品名称或事实承诺。

### ev_project_overview_004: 作品集能力焦点

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /project_overview/portfolio_focus
- portfolio_section: Project Overview
- displayed_value:

```json
[
  "Agent Workflow 编排",
  "可复用 Agent / Skill 职责体系",
  "结构化 I/O 契约",
  "合规约束传递",
  "human-in-the-loop 审核",
  "Growth Evaluation 测评闭环"
]
```

- limitation: 能力焦点是作品集展示范围，不代表真实客户部署。

## Business Problem

### ev_business_problem_001: 业务问题摘要

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /business_problem/summary
- portfolio_section: Business Problem
- displayed_value:

```json
"Enterprise ecommerce teams need a governed workflow for turning inconsistent product information into traceable creative planning artifacts while preventing unsupported claims, unauthorized assets and unverified business-result promises."
```

- limitation: 这是问题定义，不是客户访谈或客户验证完成。

### ev_business_problem_002: 业务问题清单

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /business_problem/problems
- portfolio_section: Business Problem
- displayed_value:

```json
[
  "商品资料格式不统一，缺失字段和风险声明容易被遗漏。",
  "用户洞察、卖点、平台策略、创意结构和视觉规划之间交接成本高。",
  "技术参数、广告表达和视觉素材缺少证据与授权检查。",
  "最终结果难以追踪来源，也难以定位失败发生在哪个节点。",
  "内容效果和 Agent 执行质量缺少统一评估口径。"
]
```

- limitation: 来自项目报告总结，不代表覆盖所有行业场景。

### ev_business_problem_003: 作品集定位建议

- evidence_type: artifact_derived
- source_artifact: docs/portfolio_requirements_mapping.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Business Problem
- displayed_value:

```json
"面向电商运营团队的多 Agent 增长工作台，强调活动规划、合规审核和复盘指标设计。"
```

- limitation: Markdown 来源只作为 artifact-derived 定位说明；涉及耗时只能标注为 estimated。

## Workflow Evidence

### ev_workflow_001: Steps 1-15 覆盖

- evidence_type: artifact_derived
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/covered_steps
- portfolio_section: Workflow Evidence
- displayed_value:

```json
[
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15
]
```

- limitation: 覆盖来自 retrospective artifact-derived log，不代表重新执行 Steps 1-15。

### ev_workflow_002: 节点数量

- evidence_type: artifact_derived
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/node_count
- portfolio_section: Workflow Evidence
- displayed_value:

```json
15
```

- limitation: 节点数量是历史 artifact 覆盖数量，不是真实运行 telemetry。

### ev_workflow_003: V2 工作流顺序

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /designed_v2_workflow/sequence
- portfolio_section: Workflow Evidence
- displayed_value:

```json
[
  "商品 Brief",
  "Brief Parser Agent",
  "Planner Agent",
  "Audience Insight / Selling Point Analyst / Platform Strategy",
  "Creative Agent",
  "Brand Compliance Agent",
  "Human Approval Node",
  "Image Prompt Skill",
  "Growth Evaluation Agent",
  "Final Report Generator"
]
```

- limitation: 这是目标治理工作流描述，不解除 release gates。

### ev_workflow_004: V2 治理节点

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /designed_v2_workflow/v2_nodes_added
- portfolio_section: Workflow Evidence
- displayed_value:

```json
[
  "Planner Agent",
  "Human Approval Node",
  "Growth Evaluation Agent",
  "Final Report Generator"
]
```

- limitation: 这些是既有治理/汇总节点，不是本证据包新增 Agent 节点。

### ev_workflow_005: V1 Artifact Index

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /artifact_index/v1_artifacts
- portfolio_section: Workflow Evidence
- displayed_value:

```json
[
  {
    "step": 3,
    "node": "Brief Parser Agent",
    "artifact": "outputs/standardized_brief_summary.json",
    "status": "needs_review",
    "role": "Standardizes the product brief and identifies risk fields for downstream agents."
  },
  {
    "step": 4,
    "node": "Audience Insight Skill",
    "artifact": "outputs/audience_insight.json",
    "status": "needs_review",
    "role": "Converts the brief into audience segments, needs, pains, purchase triggers and validation assumptions."
  },
  {
    "step": 5,
    "node": "Selling Point Analyst Agent",
    "artifact": "outputs/selling_point_matrix.json",
    "status": "needs_review",
    "role": "Maps product features to benefits, selling point priority, proof requirements and claim risks."
  },
  {
    "step": 6,
    "node": "Platform Strategy Skill",
    "artifact": "outputs/platform_strategy_plan.json",
    "status": "needs_review",
    "role": "Defines channel roles, funnel mapping, content formats, cadence, metrics and review gates."
  },
  {
    "step": 7,
    "node": "Creative Copy Agent",
    "artifact": "outputs/creative_copy_pack_outline.json",
    "status": "needs_review",
    "role": "Defines governed copy module structures without writing final public-facing copy."
  },
  {
    "step": 8,
    "node": "Image Prompt Skill",
    "artifact": "outputs/image_prompt_pack_outline.json",
    "status": "needs_review",
    "role": "Defines visual asset structures and multimodal governance without generating model-ready image prompts."
  },
  {
    "step": 9,
    "node": "Brand Compliance Agent",
    "artifact": "outputs/brand_compliance_report.json",
    "status": "needs_review",
    "role": "Reviews structured copy and visual planning risks and blocks final generation gates."
  },
  {
    "step": 10,
    "node": "Growth Metrics Agent",
    "artifact": "outputs/growth_metrics_plan.json",
    "status": "needs_review",
    "role": "Defines observable metrics, A/B directions, tracking fields and retrospective schema."
  },
  {
    "step": 11,
    "node": "Creative Package Reporter",
    "artifact": "outputs/final_creative_package_report.json",
    "status": "needs_review",
    "role": "Summarizes the governed V1 workflow without releasing final creative assets."
  }
]
```

- limitation: 只展示结构化规划产物，不展示最终营销素材。

### ev_workflow_006: V2 Artifact Index

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /artifact_index/v2_artifacts
- portfolio_section: Workflow Evidence
- displayed_value:

```json
[
  {
    "step": 12,
    "node": "Planner Agent",
    "artifact": "outputs/planner_execution_plan.json",
    "status": "completed_revised"
  },
  {
    "step": 13,
    "node": "Human Approval Node",
    "artifact": "outputs/human_approval_record.json",
    "status": "needs_revision"
  },
  {
    "step": 14,
    "node": "Growth Evaluation Agent",
    "artifact": "outputs/growth_evaluation_report.json",
    "status": "needs_review"
  },
  {
    "step": 15,
    "node": "V2 Final Report Generator",
    "artifact": "outputs/v2_final_report.json",
    "status": "needs_review"
  }
]
```

- limitation: V2 产物是治理与测评汇总，不授权最终生成或发布。

### ev_workflow_007: 工作流图

- evidence_type: artifact_derived
- source_artifact: docs/workflow_diagram.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Workflow Evidence
- displayed_value:

```json
"V2 图展示 Brief、Parser、Planner、分析节点、Creative、Brand Compliance、Human Approval、Image Prompt Skill、Growth Evaluation、Final Report Generator 的关系。"
```

- limitation: 工作流图用于作品集说明，不代表真实 per-node runtime telemetry。

### ev_workflow_two_stage_001: 双阶段合规目标工作流

- evidence_type: artifact_derived
- source_artifact: docs/two_stage_compliance_spec.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Workflow Evidence
- displayed_value:

```json
"正式目标工作流包含 Brand Compliance Agent 的 pre_check 和 post_generation_check 两次调用。"
```

- limitation: 这是后续正式工作流目标设计，不改写 Steps 1-15 的历史真实执行顺序。

### ev_workflow_two_stage_002: 单一合规 Agent 与单一 Image Prompt Skill

- evidence_type: artifact_derived
- source_artifact: docs/two_stage_compliance_spec.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Workflow Evidence
- displayed_value:

```json
"双阶段合规是同一个 Brand Compliance Agent 的两次调用，并保持单一 Image Prompt Skill。"
```

- limitation: 不是两个 Compliance Agent，也不拆分 Image Prompt Skill。

### ev_worktrace_workflow_001: 历史 WorkTrace 覆盖 15 个节点

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Workflow Evidence
- displayed_value:

```json
15
```

- limitation: 历史 WorkTrace 覆盖 Steps 1-15，但不改变历史工作流，也不是 Step 16。

### ev_worktrace_workflow_002: Failure Scenario WorkTrace 覆盖 3 个节点

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /nodes
- portfolio_section: Workflow Evidence
- displayed_value:

```json
3
```

- limitation: Failure Scenario WorkTrace 是确定性测试链路，不是新增 Agent。

### ev_worktrace_workflow_003: 两个 artifact_trace_key 均稳定

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace.json
- source_json_pointer: /trace_summary/artifact_trace_key
- portfolio_section: Workflow Evidence
- displayed_value:

```json
{
  "historical_artifact_trace_key": "historical_artifact_trace_534a02a2ce551ed2",
  "failure_scenario_artifact_trace_key": "failure_scenario_trace_80a52dcaa5997a67",
  "stable": true
}
```

- limitation: artifact_trace_key 根据来源产物确定性生成，只用于历史/测试产物关联。

### ev_worktrace_workflow_004: artifact_trace_key 不等于运行时 trace_id

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /limitations/0
- portfolio_section: Workflow Evidence
- displayed_value:

```json
"artifact_trace_key is not runtime trace_id; both trace_id values are null."
```

- limitation: artifact_trace_key 不能写成 request_id 或 trace_id。

## Validation Evidence

### ev_validation_001: JSON 解析总数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /parse_validation/total_json_files
- portfolio_section: Validation Evidence
- displayed_value:

```json
49
```

- limitation: JSON parse pass 只代表可解析为 JSON，不代表通过 Schema 或事实正确。

### ev_validation_002: JSON 解析通过数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /parse_validation/passed
- portfolio_section: Validation Evidence
- displayed_value:

```json
49
```

- limitation: 只验证 JSON 语法。

### ev_validation_003: JSON 解析失败数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /parse_validation/failed
- portfolio_section: Validation Evidence
- displayed_value:

```json
0
```

- limitation: 不代表内容事实已证明。

### ev_validation_004: Schema 映射数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /schema_validation/mapped_artifacts
- portfolio_section: Validation Evidence
- displayed_value:

```json
18
```

- limitation: 当前只覆盖映射的关键治理 artifact，不代表 100% Schema coverage。

### ev_validation_005: Schema 通过数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /schema_validation/passed
- portfolio_section: Validation Evidence
- displayed_value:

```json
18
```

- limitation: Schema pass 不证明真实业务效果。

### ev_validation_006: Schema 失败数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /schema_validation/failed
- portfolio_section: Validation Evidence
- displayed_value:

```json
0
```

- limitation: 仅表示映射 Schema 未失败。

### ev_validation_007: 验证脚本路径

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/script_path
- portfolio_section: Validation Evidence
- displayed_value:

```json
"scripts/validate_artifacts.mjs"
```

- limitation: 脚本验证结构和关键状态，不验证现实事实。

### ev_validation_008: 验证脚本退出码

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/script_exit_code
- portfolio_section: Validation Evidence
- displayed_value:

```json
0
```

- limitation: 退出码 0 不解除 blocked release gates。

### ev_runtime_validation_001: Runtime Schema 验证通过

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /results
- portfolio_section: Validation Evidence
- displayed_value:

```json
{
  "artifact_path": "outputs/runtime_execution.json",
  "schema_path": "schemas/artifacts/runtime_execution.schema.json",
  "validation": "schema",
  "status": "pass"
}
```

- limitation: Runtime Schema pass 只证明 outputs/runtime_execution.json 符合结构契约，不证明模型调用、真实人工审批或业务效果。

### ev_validation_two_stage_001: 双阶段 validation_status

- evidence_type: deterministic_verified
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /validation_status
- portfolio_section: Validation Evidence
- displayed_value:

```json
"pass"
```

- limitation: validation_status = pass 只代表双阶段验证脚本的结构与治理约束通过，不解除 needs_review。

### ev_validation_two_stage_002: 双阶段 identity checks

- evidence_type: deterministic_verified
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /identity_checks/all_passed
- portfolio_section: Validation Evidence
- displayed_value:

```json
true
```

- limitation: identity checks 通过不代表历史执行顺序被改写。

### ev_validation_two_stage_003: 双阶段 risk tracking checks

- evidence_type: deterministic_verified
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /risk_tracking_checks/all_passed
- portfolio_section: Validation Evidence
- displayed_value:

```json
true
```

- limitation: risk tracking checks 通过不代表所有风险被解决。

### ev_validation_two_stage_004: 双阶段 release gate checks

- evidence_type: deterministic_verified
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /release_gate_checks/all_passed
- portfolio_section: Validation Evidence
- displayed_value:

```json
true
```

- limitation: release gate checks 通过表示五个关键 release gates 继续 blocked。

### ev_worktrace_validation_001: JSON 解析通过数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /parse_validation
- portfolio_section: Validation Evidence
- displayed_value:

```json
{
  "passed": 49,
  "total": 49,
  "failed": 0
}
```

- limitation: JSON parse pass 只代表文件可解析，不代表治理通过或生产可用。

### ev_worktrace_validation_002: Schema 映射通过数

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /schema_validation
- portfolio_section: Validation Evidence
- displayed_value:

```json
{
  "passed": 18,
  "mapped_artifacts": 18,
  "failed": 0
}
```

- limitation: Schema pass 不代表 Governance pass、人工审批通过或 release permission。

### ev_worktrace_validation_003: 两个 WorkTrace 均通过同一 WorkTrace Schema

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /schema_coverage/covered_artifacts
- portfolio_section: Validation Evidence
- displayed_value:

```json
[
  "outputs/worktrace.json -> schemas/artifacts/worktrace.schema.json",
  "outputs/worktrace_failure_scenario.json -> schemas/artifacts/worktrace.schema.json"
]
```

- limitation: 同一 Schema 验证只证明结构与约束通过，不证明生产可用。

### ev_worktrace_validation_004: WorkTrace 文件引用检查全部通过

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Validation Evidence
- displayed_value:

```json
{
  "historical": "118/118",
  "failure_scenario": "18/18"
}
```

- limitation: 文件引用存在不证明内容事实正确、治理通过或发布许可。

## Execution Trace Evidence

### ev_execution_trace_001: Log 类型

- evidence_type: artifact_derived
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /meta/log_type
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"retrospective_artifact_derived_log"
```

- limitation: 这是 retrospective artifact-derived log，不是生产 telemetry。

### ev_execution_trace_002: Telemetry 类型

- evidence_type: artifact_derived
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /meta/telemetry_type
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"not_runtime_telemetry"
```

- limitation: 不得用于展示真实每节点运行耗时。

### ev_execution_trace_003: 输入文件检查

- evidence_type: deterministic_verified
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/input_file_checks
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "total": 81,
  "passed": 81,
  "failed": 0
}
```

- limitation: 文件存在检查不证明内容事实正确。

### ev_execution_trace_004: 输出文件检查

- evidence_type: deterministic_verified
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/output_file_checks
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "total": 30,
  "passed": 30,
  "failed": 0
}
```

- limitation: 输出存在不代表生产交付。

### ev_execution_trace_005: historical_not_available 节点数

- evidence_type: not_available
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/historical_not_available_node_count
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
15
```

- limitation: 节点时间均不可用，不能补造时间。

### ev_execution_trace_006: measured node runtime 数量

- evidence_type: not_available
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/measured_node_time_count
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
0
```

- limitation: 当前没有真实 per-node runtime。

### ev_execution_trace_007: Timing policy

- evidence_type: not_available
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/timing_policy
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"Steps 1-15 are historical nodes; node-level timing is unavailable and must remain null with historical_not_available evidence."
```

- limitation: 必须保留 historical_not_available 边界，不能写成真实运行时间。

### ev_worktrace_execution_001: 历史 Trace 的 trace_id = null

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /trace_summary/trace_id
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
null
```

- limitation: 历史执行没有真实运行时 trace_id，不得补造。

### ev_worktrace_execution_002: 15 个历史节点全部 historical_not_available

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
15
```

- limitation: 历史节点时间不可用，不能补造 started_at、completed_at 或 duration_ms。

### ev_worktrace_execution_003: measured 历史节点数量为 0

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
0
```

- limitation: 历史 WorkTrace 没有 measured 节点 runtime。

### ev_worktrace_execution_004: Failure Scenario duration_ms = 58

- evidence_type: measured
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /trace_summary/duration_ms
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
58
```

- limitation: 58 ms 只属于 Failure Scenario Test 脚本总耗时，不是 Planner 或完整工作流耗时。

### ev_worktrace_execution_005: Failure Scenario retry_count = 1

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /trace_summary/retry_count
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
1
```

- limitation: retry_count = 1 只属于 Failure Scenario Test。

### ev_worktrace_execution_006: 初次 blocked，修复后 pass

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "initial_status": "blocked",
  "revision_status": "pass",
  "rerun_status": "pass"
}
```

- limitation: 该状态只验证输入结构错误和修复路径，不评估商品声明。

### ev_worktrace_execution_007: Human Approval = needs_revision

- evidence_type: human_review_required
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /approval_summary/overall_decision
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"needs_revision"
```

- limitation: Human Approval 仍需修订，不能写成 approved。

### ev_worktrace_execution_008: Claim links 44，unique claim_ids 14

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "claim_links": 44,
  "unique_claim_ids": 14
}
```

- limitation: 关联规则为 direct_output_lineage，不使用公共输入文件批量传播。

### ev_worktrace_execution_009: Risk links 18，unique risk_ids 10

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "risk_links": 18,
  "unique_risk_ids": 10,
  "unlinked_risk_ids": 1
}
```

- limitation: 1 个 risk_id 无法直接归属历史节点时不强行关联。

### ev_worktrace_execution_010: 节点内无重复关联

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "duplicate_risk_ids_in_node": false,
  "duplicate_claim_ids_in_node": false
}
```

- limitation: 去重只证明关联结构质量，不代表风险或声明已获批准。

### ev_runtime_execution_001: Runtime run_id

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /run_id
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"runtime_ef30ea4b-420f-4cbd-b7d3-7d30420759eb"
```

- limitation: run_id 来自本次 Runtime Runner 输出，不得用于补写历史 WorkTrace。

### ev_runtime_execution_002: Runtime started_at

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /started_at
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"2026-07-20T14:32:24.339Z"
```

- limitation: started_at 是本地 instrumented workflow 的运行开始时间，不是 Steps 1-15 历史时间。

### ev_runtime_execution_003: Runtime ended_at

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /ended_at
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"2026-07-20T14:32:24.353Z"
```

- limitation: ended_at 是本地 instrumented workflow 的运行结束时间，不是历史节点时间。

### ev_runtime_execution_004: Runtime duration_ms

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /duration_ms
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
12
```

- limitation: duration_ms 是本地插桩脚本读取、检查和编排已有结构化产物的实测耗时；不是模型推理耗时、生产 Agent 延迟或业务效率提升。

### ev_runtime_execution_005: 10 个业务阶段与 12 个 Runtime 节点的区别

- evidence_type: deterministic_verified
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "business_stage_count": 10,
  "measured_runtime_node_count": 12,
  "runtime_node_count": 12
}
```

- limitation: Insight Skills 是一个业务阶段，但在 Runtime 中拆为三个 measured 并行 Skill 节点，因此 10 个业务阶段对应 12 个 Runtime 节点。

### ev_runtime_execution_006: Planner fan-out / fan-in 并行关系

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /parallel_groups/0
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "fan_out_from": "planner",
  "parallel_node_ids": [
    "audience_insight",
    "selling_point_analyst",
    "platform_strategy"
  ],
  "fan_in_to": "creative_agent",
  "status": "pass",
  "expected_parallel_skills_present": true
}
```

- limitation: Planner fan-out 到三个 Insight Skill，再 fan-in 到 Creative Agent；这是本地 Promise.all 编排记录，不是额外 Agent 节点。

### ev_runtime_execution_007: Runtime model usage 未使用模型

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /nodes
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "usage_statuses": [
    "not_used"
  ],
  "model_call_count": 0
}
```

- limitation: Runtime 只读取、检查和编排已有结构化产物，没有调用模型、OpenClaw Agent、网络服务或外部 API。

### ev_runtime_execution_008: Runtime Token 与成本均为 null

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /runtime_summary
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "token_and_cost_null": true,
  "total_input_tokens": null,
  "total_output_tokens": null,
  "estimated_cost": null
}
```

- limitation: 未采集且未发生模型调用时，Token 与成本保持 null；不得补造 Token、成本或业务指标。

### ev_real_agent_runtime_001: Brief Parser 完成真实模型 Runtime 调用

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /runtime_type
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"real_model_runtime"
```

- limitation: 该证据只说明 Brief Parser 单节点出现真实模型 Runtime 记录；不代表完整多 Agent Runtime。

### ev_real_agent_runtime_002: Brief Parser Runtime provider

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /provider
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"openai"
```

- limitation: provider 来自 Runtime JSON；不代表完整多 Agent Runtime。

### ev_real_agent_runtime_003: Brief Parser Runtime model

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /model
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"gpt-5.5"
```

- limitation: model 来自 Runtime JSON；不代表完整多 Agent Runtime。

### ev_real_agent_runtime_004: Brief Parser Runtime duration_ms

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /duration_ms
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
6544
```

- limitation: duration_ms 来自 Brief Parser Runtime JSON；不得外推为完整工作流耗时。

### ev_real_agent_runtime_005: Brief Parser Runtime usage.total

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /usage/total
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
18419
```

- limitation: usage.total 来自 Brief Parser Runtime JSON；不得补造其他节点 Token。

### ev_real_agent_runtime_006: Brief Parser Runtime stop_reason

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /stop_reason
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"stop"
```

- limitation: stop_reason 来自 Brief Parser Runtime JSON；不代表业务效果通过。

### ev_real_agent_runtime_007: Brief Parser Runtime fallback_used

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /fallback_used
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
false
```

- limitation: fallback_used 来自 Brief Parser Runtime JSON；不代表完整多 Agent Runtime。

### ev_real_agent_runtime_008: Brief Parser Runtime cost 当前不可用

- evidence_type: not_available
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: 
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
null
```

- limitation: Runtime JSON 未提供可用 cost；成本证据保持 not_available，不补造成本。

### ev_real_agent_trace_001: Brief Parser 单节点 Real Agent Trace

- evidence_type: measured
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: /trace_type
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "trace_type": "real_agent_single_node_trace",
  "node_id": "brief_parser",
  "scope": "brief_parser_single_node"
}
```

- limitation: 该证据只说明 Brief Parser 单节点 Real Agent Trace；不是完整工作流 Trace。

### ev_real_agent_trace_002: Brief Parser Trace artifact_trace_key

- evidence_type: deterministic_verified
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: /artifact_trace_key
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"8e3aac1f91f8fd5297e257449f9f07c01d1c5d69dec920a06e8150eaa0136a00"
```

- limitation: artifact_trace_key 只用于稳定关联该 Brief Parser 单节点 Trace；不得写成 runtime trace_id。

### ev_real_agent_trace_003: Brief Parser Trace 事件数量

- evidence_type: measured
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: /events
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
4
```

- limitation: 事件数量只属于 Brief Parser 单节点 Trace，不代表完整工作流事件数量。

### ev_real_agent_trace_004: Brief Parser Trace 真实 Tool Call 数量

- evidence_type: measured
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: /tool_call_count
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
0
```

- limitation: tool_call_count = 0 必须如实记录；该单节点 Trace 没有真实 Tool Call。

### ev_real_agent_trace_005: Brief Parser Trace 错误与重试数量

- evidence_type: measured
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: 
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
{
  "error_count": 0,
  "retry_count": 0
}
```

- limitation: 错误与重试数量只属于 Brief Parser 单节点 Trace，不代表完整工作流错误率或重试率。

### ev_real_agent_trace_006: Brief Parser Runtime 未提供 trace_id

- evidence_type: not_available
- source_artifact: outputs/real_agent_trace.json
- source_json_pointer: /trace_id_status
- portfolio_section: Execution Trace Evidence
- displayed_value:

```json
"not_provided_by_runtime"
```

- limitation: Runtime 未提供 trace_id；不得把 artifact_trace_key 写成 runtime trace_id。

## Claim Trace Evidence

### ev_claim_trace_001: 声明总数

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/claim_total
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
14
```

- limitation: 声明被追踪不代表现实事实已证明。

### ev_claim_trace_002: 六类声明覆盖

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/claim_category_counts
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
{
  "product_capability": 4,
  "ai_capability": 1,
  "usage_scenario": 2,
  "visual_asset_authorization": 3,
  "compliance_or_safety": 2,
  "growth_or_business_outcome": 2
}
```

- limitation: 覆盖类别不等于各声明已获正式证明或授权。

### ev_claim_trace_003: source_found 计数

- evidence_type: human_review_required
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/source_exists_counts/source_found
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
14
```

- limitation: source_found 只代表来源字段存在，不代表现实事实已经证明。

### ev_claim_trace_004: 证据状态计数

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/evidence_status_counts
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
{
  "requires_human_verification": 8,
  "not_available": 2,
  "supported_by_provided_source": 2,
  "derived_from_mock": 2
}
```

- limitation: requires_human_verification、not_available 和 derived_from_mock 必须显式展示边界。

### ev_claim_trace_005: 人工审核要求数量

- evidence_type: human_review_required
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/human_review_required_count
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
12
```

- limitation: 需要人工审核的声明不能展示为已被现实证明。

### ev_claim_trace_006: Claim file checks

- evidence_type: deterministic_verified
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/file_checks
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
{
  "total": 67,
  "passed": 67,
  "failed": 0
}
```

- limitation: 文件检查通过不证明事实真实性。

### ev_claim_trace_007: Claim JSON Pointer checks

- evidence_type: deterministic_verified
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/json_pointer_checks
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
{
  "total": 54,
  "passed": 54,
  "failed": 0
}
```

- limitation: JSON Pointer 存在不等于现实事实成立。

### ev_claim_trace_008: Release gates preserved

- evidence_type: measured
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/release_gates_preserved
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
true
```

- limitation: 只表示 Claim Trace 扩展未解除 gates。

### ev_claim_trace_009: Claim release gates

- evidence_type: measured
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /release_gates
- portfolio_section: Claim Trace Evidence
- displayed_value:

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

- limitation: Evaluation permission does not equal final generation permission.

### ev_claim_trace_010: Source priority rules

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /source_priority
- portfolio_section: Claim Trace Evidence
- displayed_value:

```json
{
  "factual_sources": [
    "original brief",
    "formal proof materials when provided"
  ],
  "governance_decision_sources": [
    "Human Approval",
    "Brand Compliance"
  ],
  "downstream_artifact_rule": "Downstream Agent artifacts can cite or transform claims but cannot prove original facts.",
  "mock_data_rule": "Mock or demo data cannot prove real business outcomes."
}
```

- limitation: Agent 下游产物不能反向证明原始事实；mock 数据不能证明真实业务效果。

## Evaluation Evidence

### ev_evaluation_001: Overall evaluation status

- evidence_type: artifact_derived
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /meta/status
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"needs_review"
```

- limitation: 不是 pass，不代表生产可用。

### ev_evaluation_002: Data quality

- evidence_type: artifact_derived
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/overall_data_quality
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"partial"
```

- limitation: 数据质量为 partial，不能写成完整真实数据闭环。

### ev_evaluation_003: Completed demo cases

- evidence_type: derived_from_mock
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/completed_demo_cases
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
1
```

- limitation: 单一 Demo 案例，不能外推到多品类稳定性。

### ev_evaluation_004: Pending demo cases

- evidence_type: not_available
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/pending_demo_cases
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
2
```

- limitation: 未提供完整 Brief，不能伪造结果。

### ev_evaluation_005: Data source type rules

- evidence_type: artifact_derived
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/data_source_type_rules
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
{
  "measured": "Supported by current artifact presence, JSON validation, explicit release gate values, or counted records in current files.",
  "derived_from_mock": "Calculated from demo CSV or mock audit log, not production data.",
  "estimated": "Taken from demo baseline assumptions; must not be called real efficiency improvement.",
  "not_available": "No reliable denominator or real annotation exists yet."
}
```

- limitation: 类型定义必须在展示中保留，不得混写成真实效果。

### ev_evaluation_006: Benchmark case data source

- evidence_type: derived_from_mock
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /benchmark_cases/0/data_source_type
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"derived_from_mock"
```

- limitation: 完整 Demo 的测试数据来源为 mock 派生。

### ev_evaluation_007: 平均耗时指标类型

- evidence_type: estimated
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /metric_results/1/data_source_type
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"estimated"
```

- limitation: 不能写成真实效率提升。

### ev_evaluation_008: 人工修改率可用性

- evidence_type: not_available
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /metric_results/2/data_source_type
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"not_available"
```

- limitation: 缺少人工字段级标注。

### ev_evaluation_009: 幻觉率可用性

- evidence_type: not_available
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /metric_results/3/data_source_type
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"not_available"
```

- limitation: 缺少 claim 抽检分母和 unsupported-claim 分子。

### ev_evaluation_010: 审批闸口正确率来源类型

- evidence_type: measured
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /metric_results/7/data_source_type
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
"measured"
```

- limitation: 只证明当前 artifact 中 gate 继承正确，不代表最终发布可用。

### ev_evaluation_011: Rubric 结果

- evidence_type: measured
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /rubric_results
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
[
  {
    "rubric_id": "rubric_001",
    "dimension": "输入完整性",
    "score": 0.78,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Required Step 14 inputs are present; proof materials and asset authorization are missing.",
    "status": "needs_review"
  },
  {
    "rubric_id": "rubric_002",
    "dimension": "Planner 路由正确性",
    "score": 0.86,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Planner routes Brand Compliance before Human Approval and Growth Evaluation after compliance and approval.",
    "status": "pass_with_caution"
  },
  {
    "rubric_id": "rubric_003",
    "dimension": "上下游字段交接完整性",
    "score": 0.8,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Planner, Human Approval, and Brand Compliance expose handoff fields; some future_outputs labels remain historical placeholders.",
    "status": "needs_review"
  },
  {
    "rubric_id": "rubric_004",
    "dimension": "声明来源可追踪性",
    "score": 0.72,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Claim source maps and risk source fields exist, but no field-level automated trace matrix yet.",
    "status": "needs_review"
  },
  {
    "rubric_id": "rubric_005",
    "dimension": "合规风险识别与传递",
    "score": 0.9,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Brand Compliance identified 8 risk items and Human Approval inherited critical blocked gates.",
    "status": "pass_with_caution"
  },
  {
    "rubric_id": "rubric_006",
    "dimension": "Human Approval 闸口正确性",
    "score": 0.92,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Step 13 status is needs_revision, final_generation_allowed=false, public_release_allowed=false.",
    "status": "pass_with_caution"
  },
  {
    "rubric_id": "rubric_007",
    "dimension": "JSON / Markdown 产物完整性",
    "score": 0.86,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Step 14 JSON/Markdown are generated; JSON validation is required after write.",
    "status": "pass_with_caution"
  },
  {
    "rubric_id": "rubric_008",
    "dimension": "blocked 内容是否被正确阻止",
    "score": 0.95,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Final marketing copy, final image prompt, image generation and public release remain blocked.",
    "status": "pass_with_caution"
  },
  {
    "rubric_id": "rubric_009",
    "dimension": "失败归因是否清晰",
    "score": 0.82,
    "score_scale": "0-1",
    "data_source_type": "measured",
    "evidence": "Failure taxonomy and issue list contain root causes and verification methods.",
    "status": "needs_review"
  },
  {
    "rubric_id": "rubric_010",
    "dimension": "工作流是否可复现",
    "score": 0.7,
    "score_scale": "0-1",
    "data_source_type": "derived_from_mock",
    "evidence": "Runbook, CSV and audit log exist; only one completed case is available.",
    "status": "needs_review"
  }
]
```

- limitation: Rubric 来自当前 artifact 测评，不代表真实客户场景稳定性。

### ev_evaluation_012: Workflow gate checks

- evidence_type: measured
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /workflow_gate_checks
- portfolio_section: Evaluation Evidence
- displayed_value:

```json
[
  {
    "gate_id": "gate_001",
    "gate_name": "Step 13 inheritance",
    "expected": "needs_revision inherited",
    "actual": "needs_revision",
    "status": "pass",
    "evidence": "outputs/human_approval_record.json"
  },
  {
    "gate_id": "gate_002",
    "gate_name": "Structured planning can enter evaluation",
    "expected": true,
    "actual": true,
    "status": "pass",
    "evidence": "Human Approval approval_summary"
  },
  {
    "gate_id": "gate_003",
    "gate_name": "Final generation remains blocked",
    "expected": false,
    "actual": false,
    "status": "pass",
    "evidence": "Human Approval approval_summary"
  },
  {
    "gate_id": "gate_004",
    "gate_name": "Public release remains blocked",
    "expected": false,
    "actual": false,
    "status": "pass",
    "evidence": "Human Approval approval_summary"
  },
  {
    "gate_id": "gate_005",
    "gate_name": "No final creative generation in Step 14",
    "expected": "no final copy/prompt/image/frontend",
    "actual": "only evaluation artifacts generated",
    "status": "pass",
    "evidence": "Step 14 output file list"
  }
]
```

- limitation: 只证明当前 gate 继承符合预期，不证明生产上线。

## Enterprise Governance

### ev_governance_001: Human Approval status

- evidence_type: measured
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /meta/status
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"needs_revision"
```

- limitation: needs_revision 不是最终放行。

### ev_governance_002: Final generation allowed

- evidence_type: measured
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /approval_summary/final_generation_allowed
- portfolio_section: Enterprise Governance
- displayed_value:

```json
false
```

- limitation: 最终生成仍 blocked。

### ev_governance_003: Public release allowed

- evidence_type: measured
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /approval_summary/public_release_allowed
- portfolio_section: Enterprise Governance
- displayed_value:

```json
false
```

- limitation: 公开发布仍 blocked。

### ev_governance_004: Reviewer authenticity boundary

- evidence_type: human_review_required
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /reviewer_record
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "reviewer_role": [
    "品牌",
    "法务/合规",
    "电商运营",
    "内容负责人",
    "设计负责人"
  ],
  "reviewer_name": null,
  "human_signature": "pending",
  "reviewed_at": null,
  "note": "不得伪造真实人工审批；本记录为作品集 Demo 审批记录，不是真实企业员工签字。"
}
```

- limitation: 不得伪造真实人工审批、签字或授权证明。

### ev_governance_005: Release gates

- evidence_type: measured
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /release_gates
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "structured_planning_package": "approved",
  "growth_evaluation": "approved_for_evaluation_only",
  "final_marketing_copy": "blocked",
  "final_image_prompt": "blocked",
  "image_generation": "blocked",
  "frontend_page": "blocked",
  "public_release": "blocked",
  "reason": "Evidence, usage conditions, asset authorization and real human approval are incomplete. Evaluation permission does not equal final generation permission."
}
```

- limitation: approved_for_evaluation_only 不等于最终生成或公开发布许可。

### ev_governance_006: Schema validation status

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/status
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"pass"
```

- limitation: Schema pass 不证明事实、授权或业务效果。

### ev_governance_007: Claim source priority

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /source_priority
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "factual_sources": [
    "original brief",
    "formal proof materials when provided"
  ],
  "governance_decision_sources": [
    "Human Approval",
    "Brand Compliance"
  ],
  "downstream_artifact_rule": "Downstream Agent artifacts can cite or transform claims but cannot prove original facts.",
  "mock_data_rule": "Mock or demo data cannot prove real business outcomes."
}
```

- limitation: 必须展示 source_found、downstream artifact 和 mock data 的边界。

### ev_governance_008: Revision queue

- evidence_type: human_review_required
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /revision_queue
- portfolio_section: Enterprise Governance
- displayed_value:

```json
[
  {
    "revision_id": "rev_001",
    "source_node": "Creative Agent",
    "issue": "高清、全景、防水、防抖、耐用等表达缺少完整证明材料和适用条件。",
    "required_action": "补充证明材料字段、适用范围、限制说明和可替代表达。",
    "owner_role": "内容负责人",
    "priority": "high",
    "return_to_node": "Creative Agent"
  },
  {
    "revision_id": "rev_002",
    "source_node": "Brand Compliance Agent",
    "issue": "最终生成和公开发布的合规阻断仍未解除。",
    "required_action": "确认合规替代表达、阻断规则和人工复核清单。",
    "owner_role": "法务/合规",
    "priority": "high",
    "return_to_node": "Brand Compliance Agent"
  },
  {
    "revision_id": "rev_003",
    "source_node": "Image Prompt Skill",
    "issue": "商品图片、App 截图、Logo、人物肖像和场景素材缺少授权。",
    "required_action": "补充素材授权、来源追踪和使用范围；未完成前保持图片相关 release gate blocked。",
    "owner_role": "设计负责人",
    "priority": "high",
    "return_to_node": "Image Prompt Skill"
  },
  {
    "revision_id": "rev_004",
    "source_node": "Planner Agent",
    "issue": "进入 Step 14 时需要保留“可测评不等于可生成”的闸口说明。",
    "required_action": "将审批状态、blocked items 和 revision queue 传给 Growth Evaluation Agent。",
    "owner_role": "电商运营",
    "priority": "medium",
    "return_to_node": "Growth Evaluation Agent"
  }
]
```

- limitation: 修订队列说明仍有人工审核与补证要求。

### ev_governance_two_stage_001: Pre-check decision

- evidence_type: human_review_required
- source_artifact: outputs/brand_compliance_pre_check.json
- source_json_pointer: /decision_summary/decision
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"needs_review"
```

- limitation: pre_check 结论仍为 needs_review，需要人工审核与补证。

### ev_governance_two_stage_002: Post-generation-check decision

- evidence_type: human_review_required
- source_artifact: outputs/brand_compliance_post_generation_check.json
- source_json_pointer: /decision_summary/decision
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"needs_review"
```

- limitation: post_generation_check 结论仍为 needs_review，只允许进入人工审核，不允许最终生成或发布。

### ev_governance_two_stage_003: 双阶段风险计数

- evidence_type: artifact_derived
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /risk_counts
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "inherited": 10,
  "resolved": 0,
  "unresolved": 10,
  "newly_detected": 1
}
```

- limitation: 10 个 inherited/unresolved risks 和 1 个 newly detected risk 表示治理风险仍需审阅。

### ev_governance_two_stage_004: risk_traceability_gap 治理发现

- evidence_type: human_review_required
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /governance_findings/risk_traceability_gap_present
- portfolio_section: Enterprise Governance
- displayed_value:

```json
true
```

- limitation: risk_traceability_gap 是治理发现，不是结构验证失败；需要人工审核跨阶段风险追踪。

### ev_worktrace_governance_001: 五个关键 release gates 在两个 Trace 中均为 blocked

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace.json
- source_json_pointer: /release_gates
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "historical_trace_blocked": true,
  "failure_scenario_trace_blocked": true
}
```

- limitation: 两个 WorkTrace 均不解除最终营销文案、最终图片 Prompt、图片生成、前端页面或公开发布。

### ev_worktrace_governance_002: Schema pass 不代表 Governance pass

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace.json
- source_json_pointer: /limitations/4
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"File existence checks prove references exist only; they do not prove governance, human approval, production readiness, or release permission."
```

- limitation: Schema 和文件检查通过不证明治理通过、人工审批通过或生产可用。

### ev_worktrace_governance_003: Human signature 仍为 pending

- evidence_type: human_review_required
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /reviewer_record/human_signature
- portfolio_section: Enterprise Governance
- displayed_value:

```json
"pending"
```

- limitation: 不得伪造真实人工签字、审核人或审核时间。

### ev_runtime_governance_001: Runtime Human Approval 保持 needs_revision / pending

- evidence_type: human_review_required
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /human_approval
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "overall_decision": "needs_revision",
  "human_signature": "pending",
  "reviewer_name": null,
  "reviewed_at": null
}
```

- limitation: Runtime 中的 Human Approval 只是状态记录；没有真实人工审批、审核人或审核时间。

### ev_runtime_governance_002: Runtime Release Gates 继续 blocked

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /release_gates
- portfolio_section: Enterprise Governance
- displayed_value:

```json
{
  "final_marketing_copy": "blocked",
  "final_image_prompt": "blocked",
  "image_generation": "blocked",
  "frontend_page": "blocked",
  "public_release": "blocked"
}
```

- limitation: 五个 Runtime release gates 继续 blocked；不得解除最终营销文案、最终图片 Prompt、图片生成、前端页面或公开发布。

## Limitations

### ev_limitation_001: 单一完整 Demo 案例

- evidence_type: derived_from_mock
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/completed_demo_cases
- portfolio_section: Limitations
- displayed_value:

```json
1
```

- limitation: 不能外推跨品类稳定性。

### ev_limitation_002: 缺少真实客户数据

- evidence_type: not_available
- source_artifact: outputs/growth_evaluation_report.json
- source_json_pointer: /data_quality_summary/not_available_sources
- portfolio_section: Limitations
- displayed_value:

```json
[
  "real campaign delivery logs",
  "real customer CTR/CVR/GMV/traffic/conversion results",
  "manual field-level review annotations",
  "unsupported-claim audit sample with counted denominator",
  "real per-node runtime logs for Steps 1-13"
]
```

- limitation: 不得写客户验证完成。

### ev_limitation_003: 缺少真实 per-node runtime

- evidence_type: not_available
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /workflow_summary/measured_node_time_count
- portfolio_section: Limitations
- displayed_value:

```json
0
```

- limitation: 不得伪装成真实 runtime telemetry。

### ev_limitation_004: mock 数据边界

- evidence_type: derived_from_mock
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /source_priority/mock_data_rule
- portfolio_section: Limitations
- displayed_value:

```json
"Mock or demo data cannot prove real business outcomes."
```

- limitation: mock 或 demo 数据不能证明真实业务效果。

### ev_limitation_005: 素材授权证明缺口

- evidence_type: human_review_required
- source_artifact: outputs/human_approval_record.json
- source_json_pointer: /approval_items/5
- portfolio_section: Limitations
- displayed_value:

```json
{
  "item_id": "approval_item_006",
  "category": "asset_authorization",
  "source_artifact": "outputs/brand_compliance_report.json",
  "risk_level": "critical",
  "issue": "Logo、人物肖像、商品图片、App 截图和场景素材需要授权；当前没有真实授权证明。",
  "evidence_status": "missing",
  "decision": "blocked",
  "required_action": "补齐素材授权、来源追踪和使用范围；未完成前不得生成最终图片 Prompt、图片或公开发布。",
  "owner_role": "设计负责人"
}
```

- limitation: 没有正式素材授权证明，不能生成最终图片 Prompt、图片或公开发布。

### ev_limitation_006: V2 limitations

- evidence_type: artifact_derived
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /limitations
- portfolio_section: Limitations
- displayed_value:

```json
[
  "Only one complete Demo exists: 运动相机.",
  "便携投影仪 and 美妆精华 benchmark cases are pending and must not be treated as results.",
  "Some metrics are mock or estimated; they are not production evidence.",
  "Human edit rate and hallucination rate are not_available because no field-level annotations exist.",
  "No real campaign CTR, CVR, GMV, traffic, conversion or revenue data exists.",
  "No real reviewer name, signature, timestamp or asset authorization proof exists.",
  "Field-level claim trace matrix is not yet automated.",
  "Final creative generation and public release are still blocked."
]
```

- limitation: V2 报告局限性必须保留，不能写成生产系统上线。

### ev_limitation_007: blocked release gates

- evidence_type: measured
- source_artifact: outputs/v2_final_report.json
- source_json_pointer: /release_gates
- portfolio_section: Limitations
- displayed_value:

```json
{
  "structured_planning_package": "approved",
  "growth_evaluation": "approved_for_evaluation_only",
  "final_marketing_copy": "blocked",
  "final_image_prompt": "blocked",
  "image_generation": "blocked",
  "frontend_page": "blocked",
  "public_release": "blocked",
  "reason": "Evidence, usage conditions, asset authorization and real human approval are incomplete. Evaluation permission does not equal final generation permission."
}
```

- limitation: 不得解除任何 blocked release gate。

### ev_limitation_008: 作品集要求边界

- evidence_type: artifact_derived
- source_artifact: docs/portfolio_requirements_mapping.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Limitations
- displayed_value:

```json
"不夸大前端、接口、真实平台 API、真实客户数据或公开投放能力。"
```

- limitation: Markdown 来源只作为 artifact-derived 边界说明。

### ev_limitation_two_stage_001: 双阶段合规回溯验证边界

- evidence_type: artifact_derived
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /meta/execution_context
- portfolio_section: Limitations
- displayed_value:

```json
"retrospective_design_validation"
```

- limitation: 这是 retrospective_design_validation，不是 Steps 1-15 的历史真实执行顺序。

### ev_worktrace_limitation_001: 两个 trace_id 均为 null

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /trace_summary/trace_id
- portfolio_section: Limitations
- displayed_value:

```json
{
  "historical_trace_id": null,
  "failure_scenario_trace_id": null
}
```

- limitation: 没有真实运行时 trace_id，不能补造。

### ev_worktrace_limitation_002: historical artifact_trace_key 不是运行时 ID

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /limitations/0
- portfolio_section: Limitations
- displayed_value:

```json
"artifact_trace_key is a stable retrospective artifact key derived from source artifact paths; it is not a runtime trace_id."
```

- limitation: artifact_trace_key 只能用于稳定关联历史产物，不能写成 request_id 或 trace_id。

### ev_worktrace_limitation_003: 58 ms 不是 Planner 或完整工作流耗时

- evidence_type: measured
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /limitations/1
- portfolio_section: Limitations
- displayed_value:

```json
"The measured duration is not Planner runtime and is not full Agent workflow runtime."
```

- limitation: 58 ms 只属于 Failure Scenario Test 脚本总耗时。

### ev_worktrace_limitation_004: retry_count = 1 只属于 Failure Scenario Test

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /trace_summary/retry_count
- portfolio_section: Limitations
- displayed_value:

```json
1
```

- limitation: 不能代表完整工作流或历史节点重试次数。

### ev_worktrace_limitation_005: 历史节点时间不可用

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /limitations/2
- portfolio_section: Limitations
- displayed_value:

```json
"All Steps 1-15 keep historical_not_available timing and null started_at, completed_at, duration_ms."
```

- limitation: 历史节点时间全部 historical_not_available，不能补造。

### ev_worktrace_limitation_006: 1 个 risk_id 无法直接归属历史节点

- evidence_type: artifact_derived
- source_artifact: outputs/worktrace.json
- source_json_pointer: /limitations/5
- portfolio_section: Limitations
- displayed_value:

```json
"1 unique risk_id values are not directly assigned to historical nodes because no node output_refs.path equals their risk_record.source_artifact; this is an evidence boundary between historical artifacts and retrospective two-stage compliance reconstruction, not permission to infer lineage."
```

- limitation: 无直接 output lineage 时不强行关联风险。

### ev_worktrace_limitation_007: production_ready = false

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /boundaries/production_ready
- portfolio_section: Limitations
- displayed_value:

```json
false
```

- limitation: Schema pass 和 WorkTrace pass 不代表生产可用。

### ev_worktrace_limitation_008: customer_validated = false

- evidence_type: not_available
- source_artifact: outputs/worktrace.json
- source_json_pointer: /boundaries/customer_validated
- portfolio_section: Limitations
- displayed_value:

```json
false
```

- limitation: 当前没有真实客户验证。

### ev_runtime_limitation_001: Runtime 本地插桩边界

- evidence_type: measured
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /boundaries
- portfolio_section: Limitations
- displayed_value:

```json
{
  "execution_context": "instrumented_local_run",
  "duration_ms": 12,
  "model_usage": [
    "not_used"
  ],
  "token_and_cost_null": true
}
```

- limitation: 当前 Runtime 是本地 instrumented workflow，只读取、检查和编排已有结构化产物；没有调用模型、外部 API 或真实人工审批，duration_ms 不能描述成模型推理耗时、生产 Agent 延迟或业务效率提升。

### ev_real_agent_runtime_limitation_001: 真实模型 Runtime 目前只覆盖 Brief Parser 单节点

- evidence_type: measured
- source_artifact: outputs/real_agent_brief_parser_runtime.json
- source_json_pointer: /node_id
- portfolio_section: Limitations
- displayed_value:

```json
{
  "node_id": "brief_parser",
  "runtime_type": "real_model_runtime"
}
```

- limitation: 当前只完成 Brief Parser 单节点真实模型 Runtime；不代表完整多 Agent Runtime 已实现。

## Reproducibility

### ev_repro_001: Validation script command

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/script_path
- portfolio_section: Reproducibility
- displayed_value:

```json
"scripts/validate_artifacts.mjs"
```

- limitation: 该命令验证 artifact，不生成最终营销内容。

### ev_repro_002: Validation script exit code

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/script_exit_code
- portfolio_section: Reproducibility
- displayed_value:

```json
0
```

- limitation: 退出码 0 不等于事实或业务效果已证明。

### ev_repro_003: Workflow log builder

- evidence_type: deterministic_verified
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /meta/builder_script
- portfolio_section: Reproducibility
- displayed_value:

```json
"scripts/build_workflow_execution_log.mjs"
```

- limitation: 生成 retrospective artifact-derived log，不是真实 runtime telemetry。

### ev_repro_004: Workflow log builder exit code

- evidence_type: deterministic_verified
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: /meta/builder_exit_code
- portfolio_section: Reproducibility
- displayed_value:

```json
0
```

- limitation: 退出码 0 不代表节点重新运行。

### ev_repro_005: Claim Trace file checks

- evidence_type: deterministic_verified
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/file_checks
- portfolio_section: Reproducibility
- displayed_value:

```json
{
  "total": 67,
  "passed": 67,
  "failed": 0
}
```

- limitation: 文件存在不证明现实事实成立。

### ev_repro_006: Claim Trace pointer checks

- evidence_type: deterministic_verified
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: /summary/json_pointer_checks
- portfolio_section: Reproducibility
- displayed_value:

```json
{
  "total": 54,
  "passed": 54,
  "failed": 0
}
```

- limitation: Pointer 存在不证明现实事实成立。

### ev_repro_007: Validation report JSON root

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: 
- portfolio_section: Reproducibility
- displayed_value:

```json
{
  "meta": {
    "artifact_name": "artifact_validation_report",
    "validation_type": "deterministic_json_schema",
    "schema_draft": "2020-12",
    "validator": "Ajv",
    "validator_version": "8.20.0",
    "dependency_status": "available",
    "status": "pass",
    "generated_at": "2026-07-27T06:54:15.036Z",
    "script_path": "scripts/validate_artifacts.mjs",
    "script_exit_code": 0
  },
  "parse_validation": {
    "total_json_files": 49,
    "passed": 49,
    "failed": 0
  },
  "schema_validation": {
    "mapped_artifacts": 18,
    "passed": 18,
    "failed": 0
  },
  "schema_coverage": {
    "covered_artifacts": [
      "data/sample_brief.json",
      "outputs/brand_compliance_post_generation_check.json",
      "outputs/brand_compliance_pre_check.json",
      "outputs/claim_trace_matrix.json",
      "outputs/failure_scenario_test_report.json",
      "outputs/growth_evaluation_report.json",
      "outputs/human_approval_record.json",
      "outputs/planner_execution_plan.json",
      "outputs/portfolio_evidence_pack.json",
      "outputs/real_agent_brief_parser_runtime.json",
      "outputs/real_agent_trace.json",
      "outputs/runtime_execution.json",
      "outputs/two_stage_compliance_validation_report.json",
      "outputs/v2_final_report.json",
      "outputs/workflow_execution_log.json",
      "outputs/workflow_metrics_report.json",
      "outputs/worktrace.json",
      "outputs/worktrace_failure_scenario.json"
    ],
    "not_yet_covered_artifacts": [
      "data/audit_log_sample.json",
      "data/failure_scenarios/brief_missing_campaign_goal.scenario.json",
      "outputs/artifact_validation_report.json",
      "outputs/audience_insight.json",
      "outputs/brand_compliance_report.json",
      "outputs/creative_copy_pack_outline.json",
      "outputs/final_creative_package_report.json",
      "outputs/growth_metrics_plan.json",
      "outputs/image_prompt_pack_outline.json",
      "outputs/platform_strategy_plan.json",
      "outputs/selling_point_matrix.json",
      "outputs/standardized_brief_summary.json",
      "package-lock.json",
      "package.json",
      "schemas/artifacts/claim_trace_matrix.schema.json",
      "schemas/artifacts/common.schema.json",
      "schemas/artifacts/failure_scenario_test_report.schema.json",
      "schemas/artifacts/growth_evaluation_report.schema.json",
      "schemas/artifacts/human_approval_record.schema.json",
      "schemas/artifacts/planner_execution_plan.schema.json",
      "schemas/artifacts/portfolio_evidence_pack.schema.json",
      "schemas/artifacts/real_agent_brief_parser_runtime.schema.json",
      "schemas/artifacts/real_agent_trace.schema.json",
      "schemas/artifacts/runtime_execution.schema.json",
      "schemas/artifacts/two_stage_compliance_report.schema.json",
      "schemas/artifacts/two_stage_compliance_validation_report.schema.json",
      "schemas/artifacts/v2_final_report.schema.json",
      "schemas/artifacts/workflow_execution_log.schema.json",
      "schemas/artifacts/workflow_metrics_report.schema.json",
      "schemas/artifacts/worktrace.schema.json",
      "schemas/product_brief.schema.json"
    ]
  },
  "results": [
    {
      "artifact_path": "data/audit_log_sample.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "data/failure_scenarios/brief_missing_campaign_goal.scenario.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "data/sample_brief.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/artifact_validation_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/audience_insight.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/brand_compliance_post_generation_check.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/brand_compliance_pre_check.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/brand_compliance_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/claim_trace_matrix.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/creative_copy_pack_outline.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/failure_scenario_test_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/final_creative_package_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/growth_evaluation_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/growth_metrics_plan.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/human_approval_record.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/image_prompt_pack_outline.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/planner_execution_plan.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/platform_strategy_plan.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/portfolio_evidence_pack.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/real_agent_brief_parser_runtime.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/real_agent_trace.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/runtime_execution.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/selling_point_matrix.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/standardized_brief_summary.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/two_stage_compliance_validation_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/v2_final_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/workflow_execution_log.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/workflow_metrics_report.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/worktrace_failure_scenario.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/worktrace.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "package-lock.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "package.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/claim_trace_matrix.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/common.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/failure_scenario_test_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/growth_evaluation_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/human_approval_record.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/planner_execution_plan.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/portfolio_evidence_pack.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/real_agent_brief_parser_runtime.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/real_agent_trace.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/runtime_execution.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/two_stage_compliance_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/two_stage_compliance_validation_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/v2_final_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/workflow_execution_log.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/workflow_metrics_report.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/artifacts/worktrace.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "schemas/product_brief.schema.json",
      "validation": "json_parse",
      "status": "pass"
    },
    {
      "artifact_path": "data/sample_brief.json",
      "schema_path": "schemas/product_brief.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/planner_execution_plan.json",
      "schema_path": "schemas/artifacts/planner_execution_plan.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/human_approval_record.json",
      "schema_path": "schemas/artifacts/human_approval_record.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/growth_evaluation_report.json",
      "schema_path": "schemas/artifacts/growth_evaluation_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/v2_final_report.json",
      "schema_path": "schemas/artifacts/v2_final_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/workflow_execution_log.json",
      "schema_path": "schemas/artifacts/workflow_execution_log.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/claim_trace_matrix.json",
      "schema_path": "schemas/artifacts/claim_trace_matrix.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/portfolio_evidence_pack.json",
      "schema_path": "schemas/artifacts/portfolio_evidence_pack.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/brand_compliance_pre_check.json",
      "schema_path": "schemas/artifacts/two_stage_compliance_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/brand_compliance_post_generation_check.json",
      "schema_path": "schemas/artifacts/two_stage_compliance_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/two_stage_compliance_validation_report.json",
      "schema_path": "schemas/artifacts/two_stage_compliance_validation_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/failure_scenario_test_report.json",
      "schema_path": "schemas/artifacts/failure_scenario_test_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/workflow_metrics_report.json",
      "schema_path": "schemas/artifacts/workflow_metrics_report.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/runtime_execution.json",
      "schema_path": "schemas/artifacts/runtime_execution.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/worktrace.json",
      "schema_path": "schemas/artifacts/worktrace.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/worktrace_failure_scenario.json",
      "schema_path": "schemas/artifacts/worktrace.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/real_agent_brief_parser_runtime.json",
      "schema_path": "schemas/artifacts/real_agent_brief_parser_runtime.schema.json",
      "validation": "schema",
      "status": "pass"
    },
    {
      "artifact_path": "outputs/real_agent_trace.json",
      "schema_path": "schemas/artifacts/real_agent_trace.schema.json",
      "validation": "schema",
      "status": "pass"
    }
  ],
  "errors": [],
  "limitations": [
    "Schema validation checks structure and key governance states; it does not prove business factual correctness.",
    "JSON parse validation is not the same as Schema validation.",
    "Only mapped critical governance artifacts receive full Schema validation in this extension set.",
    "Workflow Execution Log is a retrospective artifact-derived log, not real production telemetry.",
    "Source authenticity and field-level claim evidence will be validated later in an Automatic Claim Trace Matrix.",
    "Current coverage is partial and must not be represented as 100% project Schema coverage."
  ]
}
```

- limitation: 报告入口，不是最终营销内容。

### ev_repro_008: Claim Trace output JSON root

- evidence_type: artifact_derived
- source_artifact: outputs/claim_trace_matrix.json
- source_json_pointer: 
- portfolio_section: Reproducibility
- displayed_value:

```json
{
  "meta": {
    "artifact_name": "claim_trace_matrix",
    "validation_extension": "Validation Extension C",
    "artifact_version": "0.1.0",
    "brief_id": "brief_demo_action_camera_001",
    "producer": "Deterministic Claim Trace Matrix Builder",
    "status": "needs_review",
    "workflow_version": "V2",
    "product_name": "运动相机",
    "generation_method": "deterministic_script_no_model_call",
    "notes": [
      "source_found only means the source field exists in a project artifact; it does not prove real-world truth.",
      "Downstream Agent artifacts are treated as references or governance decisions, not original fact proof."
    ]
  },
  "source_priority": {
    "factual_sources": [
      "original brief",
      "formal proof materials when provided"
    ],
    "governance_decision_sources": [
      "Human Approval",
      "Brand Compliance"
    ],
    "downstream_artifact_rule": "Downstream Agent artifacts can cite or transform claims but cannot prove original facts.",
    "mock_data_rule": "Mock or demo data cannot prove real business outcomes."
  },
  "claims": [
    {
      "claim_id": "claim_product_capability_001",
      "claim_category": "product_capability",
      "claim_summary": "Brief describes high-definition motion video and 360 recording support for the demo product.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/core_features/0/proof",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/core_features/0/proof",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/0/risk_boundary",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Downstream keeps proof requirements and avoids absolute superiority."
        },
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/0/blocking_rule",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Final copy and image prompts remain blocked until footage and specs are available."
        }
      ],
      "risk_level": "major",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Collect high-resolution footage, specifications, and review boundaries before final generation.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_product_capability_002",
      "claim_category": "product_capability",
      "claim_summary": "Brief describes post-capture reframing and multiple export ratios as product capabilities.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/core_features/1/proof",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/specs/export_formats",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/core_selling_point_priority/0/proof_status",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Downstream marks the capability as needing product demo proof."
        },
        {
          "artifact": "outputs/creative_copy_pack_outline.json",
          "json_pointer": "/data/creative_copy_pack_outline/2/selling_point_boundaries/1",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Copy outline keeps proof and confirmation boundaries."
        }
      ],
      "risk_level": "medium",
      "human_review_required": true,
      "compliance_decision": "needs_revision",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Provide product demo evidence for reframing and export workflow before public-facing use.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_product_capability_003",
      "claim_category": "product_capability",
      "claim_summary": "Brief describes motion stabilization for sports use cases.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/core_features/2/proof",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/specs/stabilization",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/2/proof_required/2",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Downstream requires test conditions."
        },
        {
          "artifact": "outputs/human_approval_record.json",
          "json_pointer": "/approval_items/2/decision",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Human approval keeps technical/performance claims blocked."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Provide stabilization test conditions and limits; do not imply unconditional stability.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_product_capability_004",
      "claim_category": "product_capability",
      "claim_summary": "Brief describes waterproof and durability-related outdoor coverage.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/core_features/3/proof",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/specs/waterproof",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/3/proof_required/0",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Downstream requires rating or test standard."
        },
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/1/blocking_rule",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Compliance blocks final generation until conditions are confirmed."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Provide waterproof rating, depth, duration, usage limits, and durability conditions.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_ai_capability_001",
      "claim_category": "ai_capability",
      "claim_summary": "Brief describes AI-assisted automatic editing that identifies moments and creates a short-video draft.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/core_features/4/proof",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/core_features/4/proof",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/4/risk_boundary",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Downstream limits the claim to assistance and efficiency."
        },
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/2/blocking_rule",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Compliance prevents outcome guarantees."
        }
      ],
      "risk_level": "major",
      "human_review_required": true,
      "compliance_decision": "needs_revision",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Provide AI editing workflow demo and editable-step explanation; avoid professional-result guarantees.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_usage_scenario_001",
      "claim_category": "usage_scenario",
      "claim_summary": "Brief includes cycling first-person recording as a usage scenario.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/usage_scenarios/0/context",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/usage_scenarios/0/desired_outcome",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/2/usage_scenarios/0",
          "reference_type": "direct_quote",
          "value_consistency": "consistent",
          "notes": "Downstream maps stabilization to cycling scenario."
        },
        {
          "artifact": "outputs/image_prompt_pack_outline.json",
          "json_pointer": "/data/visual_asset_structures/1/usage_scene",
          "reference_type": "paraphrase",
          "value_consistency": "consistent",
          "notes": "Visual outline uses scenario structure only, not final prompt text."
        }
      ],
      "risk_level": "major",
      "human_review_required": true,
      "compliance_decision": "approved_for_planning",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Keep as planning scenario until sample footage and safety review are available.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_usage_scenario_002",
      "claim_category": "usage_scenario",
      "claim_summary": "Brief includes travel check-in and city roaming as usage scenarios.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/usage_scenarios/1/context",
      "evidence_artifact": "data/sample_brief.json",
      "evidence_json_pointer": "/usage_scenarios/1/desired_outcome",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/selling_point_matrix.json",
          "json_pointer": "/data/feature_benefit_mapping/1/usage_scenarios/0",
          "reference_type": "direct_quote",
          "value_consistency": "consistent",
          "notes": "Downstream connects reframing to travel scenario."
        },
        {
          "artifact": "outputs/image_prompt_pack_outline.json",
          "json_pointer": "/data/visual_asset_structures/2/forbidden_elements/2",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Visual outline blocks guaranteed professional-looking outcomes."
        }
      ],
      "risk_level": "medium",
      "human_review_required": true,
      "compliance_decision": "approved_for_planning",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Keep scenario neutral and require sample authorization before final visual generation.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_visual_asset_authorization_001",
      "claim_category": "visual_asset_authorization",
      "claim_summary": "Brief lists product white-background image as a required asset, but no authorization proof is provided.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/required_assets/0",
      "evidence_artifact": null,
      "evidence_json_pointer": null,
      "evidence_status": "not_available",
      "downstream_artifacts": [
        {
          "artifact": "outputs/image_prompt_pack_outline.json",
          "json_pointer": "/data/visual_asset_structures/0/proof_materials_to_wait_for/2",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Visual outline waits for authorized product render or photo."
        },
        {
          "artifact": "outputs/human_approval_record.json",
          "json_pointer": "/approval_items/6/decision",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Human approval blocks asset authorization."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Provide product image authorization and usage scope before final image prompt or image generation.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_visual_asset_authorization_002",
      "claim_category": "visual_asset_authorization",
      "claim_summary": "Brief lists mobile App editing interface screenshots as required assets, but no authorization proof is provided.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/required_assets/3",
      "evidence_artifact": null,
      "evidence_json_pointer": null,
      "evidence_status": "not_available",
      "downstream_artifacts": [
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/5/required_evidence/2",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Compliance requires App screenshot authorization."
        },
        {
          "artifact": "outputs/human_approval_record.json",
          "json_pointer": "/revision_queue/2/required_action",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Revision queue requires asset authorization and source tracking."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Collect App screenshot authorization, source tracking, and permitted usage scope.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_visual_asset_authorization_003",
      "claim_category": "visual_asset_authorization",
      "claim_summary": "Compliance rules prohibit real brand Logo or unauthorized celebrity likeness in future visual outputs.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/compliance_rules/4",
      "evidence_artifact": "outputs/brand_compliance_report.json",
      "evidence_json_pointer": "/data/risk_items/5/blocking_rule",
      "evidence_status": "requires_human_verification",
      "downstream_artifacts": [
        {
          "artifact": "outputs/image_prompt_pack_outline.json",
          "json_pointer": "/data/visual_asset_structures/0/forbidden_elements/0",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Visual outline forbids real brand Logo."
        },
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/5/human_review_required",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Compliance requires human review for asset rights."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Confirm brand asset and likeness authorization or exclude those elements.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_compliance_or_safety_001",
      "claim_category": "compliance_or_safety",
      "claim_summary": "Brief prohibits absolute superiority and unconditional performance wording.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/do_not_claim/1",
      "evidence_artifact": "outputs/brand_compliance_report.json",
      "evidence_json_pointer": "/data/blocked_expression_rules/0/blocked_patterns/0",
      "evidence_status": "supported_by_provided_source",
      "downstream_artifacts": [
        {
          "artifact": "outputs/platform_strategy_plan.json",
          "json_pointer": "/data/upstream_artifact_inheritance/compliance_constraints/do_not_claim/1",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Platform strategy inherits prohibited absolute wording."
        },
        {
          "artifact": "outputs/creative_copy_pack_outline.json",
          "json_pointer": "/data/upstream_inheritance/compliance_constraints/do_not_claim/1",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Copy outline inherits prohibited absolute wording."
        }
      ],
      "risk_level": "major",
      "human_review_required": false,
      "compliance_decision": "approved_for_planning",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Keep blocked expression rules active in all future generation steps.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_compliance_or_safety_002",
      "claim_category": "compliance_or_safety",
      "claim_summary": "Brief requires competitor comparison to avoid attacks on specific competitor brands.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/do_not_claim/2",
      "evidence_artifact": "outputs/brand_compliance_report.json",
      "evidence_json_pointer": "/data/risk_items/4/blocking_rule",
      "evidence_status": "supported_by_provided_source",
      "downstream_artifacts": [
        {
          "artifact": "outputs/platform_strategy_plan.json",
          "json_pointer": "/data/channel_role_map/3/platform_constraints/1",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "JD strategy keeps category comparison neutral."
        },
        {
          "artifact": "outputs/creative_copy_pack_outline.json",
          "json_pointer": "/data/creative_copy_pack_outline/3/selling_point_boundaries/0",
          "reference_type": "risk_inheritance",
          "value_consistency": "consistent",
          "notes": "Copy outline blocks specific competitor attacks."
        }
      ],
      "risk_level": "major",
      "human_review_required": false,
      "compliance_decision": "approved_for_planning",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Use neutral category-level comparison only when evidence and legal review allow it.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_growth_or_business_outcome_001",
      "claim_category": "growth_or_business_outcome",
      "claim_summary": "Brief and downstream plans use CTR, CVR, GMV and related values as observation metrics, not promised outcomes.",
      "source_artifact": "data/sample_brief.json",
      "source_json_pointer": "/primary_kpis/0",
      "evidence_artifact": "outputs/growth_evaluation_report.json",
      "evidence_json_pointer": "/metric_results/4/data_source_type",
      "evidence_status": "derived_from_mock",
      "downstream_artifacts": [
        {
          "artifact": "outputs/growth_metrics_plan.json",
          "json_pointer": "/data/compliance_inheritance/metric_language_rule",
          "reference_type": "metric_observation",
          "value_consistency": "consistent",
          "notes": "Growth metrics plan limits metrics to observation and retrospective use."
        },
        {
          "artifact": "outputs/brand_compliance_report.json",
          "json_pointer": "/data/risk_items/3/blocking_rule",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "Compliance blocks business outcome guarantees."
        }
      ],
      "risk_level": "critical",
      "human_review_required": true,
      "compliance_decision": "blocked_for_final_generation",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Keep metrics as observation fields; do not claim real traffic, conversion, GMV, or sales improvements.",
      "source_exists": "source_found"
    },
    {
      "claim_id": "claim_growth_or_business_outcome_002",
      "claim_category": "growth_or_business_outcome",
      "claim_summary": "Growth evaluation reports workflow metrics from demo or unavailable sources rather than real production telemetry.",
      "source_artifact": "outputs/growth_evaluation_report.json",
      "source_json_pointer": "/data_quality_summary/data_source_type_rules/derived_from_mock",
      "evidence_artifact": "outputs/growth_evaluation_report.json",
      "evidence_json_pointer": "/metric_results/6/data_source_type",
      "evidence_status": "derived_from_mock",
      "downstream_artifacts": [
        {
          "artifact": "outputs/v2_final_report.json",
          "json_pointer": "/workflow_difference_note/important_distinction",
          "reference_type": "governance_decision",
          "value_consistency": "consistent",
          "notes": "V2 report confirms evaluation does not authorize final generation or release."
        },
        {
          "artifact": "outputs/growth_evaluation_report.json",
          "json_pointer": "/evaluation_scope/does_not_evaluate_as_real_business_results/0",
          "reference_type": "metric_observation",
          "value_consistency": "consistent",
          "notes": "Evaluation scope excludes real CTR uplift proof."
        }
      ],
      "risk_level": "major",
      "human_review_required": true,
      "compliance_decision": "approved_for_evaluation_only",
      "release_gate_effect": {
        "structured_planning_package": "approved",
        "growth_evaluation": "approved_for_evaluation_only",
        "final_marketing_copy": "blocked",
        "final_image_prompt": "blocked",
        "image_generation": "blocked",
        "frontend_page": "blocked",
        "public_release": "blocked"
      },
      "required_action": "Label demo/mock measurements clearly and require real campaign data before any business-result claim.",
      "source_exists": "source_found"
    }
  ],
  "summary": {
    "claim_total": 14,
    "claim_category_counts": {
      "product_capability": 4,
      "ai_capability": 1,
      "usage_scenario": 2,
      "visual_asset_authorization": 3,
      "compliance_or_safety": 2,
      "growth_or_business_outcome": 2
    },
    "source_exists_counts": {
      "source_found": 14
    },
    "evidence_status_counts": {
      "requires_human_verification": 8,
      "not_available": 2,
      "supported_by_provided_source": 2,
      "derived_from_mock": 2
    },
    "risk_level_counts": {
      "major": 6,
      "medium": 2,
      "critical": 6
    },
    "human_review_required_count": 12,
    "file_checks": {
      "total": 67,
      "passed": 67,
      "failed": 0
    },
    "json_pointer_checks": {
      "total": 54,
      "passed": 54,
      "failed": 0
    },
    "category_coverage_ok": true,
    "key_files_ok": true,
    "key_pointers_ok": true,
    "release_gates_preserved": true,
    "check_log": [
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "docs/claim_trace_matrix_spec.md",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "schemas/artifacts/claim_trace_matrix.schema.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/standardized_brief_summary.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/platform_strategy_plan.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/creative_copy_pack_outline.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/image_prompt_pack_outline.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/growth_metrics_plan.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/human_approval_record.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/growth_evaluation_report.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "required_input_file",
        "claim_id": null,
        "target": "outputs/v2_final_report.json",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_product_capability_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_product_capability_001",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/0/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_product_capability_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_product_capability_001",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/0/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_001",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_001",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/0/risk_boundary",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_001",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_001",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/0/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_product_capability_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_product_capability_002",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/1/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_product_capability_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_product_capability_002",
        "artifact": "data/sample_brief.json",
        "target": "/specs/export_formats",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_002",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_002",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/core_selling_point_priority/0/proof_status",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_002",
        "target": "outputs/creative_copy_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_002",
        "artifact": "outputs/creative_copy_pack_outline.json",
        "target": "/data/creative_copy_pack_outline/2/selling_point_boundaries/1",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_product_capability_003",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_product_capability_003",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/2/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_product_capability_003",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_product_capability_003",
        "artifact": "data/sample_brief.json",
        "target": "/specs/stabilization",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_003",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_003",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/2/proof_required/2",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_003",
        "target": "outputs/human_approval_record.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_003",
        "artifact": "outputs/human_approval_record.json",
        "target": "/approval_items/2/decision",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_product_capability_004",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_product_capability_004",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/3/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_product_capability_004",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_product_capability_004",
        "artifact": "data/sample_brief.json",
        "target": "/specs/waterproof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_004",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_004",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/3/proof_required/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_product_capability_004",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_product_capability_004",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/1/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_ai_capability_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_ai_capability_001",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/4/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_ai_capability_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_ai_capability_001",
        "artifact": "data/sample_brief.json",
        "target": "/core_features/4/proof",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_ai_capability_001",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_ai_capability_001",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/4/risk_boundary",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_ai_capability_001",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_ai_capability_001",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/2/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_usage_scenario_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_usage_scenario_001",
        "artifact": "data/sample_brief.json",
        "target": "/usage_scenarios/0/context",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_usage_scenario_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_usage_scenario_001",
        "artifact": "data/sample_brief.json",
        "target": "/usage_scenarios/0/desired_outcome",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_usage_scenario_001",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_usage_scenario_001",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/2/usage_scenarios/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_usage_scenario_001",
        "target": "outputs/image_prompt_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_usage_scenario_001",
        "artifact": "outputs/image_prompt_pack_outline.json",
        "target": "/data/visual_asset_structures/1/usage_scene",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_usage_scenario_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_usage_scenario_002",
        "artifact": "data/sample_brief.json",
        "target": "/usage_scenarios/1/context",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_usage_scenario_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_usage_scenario_002",
        "artifact": "data/sample_brief.json",
        "target": "/usage_scenarios/1/desired_outcome",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_usage_scenario_002",
        "target": "outputs/selling_point_matrix.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_usage_scenario_002",
        "artifact": "outputs/selling_point_matrix.json",
        "target": "/data/feature_benefit_mapping/1/usage_scenarios/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_usage_scenario_002",
        "target": "outputs/image_prompt_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_usage_scenario_002",
        "artifact": "outputs/image_prompt_pack_outline.json",
        "target": "/data/visual_asset_structures/2/forbidden_elements/2",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_visual_asset_authorization_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_visual_asset_authorization_001",
        "artifact": "data/sample_brief.json",
        "target": "/required_assets/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_visual_asset_authorization_001",
        "target": null,
        "passed": true,
        "skipped": true,
        "note": "null is allowed for missing source/evidence"
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_visual_asset_authorization_001",
        "target": null,
        "artifact": null,
        "passed": true,
        "skipped": true,
        "note": "null is allowed for missing source/evidence"
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_001",
        "target": "outputs/image_prompt_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_001",
        "artifact": "outputs/image_prompt_pack_outline.json",
        "target": "/data/visual_asset_structures/0/proof_materials_to_wait_for/2",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_001",
        "target": "outputs/human_approval_record.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_001",
        "artifact": "outputs/human_approval_record.json",
        "target": "/approval_items/6/decision",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_visual_asset_authorization_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_visual_asset_authorization_002",
        "artifact": "data/sample_brief.json",
        "target": "/required_assets/3",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_visual_asset_authorization_002",
        "target": null,
        "passed": true,
        "skipped": true,
        "note": "null is allowed for missing source/evidence"
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_visual_asset_authorization_002",
        "target": null,
        "artifact": null,
        "passed": true,
        "skipped": true,
        "note": "null is allowed for missing source/evidence"
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_002",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_002",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/5/required_evidence/2",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_002",
        "target": "outputs/human_approval_record.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_002",
        "artifact": "outputs/human_approval_record.json",
        "target": "/revision_queue/2/required_action",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_visual_asset_authorization_003",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_visual_asset_authorization_003",
        "artifact": "data/sample_brief.json",
        "target": "/compliance_rules/4",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_visual_asset_authorization_003",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_visual_asset_authorization_003",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/5/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_003",
        "target": "outputs/image_prompt_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_003",
        "artifact": "outputs/image_prompt_pack_outline.json",
        "target": "/data/visual_asset_structures/0/forbidden_elements/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_visual_asset_authorization_003",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_visual_asset_authorization_003",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/5/human_review_required",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_compliance_or_safety_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_compliance_or_safety_001",
        "artifact": "data/sample_brief.json",
        "target": "/do_not_claim/1",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_compliance_or_safety_001",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_compliance_or_safety_001",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/blocked_expression_rules/0/blocked_patterns/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_compliance_or_safety_001",
        "target": "outputs/platform_strategy_plan.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_compliance_or_safety_001",
        "artifact": "outputs/platform_strategy_plan.json",
        "target": "/data/upstream_artifact_inheritance/compliance_constraints/do_not_claim/1",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_compliance_or_safety_001",
        "target": "outputs/creative_copy_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_compliance_or_safety_001",
        "artifact": "outputs/creative_copy_pack_outline.json",
        "target": "/data/upstream_inheritance/compliance_constraints/do_not_claim/1",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_compliance_or_safety_002",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_compliance_or_safety_002",
        "artifact": "data/sample_brief.json",
        "target": "/do_not_claim/2",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_compliance_or_safety_002",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_compliance_or_safety_002",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/4/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_compliance_or_safety_002",
        "target": "outputs/platform_strategy_plan.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_compliance_or_safety_002",
        "artifact": "outputs/platform_strategy_plan.json",
        "target": "/data/channel_role_map/3/platform_constraints/1",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_compliance_or_safety_002",
        "target": "outputs/creative_copy_pack_outline.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_compliance_or_safety_002",
        "artifact": "outputs/creative_copy_pack_outline.json",
        "target": "/data/creative_copy_pack_outline/3/selling_point_boundaries/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_growth_or_business_outcome_001",
        "target": "data/sample_brief.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_001",
        "artifact": "data/sample_brief.json",
        "target": "/primary_kpis/0",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_growth_or_business_outcome_001",
        "target": "outputs/growth_evaluation_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_001",
        "artifact": "outputs/growth_evaluation_report.json",
        "target": "/metric_results/4/data_source_type",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_growth_or_business_outcome_001",
        "target": "outputs/growth_metrics_plan.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_001",
        "artifact": "outputs/growth_metrics_plan.json",
        "target": "/data/compliance_inheritance/metric_language_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_growth_or_business_outcome_001",
        "target": "outputs/brand_compliance_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_001",
        "artifact": "outputs/brand_compliance_report.json",
        "target": "/data/risk_items/3/blocking_rule",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_source_artifact",
        "claim_id": "claim_growth_or_business_outcome_002",
        "target": "outputs/growth_evaluation_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_source_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_002",
        "artifact": "outputs/growth_evaluation_report.json",
        "target": "/data_quality_summary/data_source_type_rules/derived_from_mock",
        "passed": true
      },
      {
        "kind": "file",
        "role": "claim_evidence_artifact",
        "claim_id": "claim_growth_or_business_outcome_002",
        "target": "outputs/growth_evaluation_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "claim_evidence_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_002",
        "artifact": "outputs/growth_evaluation_report.json",
        "target": "/metric_results/6/data_source_type",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_growth_or_business_outcome_002",
        "target": "outputs/v2_final_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_002",
        "artifact": "outputs/v2_final_report.json",
        "target": "/workflow_difference_note/important_distinction",
        "passed": true
      },
      {
        "kind": "file",
        "role": "downstream_artifact",
        "claim_id": "claim_growth_or_business_outcome_002",
        "target": "outputs/growth_evaluation_report.json",
        "passed": true
      },
      {
        "kind": "json_pointer",
        "role": "downstream_json_pointer",
        "claim_id": "claim_growth_or_business_outcome_002",
        "artifact": "outputs/growth_evaluation_report.json",
        "target": "/evaluation_scope/does_not_evaluate_as_real_business_results/0",
        "passed": true
      }
    ]
  },
  "release_gates": {
    "structured_planning_package": "approved",
    "growth_evaluation": "approved_for_evaluation_only",
    "final_marketing_copy": "blocked",
    "final_image_prompt": "blocked",
    "image_generation": "blocked",
    "frontend_page": "blocked",
    "public_release": "blocked"
  },
  "limitations": [
    "Schema and pointer validation do not prove product facts in reality.",
    "Schema and pointer validation do not prove legal authorization for brands, logos, likenesses, product images, App screenshots, or scene materials.",
    "Visual quality and aesthetic suitability require human judgment.",
    "CTR, CVR, GMV, traffic, conversion, sales, and other business outcomes are not proven by mock or demo data.",
    "The demo product name remains 运动相机 and no removed parameter terms are restored as the product name."
  ]
}
```

- limitation: 声明追踪矩阵不是正式证明材料库。

### ev_repro_009: Workflow Trace output JSON root

- evidence_type: artifact_derived
- source_artifact: outputs/workflow_execution_log.json
- source_json_pointer: 
- portfolio_section: Reproducibility
- displayed_value:

```json
{
  "meta": {
    "artifact_name": "workflow_execution_log",
    "artifact_version": "0.1.0",
    "validation_extension": "Validation Extension B",
    "schema_draft": "2020-12",
    "brief_id": "brief_demo_action_camera_001",
    "workflow_version": "V2",
    "project_name": "E-commerce Growth Agent Studio",
    "project_name_cn": "电商增长 Agent 工作台",
    "status": "pass",
    "log_type": "retrospective_artifact_derived_log",
    "telemetry_type": "not_runtime_telemetry",
    "log_build_started_at": "2026-07-16T07:38:49.399Z",
    "log_build_completed_at": "2026-07-16T07:38:49.400Z",
    "log_build_duration_ms": 1,
    "log_generated_at": "2026-07-16T07:38:49.400Z",
    "builder_script": "scripts/build_workflow_execution_log.mjs",
    "builder_exit_code": 0
  },
  "workflow_summary": {
    "covered_steps": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "node_count": 15,
    "timing_policy": "Steps 1-15 are historical nodes; node-level timing is unavailable and must remain null with historical_not_available evidence.",
    "steps_1_to_15_rerun": false,
    "input_file_checks": {
      "total": 81,
      "passed": 81,
      "failed": 0
    },
    "output_file_checks": {
      "total": 30,
      "passed": 30,
      "failed": 0
    },
    "historical_not_available_node_count": 15,
    "measured_node_time_count": 0
  },
  "nodes": [
    {
      "step": 1,
      "node_id": "step_01_standard_product_brief_input",
      "node_name": "Standard Product Brief Input",
      "node_type": "input_artifact",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；README 当前进度",
      "governance_status": "needs_review",
      "governance_status_source": "workflow/agent_workflow.md 输入与前置校验；schemas/product_brief.schema.json 约束；后续节点继承 needs_review",
      "input_files": [
        {
          "path": "docs/product_brief_input_template.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "No final generation release; blocked gates unchanged."
      }
    },
    {
      "step": 2,
      "node_id": "step_02_workflow_schema_io_contract_specification",
      "node_name": "Workflow / Schema / I/O Contract Specification",
      "node_type": "specification",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；workflow/agent_io_contracts.md",
      "governance_status": "not_applicable",
      "governance_status_source": "workflow/agent_io_contracts.md 通用契约 and status rules",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "schemas/product_brief.schema.json",
          "exists": true
        },
        {
          "path": "workflow/agent_workflow.md",
          "exists": true
        },
        {
          "path": "workflow/agent_io_contracts.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Defines status and workflow rules only; blocked gates unchanged."
      }
    },
    {
      "step": 3,
      "node_id": "step_03_brief_parser_agent",
      "node_name": "Brief Parser Agent",
      "node_type": "agent",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Brief Parser Agent]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/standardized_brief_summary.json status=needs_review",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "schemas/product_brief.schema.json",
          "exists": true
        },
        {
          "path": "prompts/brief_parser.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "outputs/brief_parser_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "No release permission; downstream review state preserved."
      }
    },
    {
      "step": 4,
      "node_id": "step_04_audience_insight_skill",
      "node_name": "Audience Insight Skill",
      "node_type": "skill",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Audience Insight Skill]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/audience_insight.json status=needs_review",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "prompts/audience_insight.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "outputs/audience_insight_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "No release permission; downstream review state preserved."
      }
    },
    {
      "step": 5,
      "node_id": "step_05_selling_point_analyst_agent",
      "node_name": "Selling Point Analyst Agent",
      "node_type": "agent",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Selling Point Analyst Agent]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/selling_point_matrix.json status=needs_review",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "prompts/selling_point_analyst.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Unsupported claims remain review-gated; blocked gates unchanged."
      }
    },
    {
      "step": 6,
      "node_id": "step_06_platform_strategy_skill",
      "node_name": "Platform Strategy Skill",
      "node_type": "skill",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Platform Strategy Skill]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/platform_strategy_plan.json status=needs_review",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "prompts/platform_strategy.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "outputs/platform_strategy_plan.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "KPI language remains observational; blocked gates unchanged."
      }
    },
    {
      "step": 7,
      "node_id": "step_07_creative_copy_agent",
      "node_name": "Creative Copy Agent",
      "node_type": "agent",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Creative Copy Agent]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/creative_copy_pack_outline.json status=needs_review",
      "input_files": [
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "prompts/creative_copy_agent.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Produced structure only; final marketing copy remains blocked."
      }
    },
    {
      "step": 8,
      "node_id": "step_08_image_prompt_skill",
      "node_name": "Image Prompt Skill",
      "node_type": "skill",
      "execution_status": "historical_completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Progress: Step 1-8 已完成；outputs/v2_final_report.json artifact_index.v1_artifacts[Image Prompt Skill]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/image_prompt_pack_outline.json status=needs_review",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "prompts/image_prompt_skill.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/image_prompt_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/image_prompt_pack_outline.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Produced visual structure only; final image prompt and image generation remain blocked."
      }
    },
    {
      "step": 9,
      "node_id": "step_09_brand_compliance_agent",
      "node_name": "Brand Compliance Agent",
      "node_type": "agent",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 9 Completion Notes",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json compliance_summary.status=needs_review and blocked final generation fields; outputs/brand_compliance_report.json",
      "input_files": [
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/image_prompt_pack_outline.json",
          "exists": true
        },
        {
          "path": "prompts/brand_compliance_agent.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Final marketing copy, final image prompt, image generation and public release remain blocked."
      }
    },
    {
      "step": 10,
      "node_id": "step_10_growth_metrics_agent",
      "node_name": "Growth Metrics Agent",
      "node_type": "agent",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 10 Completion Notes",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/growth_metrics_plan.json status=needs_review",
      "input_files": [
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/image_prompt_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "prompts/growth_metrics_agent.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/growth_metrics_plan.json",
          "exists": true
        },
        {
          "path": "outputs/growth_metrics_plan.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Growth metrics remain observational; no business outcome promise; blocked gates unchanged."
      }
    },
    {
      "step": 11,
      "node_id": "step_11_creative_package_reporter",
      "node_name": "Creative Package Reporter",
      "node_type": "report_generator",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 11 Completion Notes",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json artifact_index.v1_artifacts: outputs/final_creative_package_report.json status=needs_review",
      "input_files": [
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/image_prompt_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "outputs/growth_metrics_plan.json",
          "exists": true
        },
        {
          "path": "prompts/creative_package_reporter.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/final_creative_package_report.json",
          "exists": true
        },
        {
          "path": "outputs/final_creative_package_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Summarizes V1 only; final generation and public release remain blocked."
      }
    },
    {
      "step": 12,
      "node_id": "step_12_planner_agent",
      "node_name": "Planner Agent",
      "node_type": "agent",
      "execution_status": "completed_revised",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 12 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Planner Agent] status=completed_revised",
      "governance_status": "not_applicable",
      "governance_status_source": "Planner 只负责工作流规划和路由，不独立作出审批或发布决定；现有 blocked release gates 由 Brand Compliance、Human Approval 和 Growth Evaluation 继承控制。",
      "input_files": [
        {
          "path": "PROJECT_MEMORY_FOR_OPENCLAW.md",
          "exists": true
        },
        {
          "path": "workflow/agent_workflow.md",
          "exists": true
        },
        {
          "path": "workflow/agent_io_contracts.md",
          "exists": true
        },
        {
          "path": "outputs/standardized_brief_summary.json",
          "exists": true
        },
        {
          "path": "outputs/audience_insight.json",
          "exists": true
        },
        {
          "path": "outputs/selling_point_matrix.json",
          "exists": true
        },
        {
          "path": "outputs/platform_strategy_plan.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/image_prompt_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "outputs/growth_metrics_plan.json",
          "exists": true
        },
        {
          "path": "outputs/final_creative_package_report.json",
          "exists": true
        },
        {
          "path": "prompts/planner_agent.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/planner_execution_plan.json",
          "exists": true
        },
        {
          "path": "outputs/planner_execution_plan.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Preserves blocked gates and states that planning does not authorize final generation."
      }
    },
    {
      "step": 13,
      "node_id": "step_13_human_approval_node",
      "node_name": "Human Approval Node",
      "node_type": "approval_node",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 13 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Human Approval Node]",
      "governance_status": "needs_revision",
      "governance_status_source": "outputs/human_approval_record.json meta.status=needs_revision; approval_summary.overall_decision=needs_revision; release_gates",
      "input_files": [
        {
          "path": "outputs/planner_execution_plan.json",
          "exists": true
        },
        {
          "path": "outputs/creative_copy_pack_outline.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "data/sample_brief.json",
          "exists": true
        },
        {
          "path": "prompts/human_approval_node.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/human_approval_record.json",
          "exists": true
        },
        {
          "path": "outputs/human_approval_record.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Structured planning and growth evaluation are allowed for evaluation; final generation and public release remain blocked."
      }
    },
    {
      "step": 14,
      "node_id": "step_14_growth_evaluation_agent",
      "node_name": "Growth Evaluation Agent",
      "node_type": "evaluation_agent",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 14 Completion Notes; outputs/v2_final_report.json artifact_index.v2_artifacts[Growth Evaluation Agent]",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/growth_evaluation_report.json meta.status=needs_review; human_approval_inheritance; release_gates",
      "input_files": [
        {
          "path": "outputs/planner_execution_plan.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "outputs/human_approval_record.json",
          "exists": true
        },
        {
          "path": "outputs/growth_metrics_plan.json",
          "exists": true
        },
        {
          "path": "outputs/final_creative_package_report.json",
          "exists": true
        },
        {
          "path": "docs/evaluation_metrics_test_plan.md",
          "exists": true
        },
        {
          "path": "data/evaluation_metrics_sample.csv",
          "exists": true
        },
        {
          "path": "data/audit_log_sample.json",
          "exists": true
        },
        {
          "path": "prompts/growth_evaluation_agent.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/growth_evaluation_report.json",
          "exists": true
        },
        {
          "path": "outputs/growth_evaluation_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Confirms evaluation status only; final marketing copy, final image prompt, image generation and public release remain blocked."
      }
    },
    {
      "step": 15,
      "node_id": "step_15_v2_final_report_generator",
      "node_name": "V2 Final Report Generator",
      "node_type": "report_generator",
      "execution_status": "completed",
      "execution_status_source": "PROJECT_MEMORY_FOR_OPENCLAW.md Step 15 Completion Notes; outputs/v2_final_report.json meta.artifact_name=v2_final_report",
      "governance_status": "needs_review",
      "governance_status_source": "outputs/v2_final_report.json meta.status=needs_review; final_conclusion.overall_status=needs_review; release_gates",
      "input_files": [
        {
          "path": "PROJECT_MEMORY_FOR_OPENCLAW.md",
          "exists": true
        },
        {
          "path": "README.md",
          "exists": true
        },
        {
          "path": "outputs/final_creative_package_report.json",
          "exists": true
        },
        {
          "path": "outputs/planner_execution_plan.json",
          "exists": true
        },
        {
          "path": "outputs/human_approval_record.json",
          "exists": true
        },
        {
          "path": "outputs/growth_evaluation_report.json",
          "exists": true
        },
        {
          "path": "outputs/brand_compliance_report.json",
          "exists": true
        },
        {
          "path": "prompts/v2_final_report_generator.md",
          "exists": true
        }
      ],
      "output_files": [
        {
          "path": "outputs/v2_final_report.json",
          "exists": true
        },
        {
          "path": "outputs/v2_final_report.md",
          "exists": true
        }
      ],
      "missing_input_files": [],
      "missing_output_files": [],
      "started_at": null,
      "completed_at": null,
      "duration_ms": null,
      "timing_evidence_type": "historical_not_available",
      "timestamp_source": "none",
      "release_gate_effect": {
        "changes_release_gates": false,
        "blocked_gates_preserved": true,
        "notes": "Final report summarizes but does not authorize final marketing copy, final image prompt, image generation, frontend page or public release."
      }
    }
  ],
  "release_gates": {
    "structured_planning_package": "approved",
    "growth_evaluation": "approved_for_evaluation_only",
    "final_marketing_copy": "blocked",
    "final_image_prompt": "blocked",
    "image_generation": "blocked",
    "frontend_page": "blocked",
    "public_release": "blocked"
  },
  "artifact_existence_summary": {
    "checked_files": [
      {
        "path": "docs/product_brief_input_template.md",
        "exists": true
      },
      {
        "path": "data/sample_brief.json",
        "exists": true
      },
      {
        "path": "schemas/product_brief.schema.json",
        "exists": true
      },
      {
        "path": "workflow/agent_workflow.md",
        "exists": true
      },
      {
        "path": "workflow/agent_io_contracts.md",
        "exists": true
      },
      {
        "path": "prompts/brief_parser.md",
        "exists": true
      },
      {
        "path": "outputs/standardized_brief_summary.json",
        "exists": true
      },
      {
        "path": "outputs/brief_parser_report.md",
        "exists": true
      },
      {
        "path": "prompts/audience_insight.md",
        "exists": true
      },
      {
        "path": "outputs/audience_insight.json",
        "exists": true
      },
      {
        "path": "outputs/audience_insight_report.md",
        "exists": true
      },
      {
        "path": "prompts/selling_point_analyst.md",
        "exists": true
      },
      {
        "path": "outputs/selling_point_matrix.json",
        "exists": true
      },
      {
        "path": "outputs/selling_point_matrix.md",
        "exists": true
      },
      {
        "path": "prompts/platform_strategy.md",
        "exists": true
      },
      {
        "path": "outputs/platform_strategy_plan.json",
        "exists": true
      },
      {
        "path": "outputs/platform_strategy_plan.md",
        "exists": true
      },
      {
        "path": "prompts/creative_copy_agent.md",
        "exists": true
      },
      {
        "path": "outputs/creative_copy_pack_outline.json",
        "exists": true
      },
      {
        "path": "outputs/creative_copy_pack_outline.md",
        "exists": true
      },
      {
        "path": "prompts/image_prompt_skill.md",
        "exists": true
      },
      {
        "path": "outputs/image_prompt_pack_outline.json",
        "exists": true
      },
      {
        "path": "outputs/image_prompt_pack_outline.md",
        "exists": true
      },
      {
        "path": "prompts/brand_compliance_agent.md",
        "exists": true
      },
      {
        "path": "outputs/brand_compliance_report.json",
        "exists": true
      },
      {
        "path": "outputs/brand_compliance_report.md",
        "exists": true
      },
      {
        "path": "prompts/growth_metrics_agent.md",
        "exists": true
      },
      {
        "path": "outputs/growth_metrics_plan.json",
        "exists": true
      },
      {
        "path": "outputs/growth_metrics_plan.md",
        "exists": true
      },
      {
        "path": "prompts/creative_package_reporter.md",
        "exists": true
      },
      {
        "path": "outputs/final_creative_package_report.json",
        "exists": true
      },
      {
        "path": "outputs/final_creative_package_report.md",
        "exists": true
      },
      {
        "path": "PROJECT_MEMORY_FOR_OPENCLAW.md",
        "exists": true
      },
      {
        "path": "prompts/planner_agent.md",
        "exists": true
      },
      {
        "path": "outputs/planner_execution_plan.json",
        "exists": true
      },
      {
        "path": "outputs/planner_execution_plan.md",
        "exists": true
      },
      {
        "path": "prompts/human_approval_node.md",
        "exists": true
      },
      {
        "path": "outputs/human_approval_record.json",
        "exists": true
      },
      {
        "path": "outputs/human_approval_record.md",
        "exists": true
      },
      {
        "path": "docs/evaluation_metrics_test_plan.md",
        "exists": true
      },
      {
        "path": "data/evaluation_metrics_sample.csv",
        "exists": true
      },
      {
        "path": "data/audit_log_sample.json",
        "exists": true
      },
      {
        "path": "prompts/growth_evaluation_agent.md",
        "exists": true
      },
      {
        "path": "outputs/growth_evaluation_report.json",
        "exists": true
      },
      {
        "path": "outputs/growth_evaluation_report.md",
        "exists": true
      },
      {
        "path": "README.md",
        "exists": true
      },
      {
        "path": "prompts/v2_final_report_generator.md",
        "exists": true
      },
      {
        "path": "outputs/v2_final_report.json",
        "exists": true
      },
      {
        "path": "outputs/v2_final_report.md",
        "exists": true
      }
    ],
    "missing_input_files": [],
    "missing_output_files": [],
    "input_files": {
      "total": 81,
      "passed": 81,
      "failed": 0
    },
    "output_files": {
      "total": 30,
      "passed": 30,
      "failed": 0
    },
    "blocked_future_assets_not_counted_as_missing": [
      "final marketing copy",
      "final image prompt",
      "image",
      "frontend page",
      "public release asset"
    ]
  },
  "limitations": [
    "This is a retrospective artifact-derived log, not real runtime telemetry.",
    "Node-level started_at, completed_at and duration_ms are intentionally null for all historical Steps 1-15.",
    "File existence is used as artifact evidence, but file modification time is not used as execution timing evidence.",
    "Chat timestamps, report created_at values and estimated durations are not used as node execution timestamps.",
    "Release gates remain blocked for final marketing copy, final image prompt, image generation, frontend page and public release."
  ]
}
```

- limitation: 执行追踪来自历史 artifact，不是真实 per-node runtime。

### ev_repro_010: Portfolio Evidence Pack Spec

- evidence_type: artifact_derived
- source_artifact: docs/portfolio_evidence_pack_spec.md
- source_json_pointer: n/a_markdown_section
- portfolio_section: Reproducibility
- displayed_value:

```json
"Portfolio Evidence Pack Spec defines the evidence fields, evidence types, traceability rules, limitations, reproducibility entries, and blocked release gate preservation rules."
```

- limitation: Spec 定义证据包结构和边界，不生成营销内容。

### ev_repro_two_stage_001: 双阶段验证脚本 producer

- evidence_type: deterministic_verified
- source_artifact: outputs/two_stage_compliance_validation_report.json
- source_json_pointer: /meta/producer
- portfolio_section: Reproducibility
- displayed_value:

```json
"validate_two_stage_compliance.mjs"
```

- limitation: 验证脚本为确定性脚本，不调用大模型。

### ev_worktrace_repro_001: node scripts/build_worktrace.mjs

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace.json
- source_json_pointer: /trace_summary/artifact_trace_key
- portfolio_section: Reproducibility
- displayed_value:

```json
"node scripts/build_worktrace.mjs"
```

- limitation: 构建历史 WorkTrace，不生成最终营销内容。

### ev_worktrace_repro_002: node scripts/build_failure_worktrace.mjs

- evidence_type: deterministic_verified
- source_artifact: outputs/worktrace_failure_scenario.json
- source_json_pointer: /trace_summary/artifact_trace_key
- portfolio_section: Reproducibility
- displayed_value:

```json
"node scripts/build_failure_worktrace.mjs"
```

- limitation: 构建 Failure Scenario WorkTrace，不调用 Planner 或模型。

### ev_worktrace_repro_003: node scripts/build_portfolio_evidence_pack.mjs

- evidence_type: deterministic_verified
- source_artifact: outputs/portfolio_evidence_pack.json
- source_json_pointer: /meta/artifact_name
- portfolio_section: Reproducibility
- displayed_value:

```json
"node scripts/build_portfolio_evidence_pack.mjs"
```

- limitation: 刷新证据包，不解除 release gates。

### ev_worktrace_repro_004: node scripts/validate_artifacts.mjs

- evidence_type: deterministic_verified
- source_artifact: outputs/artifact_validation_report.json
- source_json_pointer: /meta/script_path
- portfolio_section: Reproducibility
- displayed_value:

```json
"node scripts/validate_artifacts.mjs"
```

- limitation: 统一 JSON/Schema 验证，不证明治理通过。

### ev_runtime_repro_001: node scripts/run_instrumented_workflow.mjs

- evidence_type: deterministic_verified
- source_artifact: outputs/runtime_execution.json
- source_json_pointer: /run_id
- portfolio_section: Reproducibility
- displayed_value:

```json
"node scripts/run_instrumented_workflow.mjs"
```

- limitation: 运行本地插桩 Runtime Runner 并生成 Runtime 记录；不调用实时模型、不生成营销文案、不解除 release gates。

## Boundary Notes

- `source_found` only means a source field exists; it does not prove real-world truth.
- Schema pass only validates structure and selected governance constraints.
- File existence does not prove factual correctness.
- Mock, estimated, not_available, and human_review_required evidence must remain labeled.
- Blocked release gates remain unchanged.
