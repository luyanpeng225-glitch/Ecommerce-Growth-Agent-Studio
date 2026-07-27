# Failure Scenario Test Spec

## 目的

验证 E-commerce Growth Agent Studio 在输入不完整时能否正确阻断工作流、生成明确修订项，并在输入修复后重新通过 Brief 结构检查。

本测试是 Steps 1-15 之后的确定性验证扩展，不是 Step 16，不改写历史 Agent 执行记录，也不调用模型生成营销内容。

## 测试场景

- scenario_id: `failure_brief_missing_campaign_goal`
- 正常输入：`data/sample_brief.json`
- 故障注入：在内存中删除必填字段 `/campaign_goal`
- 第一次预期：Product Brief Schema 验证失败，工作流状态映射为 `blocked`，Planner 不执行
- 修订动作：从正常输入恢复 `/campaign_goal`
- 第二次预期：Product Brief Schema 验证通过，Brief 结构状态映射为 `pass`，允许进入 `brand_compliance_pre_check`

## 状态解释

- `blocked`：输入结构不满足必填规则，必须进入 Revision Queue。
- `pass`：只表示 Brief 结构验证通过，可以进入下一道合规检查。
- Schema `pass` 不证明商品能力声明真实，不代表素材已经授权，也不解除发布闸口。

## 可验证断言

1. 故障输入必须被 Schema 拒绝。
2. 错误必须明确指向缺失字段 `campaign_goal`。
3. 初次失败时 Planner 必须保持未执行。
4. Revision Queue 必须包含 `campaign_goal`。
5. 修复后 Brief 必须通过同一个 Schema。
6. 修复后只允许进入 `brand_compliance_pre_check`。
7. 五个关键 release gates 必须继续 `blocked`。

## 时间与证据

测试脚本记录真实的 `started_at`、`completed_at` 和 `duration_ms`。这些时间只证明本次确定性测试脚本的运行时间，不代表历史 Steps 1-15 的节点耗时，也不是生产 telemetry。

## 边界

- 不修改 `data/sample_brief.json`。
- 不修改 Steps 1-15 的任何上游 JSON。
- 不调用 Planner、Creative Agent 或图像模型。
- 不生成最终营销文案、最终图片 Prompt、图片或电商落地页。
- `production_ready` 和 `customer_validated` 继续为 `false`。

