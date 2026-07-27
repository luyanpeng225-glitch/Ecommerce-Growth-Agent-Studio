# Failure Scenario Test Report

> 失败场景：活动目标缺失时的阻断、修订与恢复

## 结论

当商品 Brief 缺少活动目标时，系统成功阻止 Planner 继续执行，并创建明确的 Revision Queue。恢复活动目标后，系统使用同一个 Product Brief Schema 重新校验；结构验证通过后，仅允许进入 brand_compliance_pre_check。7 项测试断言全部通过，最终生成与发布权限没有被错误解除。

- test_status: pass
- evidence_type: deterministic_verified
- scenario_id: failure_brief_missing_campaign_goal
- duration_ms: 58
- duration_ms 边界说明：58 ms 仅表示本次本地确定性测试脚本的运行时间，不代表用户修订时间、LLM响应时间或完整工作流耗时。
- historical_execution_claimed: false

## 故障注入

从 `data/sample_brief.json` 的内存副本删除 `/campaign_goal`，不修改原文件。

第一次验证结果：`blocked`；Schema valid = `false`；Planner executed = `false`。

## 业务影响说明

- `campaign_goal` 用于说明本次活动以品牌曝光、用户拉新、成交转化、复购或其他业务目标为主要方向。
- 如果缺少 `campaign_goal`，Planner 无法可靠确定平台策略、内容 CTA、指标优先级和任务路由。
- 系统不能自行猜测活动目标，否则可能导致后续内容方向、平台策略和测评指标与真实业务目标不一致。
- 因此，这个错误属于关键业务输入缺失，必须在 Planner 执行前阻断。
- 阻断后，下游 Audience Insight、Selling Point、Platform Strategy、Creative Agent 等节点均不执行。
- 本测试没有调用模型，因此不能用它证明真实模型调用成本、延迟或运行时恢复能力。

## 失败分类

| 字段 | 结果 |
| --- | --- |
| failure_type | missing_required_business_input |
| failure_stage | brief_validation |
| severity | blocking |
| recoverability | user_recoverable |
| human_takeover_required | false |
| affected_node | Planner Agent |
| recovery_action | 补充 campaign_goal 后重新执行 Brief 结构校验 |
| recovery_target | brand_compliance_pre_check |

该场景不需要品牌、法务或技术人员接管。电商运营或活动负责人补充业务目标后即可重新校验。这里的 user_recoverable 仅适用于字段缺失问题，不代表所有合规风险都可以由普通用户直接解除。

## 修订任务与输入重新校验

Revision Queue 已创建，用于提示补齐关键业务输入，而不是触发完整工作流重跑。

- 待补充内容：本次营销活动的主要目标
- 字段名称：`campaign_goal`
- 负责角色：电商运营或活动负责人
- 可参考的目标类型：品牌曝光、用户拉新、成交转化、复购
- 完成条件：补充一个明确的主要活动目标
- 修复动作：恢复 `campaign_goal` 后，使用同一个 Product Brief Schema 重新校验
- 恢复结果：Brief 结构状态变为 `pass`
- 下一道检查：`brand_compliance_pre_check`
- Planner 尚未在本测试中真正运行

## 用户提示示例

这部分是产品提示文案示例，属于建议的界面文案，不是已经上线的真实页面。

### 建议的界面文案

无法开始活动规划

当前商品 Brief 缺少“活动目标”。系统无法可靠确定内容方向、平台策略、CTA 和效果指标。

请补充本次活动的主要目标，例如品牌曝光、用户拉新、成交转化或复购。

建议操作：

- 补充活动目标
- 保存并重新检查
- 检查通过后进入前置合规审核

建议按钮：

`补充活动目标`

`保存并重新检查`

以上内容属于产品体验建议，不代表当前 Demo 已经实现可交互表单或按钮。

## 失败与恢复路径

```text
缺少 campaign_goal
 -> Product Brief Schema 拒绝
 -> Workflow 状态变为 blocked
 -> Planner Agent 不执行
 -> 创建 Revision Queue
 -> 补充 campaign_goal
 -> 使用同一个 Schema 重新校验
 -> Brief 结构状态变为 pass
 -> 进入 brand_compliance_pre_check
```

## 断言

> 7项确定性断言全部通过。中文含义用于作品集展示，expected、actual与status保持原测试结果不变。

| assertion_id | 中文含义 | expected | actual | status |
| --- | --- | --- | --- | --- |
| initial_schema_rejected | 错误输入被Schema拒绝 | false | false | pass |
| missing_field_identified | 准确识别campaign_goal缺失 | ["campaign_goal"] | ["campaign_goal"] | pass |
| planner_skipped_when_blocked | 阻断时Planner未执行 | false | false | pass |
| revision_queue_created | 成功创建修订任务 | ["campaign_goal"] | ["campaign_goal"] | pass |
| repaired_schema_accepted | 恢复字段后结构验证通过 | true | true | pass |
| rerun_routes_to_pre_check | 修复后进入前置合规检查 | "brand_compliance_pre_check" | "brand_compliance_pre_check" | pass |
| release_gates_remain_blocked | 发布权限未被错误解除 | true | true | pass |

## Release Gates

- final_marketing_copy: blocked
- final_image_prompt: blocked
- image_generation: blocked
- frontend_page: blocked
- public_release: blocked

## 本测试能够证明

- 关键业务输入缺失时，Product Brief Schema能够拒绝错误输入。
- 系统能够准确识别缺失字段campaign_goal。
- 工作流状态能够映射为blocked。
- Planner不会在错误输入上继续执行。
- 系统能够创建Revision Queue。
- 恢复campaign_goal后，可以使用同一个Schema重新校验。
- 修复后Brief结构状态能够恢复为pass。
- 修复后的下一道检查为brand_compliance_pre_check。
- 五个关键release gates不会因为结构验证通过而被错误解除。

## 本测试不能证明

- 不能证明LLM调用失败时能够自动恢复。
- 不能证明Agent超时、限流或网络异常时能够自动重试。
- 不能证明模型输出格式错误时能够自动修复。
- 不能证明并行Agent部分失败时能够局部重跑。
- 不能证明商品声明已经获得现实证据支持。
- 不能证明图片、Logo、人物肖像或场景素材已经获得授权。
- 不能证明Human Approval已经完成正式人工签核。
- 不能证明系统达到生产可用状态。
- 不能证明工作流带来真实GMV、CTR、转化率或效率提升。
- 不能证明已经获得真实企业客户验证。

> 因此，本报告的准确定位是“输入缺失场景下的确定性阻断与恢复测试”，不是完整的生产级Agent fallback验证。

## 下一项待验证场景

> 以下内容是后续测试建议，不是本次测试结果。本轮未运行Agent、未修改工作流，也未生成新的验证数据。

场景名称：

> 并行节点部分失败与局部恢复

建议场景：

```text
Audience Insight：执行成功
Selling Point Analyst：输出格式不符合约定
Platform Strategy：执行成功
```

建议验证重点：

- 系统是否能够识别单个并行节点的结构化输出失败。
- 已成功的并行节点结果是否能够保留，不被错误覆盖。
- 失败节点是否能够进入明确的修订或局部重跑路径。
- 下游依赖节点是否会在关键输入未恢复前保持blocked。
- release gates是否继续保持blocked，直到必要输入和审批链路完成。

该场景仍属于后续测试规划，不能作为本报告的已验证证据。
