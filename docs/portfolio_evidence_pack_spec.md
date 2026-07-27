# Portfolio Evidence Pack Spec

本文件定义 Portfolio Evidence Pack 的取证范围、证据字段、证据类型和展示边界。它不是 Step 16，不是新的 Agent 节点，不重跑或修改 Steps 1-15；它只规定后续作品集证据包应如何汇总已经存在的项目产物。

## 0. Scope and Non-goals

### Scope

- 汇总 E-commerce Growth Agent Studio / 电商增长 Agent 工作台的作品集证据。
- 只使用现有 artifact、报告、验证结果、执行追踪和声明追踪矩阵。
- Demo 商品名称只使用“运动相机”。
- 保留现有 blocked release gates。

### Non-goals

- 不生成最终 Portfolio Evidence Pack。
- 不创建 JSON Schema。
- 不创建脚本。
- 不更新 README 或导航。
- 不修改任何上游文件。
- 不生成营销内容、图片 Prompt、图片或前端。
- 不声称真实提升、生产可用或客户验证完成。

## 1. Evidence Record Contract

Portfolio Evidence Pack 中每一项证据必须使用以下字段：

| 字段 | 必填 | 定义 |
| --- | --- | --- |
| `evidence_id` | 是 | 稳定证据编号，例如 `ev_project_overview_001`。 |
| `evidence_title` | 是 | 面向作品集读者的人类可读标题。 |
| `evidence_type` | 是 | 证据类型，必须来自本文定义的 Evidence Type Vocabulary。 |
| `source_artifact` | 是 | 证据来源文件路径。 |
| `source_json_pointer` | 是 | JSON 证据必须填写 JSON Pointer；Markdown 证据可写章节锚点或 `n/a_markdown_section`。 |
| `displayed_value` | 是 | 作品集中允许展示的值；所有数字必须与来源字段一致。 |
| `limitation` | 是 | 该证据不能证明什么，尤其是 mock、estimated、not_available、source_found 的边界。 |
| `portfolio_section` | 是 | 对应本文第 2-11 节之一。 |

### Evidence Type Vocabulary

| evidence_type | 用途 | 展示规则 |
| --- | --- | --- |
| `measured` | 当前 workspace 中可直接检查的文件存在、JSON 解析、明确 release gate 字段等。 | 可以展示为当前项目 artifact 证据；不能外推为真实业务效果。 |
| `deterministic_verified` | 由确定性脚本或 JSON Schema 验证得到的结果。 | 必须带脚本路径、报告路径、退出码或验证字段。 |
| `artifact_derived` | 从已有 artifact 汇总或派生出的证据，例如 workflow log 的节点覆盖。 | 必须说明来自历史 artifact，不是真实 runtime telemetry。 |
| `derived_from_mock` | 从 mock CSV、mock audit log 或 demo 数据派生的证据。 | 必须明确 mock 数据不能证明真实业务效果。 |
| `estimated` | 来自 Demo 假设或估算的时间、效率等。 | 必须明确不能写成真实提升。 |
| `human_review_required` | 需要人工审核、授权或正式证明材料才能成立的证据。 | 不能展示为已被现实证明。 |
| `not_available` | 当前缺少可靠来源、标注分母、真实日志或授权证明。 | 必须展示为缺口，不得补造。 |

### Traceability Rules

- 所有数字必须能追溯到具体 `source_artifact` 和 `source_json_pointer`。
- `source_found` 只代表来源字段存在，不代表现实事实已经证明。
- Agent 下游产物可以作为引用、转换或治理决策证据，不能反向证明原始事实。
- `mock`、`estimated`、`not_available` 必须在 `evidence_type` 或 `limitation` 中明确标注。
- Claim Trace 中的事实性声明优先以 original brief 或正式证明材料为事实来源；Human Approval 和 Brand Compliance 是治理决策来源。

## 2. Project Overview

本板块说明项目定位，不展示未经证明的业务效果。

必须覆盖：

- 项目定位：面向企业电商运营、品牌和内容增长团队的 ToB 多 Agent 工作流 Demo。
- 项目形态：ToB 电商 Agent 工作台。
- Demo 商品名称：只称为“运动相机”。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_project_overview_001` | 项目定位 | `artifact_derived` | `outputs/v2_final_report.json` | `/project_overview/positioning` | ToB multi-agent ecommerce growth workflow demo that turns product briefs into governed, auditable, reviewable and evaluable structured creative planning packages. | 这是项目定位，不代表生产系统上线。 | Project Overview |
| `ev_project_overview_002` | 中文项目名称 | `artifact_derived` | `outputs/v2_final_report.json` | `/meta/project_name_cn` | 电商增长 Agent 工作台 | 名称只说明作品集项目，不代表商业产品已发布。 | Project Overview |
| `ev_project_overview_003` | Demo 商品命名 | `artifact_derived` | `outputs/v2_final_report.json` | `/project_overview/demo_product` | 运动相机 | 只能使用该商品称呼，不能把参数词恢复为商品名称或事实承诺。 | Project Overview |

## 3. Business Problem

本板块解释电商运营原有耗时点，以及人工协作、内容一致性、合规和复盘问题。

必须覆盖：

- 商品资料整理、用户洞察、卖点提炼、平台适配、内容规划、合规确认和复盘之间的协作成本。
- 输入不统一、风险声明遗漏、来源追踪困难、复盘口径不统一等问题。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_business_problem_001` | 业务问题摘要 | `artifact_derived` | `outputs/v2_final_report.json` | `/business_problem/summary` | Enterprise ecommerce teams need a governed workflow for turning inconsistent product information into traceable creative planning artifacts while preventing unsupported claims, unauthorized assets and unverified business-result promises. | 这是问题定义，不是客户访谈或真实客户验证完成。 | Business Problem |
| `ev_business_problem_002` | 问题清单 | `artifact_derived` | `outputs/v2_final_report.json` | `/business_problem/problems` | 输入不统一、交接成本高、证据与授权检查不足、来源难追踪、评估口径不统一。 | 来自项目报告总结，不代表已覆盖所有行业场景。 | Business Problem |
| `ev_business_problem_003` | 作品集定位建议 | `artifact_derived` | `docs/portfolio_requirements_mapping.md` | `n/a_markdown_section: 推荐作品集定位` | 面向电商运营团队的多 Agent 增长工作台，帮助缩短从商品 Brief 到活动规划、合规审核和复盘指标设计的时间。 | “缩短时间”是定位表达；若出现具体耗时数字，必须标注 estimated。 | Business Problem |

## 4. Workflow Evidence

本板块展示 Steps 1-15、Planner、Human Approval、Growth Evaluation 和各节点输入输出。

必须覆盖：

- Steps 1-15 已完成但状态仍为 `needs_review`。
- Planner、Human Approval、Growth Evaluation 的治理与测评作用。
- 各节点输入输出来自 workflow execution log 或 V2 final report artifact index。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_workflow_001` | Steps 1-15 覆盖 | `artifact_derived` | `outputs/workflow_execution_log.json` | `/workflow_summary/covered_steps` | 1-15 | 覆盖来自 retrospective artifact-derived log，不代表重新执行 Steps 1-15。 | Workflow Evidence |
| `ev_workflow_002` | 节点数量 | `artifact_derived` | `outputs/workflow_execution_log.json` | `/workflow_summary/node_count` | 15 | 节点数量是历史 artifact 覆盖数量，不是真实运行 telemetry。 | Workflow Evidence |
| `ev_workflow_003` | V2 工作流顺序 | `artifact_derived` | `outputs/v2_final_report.json` | `/designed_v2_workflow/sequence` | 商品 Brief -> Brief Parser Agent -> Planner Agent -> Audience Insight / Selling Point Analyst / Platform Strategy -> Creative Agent -> Brand Compliance Agent -> Human Approval Node -> Image Prompt Skill -> Growth Evaluation Agent -> Final Report Generator | 是目标治理工作流描述，不解除 release gates。 | Workflow Evidence |
| `ev_workflow_004` | V2 新增治理节点 | `artifact_derived` | `outputs/v2_final_report.json` | `/designed_v2_workflow/v2_nodes_added` | Planner Agent; Human Approval Node; Growth Evaluation Agent; Final Report Generator | 这些是已完成的治理/汇总节点，不是本 Evidence Pack 新增节点。 | Workflow Evidence |
| `ev_workflow_005` | V1 artifact index | `artifact_derived` | `outputs/v2_final_report.json` | `/artifact_index/v1_artifacts` | Steps 3-11 的节点、artifact、status、role。 | 只展示结构化规划产物，不展示最终营销素材。 | Workflow Evidence |
| `ev_workflow_006` | 工作流图 | `artifact_derived` | `docs/workflow_diagram.md` | `n/a_markdown_section: V2 总览图` | Brief -> Parser -> Planner -> 分析节点 -> Creative -> Brand Compliance -> Human Approval -> Image Prompt Skill -> Growth Evaluation -> Final Report Generator | 图用于作品集说明，不代表节点具备真实生产 runtime telemetry。 | Workflow Evidence |

## 5. Validation Evidence

本板块展示 JSON 解析结果、Schema 验证结果、验证脚本和退出码。

必须覆盖：

- JSON 解析检查数量与通过/失败数量。
- Schema 映射数量与通过/失败数量。
- 验证脚本路径和退出码。
- Schema pass 只证明结构、类型和关键治理状态约束，不证明业务事实正确。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_validation_001` | JSON 解析总数 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/parse_validation/total_json_files` | 30 | JSON parse pass 只代表可解析为 JSON，不代表通过 Schema 或事实正确。 | Validation Evidence |
| `ev_validation_002` | JSON 解析通过 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/parse_validation/passed` | 30 | 只验证 JSON 语法。 | Validation Evidence |
| `ev_validation_003` | JSON 解析失败 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/parse_validation/failed` | 0 | 不代表内容事实已证明。 | Validation Evidence |
| `ev_validation_004` | Schema 映射数 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/schema_validation/mapped_artifacts` | 7 | 当前只覆盖映射的关键治理 artifact，不代表 100% Schema coverage。 | Validation Evidence |
| `ev_validation_005` | Schema 通过数 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/schema_validation/passed` | 7 | Schema pass 不证明真实业务效果。 | Validation Evidence |
| `ev_validation_006` | Schema 失败数 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/schema_validation/failed` | 0 | 仅表示映射 Schema 未失败。 | Validation Evidence |
| `ev_validation_007` | 验证脚本 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/script_path` | `scripts/validate_artifacts.mjs` | 脚本验证结构和关键状态，不验证现实事实。 | Validation Evidence |
| `ev_validation_008` | 验证脚本退出码 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/script_exit_code` | 0 | 退出码 0 不解除 blocked release gates。 | Validation Evidence |

## 6. Execution Trace Evidence

本板块展示 15 个节点、输入输出文件检查、`historical_not_available` 和非真实 runtime telemetry 边界。

必须覆盖：

- Workflow Execution Log 是 retrospective artifact-derived log。
- 15 个节点均为 historical node；node-level timing 不可用。
- 输入输出文件检查结果。
- 不得伪装成真实 per-node runtime telemetry。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_execution_trace_001` | Log 类型 | `artifact_derived` | `outputs/workflow_execution_log.json` | `/meta/log_type` | `retrospective_artifact_derived_log` | 不是生产 telemetry。 | Execution Trace Evidence |
| `ev_execution_trace_002` | Telemetry 类型 | `artifact_derived` | `outputs/workflow_execution_log.json` | `/meta/telemetry_type` | `not_runtime_telemetry` | 不得用于展示真实每节点运行耗时。 | Execution Trace Evidence |
| `ev_execution_trace_003` | 输入文件检查 | `deterministic_verified` | `outputs/workflow_execution_log.json` | `/workflow_summary/input_file_checks` | total 81, passed 81, failed 0 | 文件存在检查不证明内容事实正确。 | Execution Trace Evidence |
| `ev_execution_trace_004` | 输出文件检查 | `deterministic_verified` | `outputs/workflow_execution_log.json` | `/workflow_summary/output_file_checks` | total 30, passed 30, failed 0 | 输出存在不代表生产交付。 | Execution Trace Evidence |
| `ev_execution_trace_005` | historical_not_available 节点数 | `not_available` | `outputs/workflow_execution_log.json` | `/workflow_summary/historical_not_available_node_count` | 15 | 15 个节点时间均不可用，不能补造时间。 | Execution Trace Evidence |
| `ev_execution_trace_006` | measured node runtime 数量 | `not_available` | `outputs/workflow_execution_log.json` | `/workflow_summary/measured_node_time_count` | 0 | 当前没有真实 per-node runtime。 | Execution Trace Evidence |
| `ev_execution_trace_007` | Timing policy | `not_available` | `outputs/workflow_execution_log.json` | `/workflow_summary/timing_policy` | Steps 1-15 are historical nodes; node-level timing is unavailable and must remain null with historical_not_available evidence. | 必须保留该边界，不能写成真实运行时间。 | Execution Trace Evidence |

## 7. Claim Trace Evidence

本板块展示 14 条声明、六种声明类别、证据状态、人工审核要求和 blocked release gates。

必须覆盖：

- `source_found` 不等于现实事实已经证明。
- Agent 下游产物不能反向证明原始事实。
- 12 条声明需要人工审核。
- 保留 blocked release gates。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_claim_trace_001` | 声明总数 | `artifact_derived` | `outputs/claim_trace_matrix.json` | `/summary/claim_total` | 14 | 声明被追踪不代表现实事实已证明。 | Claim Trace Evidence |
| `ev_claim_trace_002` | 六类声明覆盖 | `artifact_derived` | `outputs/claim_trace_matrix.json` | `/summary/claim_category_counts` | product_capability 4; ai_capability 1; usage_scenario 2; visual_asset_authorization 3; compliance_or_safety 2; growth_or_business_outcome 2 | 覆盖类别不等于各声明已获正式证明或授权。 | Claim Trace Evidence |
| `ev_claim_trace_003` | source_found 计数 | `human_review_required` | `outputs/claim_trace_matrix.json` | `/summary/source_exists_counts/source_found` | 14 | `source_found` 只代表来源字段存在，不代表现实事实已经证明。 | Claim Trace Evidence |
| `ev_claim_trace_004` | 证据状态计数 | `artifact_derived` | `outputs/claim_trace_matrix.json` | `/summary/evidence_status_counts` | requires_human_verification 8; not_available 2; supported_by_provided_source 2; derived_from_mock 2 | `requires_human_verification`、`not_available` 和 `derived_from_mock` 必须显式展示边界。 | Claim Trace Evidence |
| `ev_claim_trace_005` | 人工审核要求数量 | `human_review_required` | `outputs/claim_trace_matrix.json` | `/summary/human_review_required_count` | 12 | 需要人工审核的声明不能展示为已被现实证明。 | Claim Trace Evidence |
| `ev_claim_trace_006` | Claim file checks | `deterministic_verified` | `outputs/claim_trace_matrix.json` | `/summary/file_checks` | total 67, passed 67, failed 0 | 文件和 pointer 检查通过不证明事实真实性。 | Claim Trace Evidence |
| `ev_claim_trace_007` | Claim pointer checks | `deterministic_verified` | `outputs/claim_trace_matrix.json` | `/summary/json_pointer_checks` | total 54, passed 54, failed 0 | JSON Pointer 存在不等于现实事实成立。 | Claim Trace Evidence |
| `ev_claim_trace_008` | Release gates preserved | `measured` | `outputs/claim_trace_matrix.json` | `/summary/release_gates_preserved` | true | 只表示 C 扩展未解除 gates。 | Claim Trace Evidence |
| `ev_claim_trace_009` | Claim release gates | `measured` | `outputs/claim_trace_matrix.json` | `/release_gates` | structured_planning_package approved; growth_evaluation approved_for_evaluation_only; final_marketing_copy blocked; final_image_prompt blocked; image_generation blocked; frontend_page blocked; public_release blocked | Evaluation permission does not equal final generation permission. | Claim Trace Evidence |

## 8. Evaluation Evidence

本板块展示 evaluation evidence 的类型和边界。Portfolio Evidence Pack 必须保留以下类型：`measured`、`deterministic_verified`、`artifact_derived`、`derived_from_mock`、`estimated`、`human_review_required`、`not_available`。

必须覆盖：

- 单一完整 Demo 案例。
- mock、estimated、not_available 的明确标注。
- Growth Evaluation 不能写成真实业务效果验证。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_evaluation_001` | Overall evaluation status | `artifact_derived` | `outputs/growth_evaluation_report.json` | `/meta/status` | `needs_review` | 不是 `pass`，不代表生产可用。 | Evaluation Evidence |
| `ev_evaluation_002` | Data quality | `artifact_derived` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/overall_data_quality` | `partial` | 数据质量为 partial，不能写成完整真实数据闭环。 | Evaluation Evidence |
| `ev_evaluation_003` | Completed demo cases | `derived_from_mock` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/completed_demo_cases` | 1 | 单一 Demo 案例，不能外推到多品类稳定性。 | Evaluation Evidence |
| `ev_evaluation_004` | Pending demo cases | `not_available` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/pending_demo_cases` | 2 | 未提供完整 Brief，不能伪造结果。 | Evaluation Evidence |
| `ev_evaluation_005` | Data source type rules | `artifact_derived` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/data_source_type_rules` | measured, derived_from_mock, estimated, not_available 的定义。 | 类型定义必须在展示中保留，不得混写成真实效果。 | Evaluation Evidence |
| `ev_evaluation_006` | Benchmark case data source | `derived_from_mock` | `outputs/growth_evaluation_report.json` | `/benchmark_cases/0/data_source_type` | `derived_from_mock` | 完整 Demo 的测试数据来源为 mock 派生。 | Evaluation Evidence |
| `ev_evaluation_007` | 平均耗时指标类型 | `estimated` | `outputs/growth_evaluation_report.json` | `/metric_results/1/data_source_type` | `estimated` | 不能写成真实效率提升。 | Evaluation Evidence |
| `ev_evaluation_008` | 人工修改率可用性 | `not_available` | `outputs/growth_evaluation_report.json` | `/metric_results/2/data_source_type` | `not_available` | 缺少人工字段级标注。 | Evaluation Evidence |
| `ev_evaluation_009` | 幻觉率可用性 | `not_available` | `outputs/growth_evaluation_report.json` | `/metric_results/3/data_source_type` | `not_available` | 缺少 claim 抽检分母和 unsupported-claim 分子。 | Evaluation Evidence |
| `ev_evaluation_010` | 审批闸口正确率来源类型 | `measured` | `outputs/growth_evaluation_report.json` | `/metric_results/7/data_source_type` | `measured` | 只证明当前 artifact 中 gate 继承正确，不代表最终发布可用。 | Evaluation Evidence |
| `ev_evaluation_011` | Schema 验证类型 | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/validation_type` | `deterministic_json_schema` | 验证结构与状态，不证明事实。 | Evaluation Evidence |
| `ev_evaluation_012` | 人工审核要求 | `human_review_required` | `outputs/claim_trace_matrix.json` | `/summary/human_review_required_count` | 12 | 12 条声明仍需人工审核。 | Evaluation Evidence |

## 9. Enterprise Governance

本板块展示 Human Approval、Brand Compliance、日志追踪、Schema 验证、Claim Trace 和 release gates。

必须覆盖：

- Human Approval 的 `needs_revision` 状态。
- Brand Compliance 的阻断继承。
- Workflow Execution Log 与 Schema Validation 的治理证据。
- Claim Trace 对声明来源、证据状态、人工审核的约束。
- release gates 保持 blocked。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_governance_001` | Human Approval status | `measured` | `outputs/human_approval_record.json` | `/meta/status` | `needs_revision` | 不是最终放行。 | Enterprise Governance |
| `ev_governance_002` | Final generation allowed | `measured` | `outputs/human_approval_record.json` | `/approval_summary/final_generation_allowed` | false | 最终生成仍 blocked。 | Enterprise Governance |
| `ev_governance_003` | Public release allowed | `measured` | `outputs/human_approval_record.json` | `/approval_summary/public_release_allowed` | false | 公开发布仍 blocked。 | Enterprise Governance |
| `ev_governance_004` | Reviewer authenticity boundary | `human_review_required` | `outputs/human_approval_record.json` | `/reviewer_record` | reviewer_name null; human_signature pending; reviewed_at null | 不得伪造真实人工审批、签字或授权证明。 | Enterprise Governance |
| `ev_governance_005` | Release gates | `measured` | `outputs/v2_final_report.json` | `/release_gates` | structured_planning_package approved; growth_evaluation approved_for_evaluation_only; final_marketing_copy blocked; final_image_prompt blocked; image_generation blocked; frontend_page blocked; public_release blocked | `approved_for_evaluation_only` 不等于最终生成或公开发布许可。 | Enterprise Governance |
| `ev_governance_006` | Workflow gate checks | `measured` | `outputs/growth_evaluation_report.json` | `/workflow_gate_checks` | Step 13 inheritance、structured planning evaluation、final generation blocked、public release blocked、no final creative generation 均为 pass。 | 只证明当前 gate 继承符合预期，不证明生产上线。 | Enterprise Governance |
| `ev_governance_007` | Schema validation status | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/status` | `pass` | Schema pass 不证明事实、授权或业务效果。 | Enterprise Governance |
| `ev_governance_008` | Claim source priority | `artifact_derived` | `outputs/claim_trace_matrix.json` | `/source_priority` | factual sources are original brief or formal proof materials; downstream artifacts cannot prove original facts; mock data cannot prove real business outcomes. | 必须在作品集中展示该边界。 | Enterprise Governance |

## 10. Limitations

本板块必须显式列出局限性，不能隐藏或弱化。

必须覆盖：

- 单一 Demo 案例。
- 没有真实客户数据。
- 没有真实 per-node runtime。
- mock 数据不等于真实业务效果。
- 没有正式素材授权证明。
- 不是生产系统上线。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_limitation_001` | 单一完整 Demo 案例 | `derived_from_mock` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/completed_demo_cases` | 1 | 不能外推跨品类稳定性。 | Limitations |
| `ev_limitation_002` | 缺少真实客户数据 | `not_available` | `outputs/growth_evaluation_report.json` | `/data_quality_summary/not_available_sources` | real customer CTR/CVR/GMV/traffic/conversion results unavailable. | 不得写“客户验证完成”。 | Limitations |
| `ev_limitation_003` | 缺少真实 per-node runtime | `not_available` | `outputs/workflow_execution_log.json` | `/workflow_summary/measured_node_time_count` | 0 | 不得伪装成真实 runtime telemetry。 | Limitations |
| `ev_limitation_004` | mock 数据边界 | `derived_from_mock` | `outputs/claim_trace_matrix.json` | `/source_priority/mock_data_rule` | Mock or demo data cannot prove real business outcomes. | 不能证明真实业务效果。 | Limitations |
| `ev_limitation_005` | 素材授权证明缺口 | `human_review_required` | `outputs/human_approval_record.json` | `/approval_items/5` | Asset authorization item is blocked and requires source tracking and authorization scope. | 没有正式素材授权证明，不能生成最终图片 Prompt、图片或公开发布。 | Limitations |
| `ev_limitation_006` | 非生产上线 | `artifact_derived` | `README.md` | `n/a_markdown_section: 当前进度 / 下一步` | 两周作品集 Demo 已完整交付，但不代表生产系统上线。 | 不得写“生产可用”。 | Limitations |
| `ev_limitation_007` | blocked release gates | `measured` | `outputs/v2_final_report.json` | `/release_gates` | final_marketing_copy, final_image_prompt, image_generation, frontend_page, public_release are blocked. | 不得解除任何 blocked release gate。 | Limitations |

## 11. Reproducibility

本板块定义后续 Evidence Pack 如何说明可复现路径。只记录关键脚本命令、输入文件、输出文件和验证报告入口；本 spec 不运行脚本、不生成新 schema、不修改上游文件。

必须覆盖：

- 关键脚本命令。
- 输入文件。
- 输出文件。
- 验证报告入口。

| evidence_id | evidence_title | evidence_type | source_artifact | source_json_pointer | displayed_value | limitation | portfolio_section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ev_repro_001` | Validation script command | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/script_path` | `node scripts/validate_artifacts.mjs` | 该命令验证 artifact，不生成最终作品集。 | Reproducibility |
| `ev_repro_002` | Validation script exit code | `deterministic_verified` | `outputs/artifact_validation_report.json` | `/meta/script_exit_code` | 0 | 退出码 0 不等于事实或业务效果已证明。 | Reproducibility |
| `ev_repro_003` | Workflow log builder | `deterministic_verified` | `outputs/workflow_execution_log.json` | `/meta/builder_script` | `node scripts/build_workflow_execution_log.mjs` | 生成 retrospective artifact-derived log，不是真实 runtime telemetry。 | Reproducibility |
| `ev_repro_004` | Workflow log builder exit code | `deterministic_verified` | `outputs/workflow_execution_log.json` | `/meta/builder_exit_code` | 0 | 退出码 0 不代表节点重新运行。 | Reproducibility |
| `ev_repro_005` | Claim Trace required inputs | `artifact_derived` | `outputs/claim_trace_matrix.json` | `/summary/check_log` | Required input file checks passed for Claim Trace Matrix inputs. | 文件存在不证明现实事实成立。 | Reproducibility |
| `ev_repro_006` | Validation report JSON | `deterministic_verified` | `outputs/artifact_validation_report.json` | `""` | `outputs/artifact_validation_report.json` | 报告入口，不是最终 Portfolio Evidence Pack。 | Reproducibility |
| `ev_repro_007` | Claim Trace output JSON | `artifact_derived` | `outputs/claim_trace_matrix.json` | `""` | `outputs/claim_trace_matrix.json` | 声明追踪矩阵，不是正式证明材料库。 | Reproducibility |
| `ev_repro_008` | Workflow Trace output JSON | `artifact_derived` | `outputs/workflow_execution_log.json` | `""` | `outputs/workflow_execution_log.json` | 执行追踪来自历史 artifact，不是真实 per-node runtime。 | Reproducibility |
| `ev_repro_009` | V2 Final Report JSON | `artifact_derived` | `outputs/v2_final_report.json` | `""` | `outputs/v2_final_report.json` | V2 汇总报告不授权最终生成或公开发布。 | Reproducibility |

## 12. Release Gate Preservation Requirement

Portfolio Evidence Pack 必须保留以下 release gate 状态，不得在文案、图表或结论中解除：

| gate | required_displayed_state | source_artifact | source_json_pointer |
| --- | --- | --- | --- |
| structured_planning_package | `approved` | `outputs/v2_final_report.json` | `/release_gates/structured_planning_package` |
| growth_evaluation | `approved_for_evaluation_only` | `outputs/v2_final_report.json` | `/release_gates/growth_evaluation` |
| final_marketing_copy | `blocked` | `outputs/v2_final_report.json` | `/release_gates/final_marketing_copy` |
| final_image_prompt | `blocked` | `outputs/v2_final_report.json` | `/release_gates/final_image_prompt` |
| image_generation | `blocked` | `outputs/v2_final_report.json` | `/release_gates/image_generation` |
| frontend_page | `blocked` | `outputs/v2_final_report.json` | `/release_gates/frontend_page` |
| public_release | `blocked` | `outputs/v2_final_report.json` | `/release_gates/public_release` |

## 13. Forbidden Claims in Portfolio Evidence Pack

后续生成最终证据包时不得出现以下结论：

- 不得写“真实提升”。
- 不得写“生产可用”。
- 不得写“客户验证完成”。
- 不得把 `source_found` 写成现实事实已证明。
- 不得把 Agent 下游产物写成原始事实证明。
- 不得把 mock、estimated 或 not_available 指标写成真实业务结果。
- 不得恢复已删除的参数词作为商品名称或事实承诺。
- 不得解除任何 blocked release gate。
