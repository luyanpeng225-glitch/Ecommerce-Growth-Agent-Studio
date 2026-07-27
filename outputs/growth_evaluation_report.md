# Growth Evaluation Report

项目：E-commerce Growth Agent Studio / 电商增长 Agent 工作台  
Step：14 — Growth Evaluation Agent  
Demo 商品：运动相机  
整体测评状态：`needs_review`

> 重要边界：可以进入测评不等于允许最终生成。最终营销文案、最终图片 Prompt、图片生成和公开发布继续 `blocked`。

## 1. 测评目标与范围

本报告评估 Agent 工作流本身的能力、稳定性、风险传递和问题归因，不重复 Step 10 Growth Metrics Agent。

- Step 10：定义业务 KPI、A/B 测试和复盘指标。
- Step 14：评估工作流质量、数据可用性、审批闸口、风险继承、失败归因和可复现性。

本次只执行 Step 14，不重新执行 Steps 1-13，不执行 V2 Final Report Generator，不生成最终营销内容、最终图片 Prompt、图片或前端页面。

## 2. 数据来源和数据质量

读取来源：Planner、Brand Compliance、Human Approval、Growth Metrics、Creative Package Reporter、测评方案、CSV mock 数据和 mock 审计日志。

数据质量结论：`partial`。

- `measured`：当前工作区产物存在性、JSON 合法性、release gate 字段、审批继承字段、风险项计数。
- `derived_from_mock`：CSV 样例、mock audit log 计算或计数。
- `estimated`：Demo 人工基准与 Agent 工作流耗时估算。
- `not_available`：真实投放效果、人工字段级标注、真实运行耗时日志、跨品类样本。

mock 时间不能写成真实效率提升。CTR、CVR、GMV、流量和转化不能写成已实现结果。

## 3. Benchmark Case 状态

| Case | 商品 | 类目 | 状态 | 说明 |
| --- | --- | --- | --- | --- |
| case_001 | 运动相机 | 智能影像设备 | completed_demo | 唯一已执行完整 Demo；CSV 中 11/11 只代表原 MVP 核心节点完成率。 |
| case_002 | 便携投影仪 | 消费电子 | pending | 未提供 Brief，不能伪造结果。 |
| case_003 | 美妆精华 | 美妆个护 | pending | 未提供 Brief，不能伪造功效宣称测评结果。 |

当前只有一个完整 Demo，不能声称已验证跨品类稳定性。

## 4. 指标结果表

| 指标 | 当前值 | 数据来源类型 | 解读 |
| --- | --- | --- | --- |
| 任务完成率 | 11/11 for original MVP core nodes; V2 governance nodes 3/3 covered for the 运动相机 demo after Step 14 | derived_from_mock | 原 MVP 单案例跑通；不能外推为跨品类稳定。 |
| 平均耗时 | 90-150 minutes Agent workflow estimate vs 360-600 minutes manual baseline estimate | estimated | 只能作为作品集假设，不能写成真实效率提升。 |
| 人工修改率 | not_available | not_available | 需要人工抽检字段后计算。 |
| 幻觉率 | not_available | not_available | 当前只能说明 blocked gate 控制了无证据声明风险，不能量化幻觉率。 |
| 合规阻断率 | 6 high-risk blocked/mock CSV items; 2/7 Human Approval items blocked; 8 Brand Compliance risk items identified | derived_from_mock | 可证明阻断机制存在，但跨案例阻断率仍需更多样本。 |
| 结构化输出率 | Step 14 produced JSON and Markdown; prior completed nodes have structured artifacts recorded in FILE_INDEX | measured | 结构化输出习惯良好；仍需后续 schema 自动化测试覆盖。 |
| 可追踪率 | audit log sample has 3 trace events; current reports preserve source_files/input artifacts | derived_from_mock | 具备可追踪设计；不是生产级审计证明。 |
| 审批闸口正确率 | Release gates correctly inherited: structured planning approved; final copy/prompt/image/public release blocked | measured | 审批继承正确。 |
| 风险传递完整率 | Critical risk classes from Brand Compliance and Human Approval are present in issue_list and release gates | measured | 核心风险已传递；仍需字段级 trace matrix 自动化。 |
| 失败原因可解释性 | 9 failure categories defined; issue list includes evidence, root cause, actions, owner and verification method | measured | 具备解释框架；需要更多失败样本验证稳定性。 |

## 5. Rubric 评分表

只对有证据的维度打分；证据不足时使用 `null` 或 `not_available`。

| 维度 | 分数 | 数据来源类型 | 状态 | 证据 |
| --- | --- | --- | --- | --- |
| 输入完整性 | 0.78 | measured | needs_review | Required Step 14 inputs are present; proof materials and asset authorization are missing. |
| Planner 路由正确性 | 0.86 | measured | pass_with_caution | Planner routes Brand Compliance before Human Approval and Growth Evaluation after compliance and approval. |
| 上下游字段交接完整性 | 0.8 | measured | needs_review | Planner, Human Approval, and Brand Compliance expose handoff fields; some future_outputs labels remain historical placeholders. |
| 声明来源可追踪性 | 0.72 | measured | needs_review | Claim source maps and risk source fields exist, but no field-level automated trace matrix yet. |
| 合规风险识别与传递 | 0.9 | measured | pass_with_caution | Brand Compliance identified 8 risk items and Human Approval inherited critical blocked gates. |
| Human Approval 闸口正确性 | 0.92 | measured | pass_with_caution | Step 13 status is needs_revision, final_generation_allowed=false, public_release_allowed=false. |
| JSON / Markdown 产物完整性 | 0.86 | measured | pass_with_caution | Step 14 JSON/Markdown are generated; JSON validation is required after write. |
| blocked 内容是否被正确阻止 | 0.95 | measured | pass_with_caution | Final marketing copy, final image prompt, image generation and public release remain blocked. |
| 失败归因是否清晰 | 0.82 | measured | needs_review | Failure taxonomy and issue list contain root causes and verification methods. |
| 工作流是否可复现 | 0.7 | derived_from_mock | needs_review | Runbook, CSV and audit log exist; only one completed case is available. |

## 6. 工作流闸口检查

| Gate | 期望 | 实际 | 状态 |
| --- | --- | --- | --- |
| Step 13 继承 | needs_revision inherited | needs_revision | pass |
| 结构化规划产物进入测评 | true | true | pass |
| 最终生成放行 | false | false | pass |
| 公开发布放行 | false | false | pass |
| Step 14 不生成最终素材 | no final copy/prompt/image/frontend | only evaluation artifacts | pass |

## 7. 失败分类与问题清单

失败分类包括：`input_missing`、`routing_error`、`unsupported_claim`、`risk_propagation_failure`、`compliance_gate_failure`、`human_approval_failure`、`artifact_schema_failure`、`traceability_failure`、`insufficient_test_data`。

### issue_001 — Benchmark dataset
- Severity: high
- Evidence: Only case_001 运动相机 is completed; 便携投影仪 and 美妆精华 are pending.
- Root cause: Insufficient cross-category test data.
- Product / Workflow action: Prepare two additional Briefs and run the same node sequence before claiming stability.
- Model / Prompt action: Add benchmark-case status checks to Growth Evaluation prompt.
- Owner role: 电商运营
- Verification method: Confirm new case artifacts and compare metric_results across cases.

### issue_002 — Human Approval Node / Brand Compliance Agent
- Severity: high
- Evidence: final_generation_allowed=false; public_release_allowed=false; proof and asset authorization missing.
- Root cause: Evidence and authorization are not provided.
- Product / Workflow action: Collect product proof, usage constraints, asset licenses and real approval records.
- Model / Prompt action: Keep blocked gates explicit in all downstream prompts.
- Owner role: 法务/合规 + 设计负责人
- Verification method: Check human_approval_record release_gates and authorization attachments.

### issue_003 — Growth Evaluation Agent
- Severity: medium
- Evidence: human_edit_rate_mock and hallucination_rate_mock are TBD in CSV.
- Root cause: No manual field annotation dataset exists.
- Product / Workflow action: Create a field-level review sheet with pass/minor_edit/major_edit/blocked and claim-source labels.
- Model / Prompt action: Require denominator and numerator before computing rates.
- Owner role: 内容负责人
- Verification method: Recalculate human_edit_rate and hallucination_rate from annotated samples.

### issue_004 — Traceability layer
- Severity: medium
- Evidence: Audit log has 3 mock events; reports include source files, but no automated field-level trace matrix.
- Root cause: Traceability is documented manually at artifact level.
- Product / Workflow action: Add trace_id and source_field to every claim/risk/recommendation row.
- Model / Prompt action: Update prompts to emit claim_trace_matrix.
- Owner role: 产品经理 / Workflow Owner
- Verification method: Sample 20 claims and verify source_field links.

### issue_005 — Metrics reporting
- Severity: medium
- Evidence: Average time is estimated; no real per-node timestamps for Steps 1-13.
- Root cause: Demo lacks runtime instrumentation.
- Product / Workflow action: Add start/end timestamps and operator time notes to audit log for every node.
- Model / Prompt action: Mark all time metrics as estimated until timestamp logs exist.
- Owner role: 电商运营
- Verification method: Compare audit timestamps with report metric source types.


## 8. Human Approval 继承结果

- Step 13 overall decision：`needs_revision`
- structured_planning_package：`approved`
- planning_artifacts_can_enter_evaluation：`true`
- final_generation_allowed：`false`
- public_release_allowed：`false`
- reviewer_name：`null`
- human_signature：`pending`
- reviewed_at：`null`

继承 release gates：

| Gate | 状态 |
| --- | --- |
| structured_planning_package | approved |
| final_marketing_copy | blocked |
| final_image_prompt | blocked |
| image_generation | blocked |
| public_release | blocked |

## 9. 产品、Prompt 和 Workflow 优化建议

1. 补充便携投影仪、美妆精华两个 Benchmark Brief 并按同一工作流跑完，避免单案例外推。
2. 补充证明材料、适用条件和素材授权后，才允许讨论最终生成。
3. 为每个节点增加 start/end timestamp，避免继续使用耗时估算。
4. 建立字段级人工评审表，计算人工修改率和幻觉率。
5. Prompt 中要求所有 claim、risk、recommendation 输出 `source_artifact` 和 `source_field`。
6. 在 V2 文档中明确 Growth Metrics 与 Growth Evaluation 的职责差异。

## 10. 测评局限性

- 当前只有一个完整 Demo，不能声称跨品类稳定。
- CSV 和 audit log 是 mock 样例，不是生产日志。
- 平均耗时是 Demo 估算，不能写成真实效率提升。
- 人工修改率和幻觉率缺少人工标注样本，当前不可计算。
- CTR、CVR、GMV、流量、转化只能作为观察字段，不能写成已实现业务结果。
- 最终生成和公开发布继续 `blocked`。

## 11. 可复现实验说明

当前可复现范围：读取同一批输入文件，生成 Step 14 Prompt、JSON 和 Markdown，并校验 JSON 合法性。

最小校验：

```bash
python3 -m json.tool outputs/growth_evaluation_report.json
```

后续若要复现实验稳定性，需要新增至少两个商品 Brief，并对每个节点保留运行时间、人工评审标注和风险字段 trace。

## 12. 下游 Final Report Generator 交接字段

允许交接给 V2 Final Report Generator：

- `meta.status`
- `benchmark_cases`
- `metric_results`
- `rubric_results`
- `workflow_gate_checks`
- `failure_taxonomy`
- `issue_list`
- `human_approval_inheritance`
- `release_gates`
- `iteration_recommendations`
- `reproducibility_record`

交接边界：Final Report Generator 可以汇总 Step 14 测评结果，但不得生成最终营销文案、最终图片 Prompt、图片、前端页面或公开发布素材。
