# Runtime Logging Spec

## 1. Runtime 的目的

Runtime 用于记录一次真实工作流执行过程，作为后续复盘、调试、审计、报告和 Portfolio Runtime Viewer 的唯一事实来源。

一次 Runtime 记录必须覆盖：

- 本次运行从何时开始、何时结束
- 每个节点是否执行
- 节点输入和输出
- 节点耗时
- 节点成功、失败、阻断或等待人工审批状态
- 模型和工具调用情况
- 重试、错误与恢复过程
- Release Gate 最终状态

Runtime 不用于补写历史、不用于推测缺失数据、不用于把测试耗时伪装成真实 Agent 工作流耗时。

## 2. 三种记录类型

### A. Real Runtime

Real Runtime 是真实执行工作流时产生的运行日志。

允许记录：

- 真实 `run_id`
- 真实 `started_at`
- 真实 `ended_at`
- 真实 `duration_ms`
- 真实节点耗时
- 真实模型调用
- 真实工具调用
- 真实 Token 与成本数据（仅当实际采集到）
- 真实重试、错误、恢复和人工审批状态

Real Runtime 必须由 Runtime Runner 或日志采集器在真实执行过程中写入，不得根据历史产物倒推生成。

### B. Historical WorkTrace

Historical WorkTrace 是根据历史产物重建的工作痕迹。

如果历史产物缺失时间、耗时、运行编号或调用统计，必须写：

```text
historical_not_available
```

Historical WorkTrace 禁止：

- 补造 `run_id`
- 补造时间戳
- 补造耗时
- 用当前时间代替历史时间
- 虚构模型调用、工具调用、Token 或成本

### C. Deterministic Failure Test

Deterministic Failure Test 是本地确定性测试记录，用于验证失败场景、阻断逻辑或固定输入输出。

现有 `58 ms` 只属于 Failure Scenario Test，不是模型耗时、不是 Agent 耗时、也不是完整工作流 Runtime 耗时。

Deterministic Failure Test 不得被写入或展示为 Real Runtime。

## 3. Runtime 顶层字段

Runtime 顶层对象至少包含以下字段：

| 字段 | 含义 |
| --- | --- |
| `run_id` | 真实运行 ID。Real Runtime 中由运行器生成；Historical WorkTrace 缺失时写 `historical_not_available`；不得补造。 |
| `runtime_type` | 记录类型：`real_runtime`、`historical_worktrace` 或 `deterministic_failure_test`。 |
| `execution_context` | 执行上下文，例如本地、CI、OpenClaw 会话、模型配置、工具环境；只记录真实可得信息。 |
| `workflow_name` | 工作流名称。 |
| `case_id` | 案例 ID。 |
| `product_category` | 商品品类，例如 `运动相机`。 |
| `run_status` | 本次运行最终状态，使用统一状态枚举。 |
| `started_at` | 真实开始时间；缺失时不得推测。 |
| `ended_at` | 真实结束时间；缺失时不得推测。 |
| `duration_ms` | 真实总耗时；缺失时为 `null`，并通过 availability/status 字段说明。 |
| `node_count` | 工作流节点总数。 |
| `completed_node_count` | 已完成节点数。 |
| `failed_node_count` | 失败节点数。 |
| `blocked_node_count` | 阻断节点数。 |
| `retry_count` | 总重试次数。 |
| `model_call_count` | 实际模型调用次数。未采集时不得虚构。 |
| `tool_call_count` | 实际工具调用次数。未采集时不得虚构。 |
| `total_input_tokens` | 实际输入 Token。未采集时为 `null` 并标注不可用。 |
| `total_output_tokens` | 实际输出 Token。未采集时为 `null` 并标注不可用。 |
| `estimated_cost` | 实际可估算成本。未采集价格或 Token 时为 `null` 并标注不可用。 |
| `human_approval_status` | 人工审批状态对象，必须区分审批节点设计与真实签核是否发生。 |
| `release_gates` | Release Gate 状态对象。 |
| `nodes` | 节点运行记录数组。 |

涉及缺失数据的字段必须配套记录 availability/status 信息，例如：

- `duration_ms_availability`
- `token_availability`
- `cost_availability`
- `model_call_availability`
- `tool_call_availability`

## 4. 状态枚举

`run_status` 和 `node_status` 使用同一组状态枚举：

- `queued`
- `running`
- `pass`
- `needs_review`
- `needs_revision`
- `blocked`
- `failed`
- `skipped`
- `historical_not_available`

任何新增状态必须先更新 Runtime JSON Schema，并说明与现有状态的区别。

## 5. 每个节点的记录字段

每个节点记录至少包含以下字段：

| 字段 | 含义 |
| --- | --- |
| `node_id` | 节点 ID。 |
| `node_name` | 节点名称。 |
| `node_type` | 节点类型，例如 planner、skill、agent、review、gate、fan_in。 |
| `status` | 节点状态，使用统一状态枚举。 |
| `started_at` | 节点真实开始时间；缺失时不得推测。 |
| `ended_at` | 节点真实结束时间；缺失时不得推测。 |
| `duration_ms` | 节点真实耗时；未采集时为 `null` 并标注 availability/status。 |
| `input_artifacts` | 节点输入产物列表。 |
| `output_artifacts` | 节点输出产物列表。 |
| `model_calls` | 节点实际模型调用记录。未采集时不得虚构。 |
| `tool_calls` | 节点实际工具调用记录。未采集时不得虚构。 |
| `input_tokens` | 节点输入 Token；未采集时为 `null`。 |
| `output_tokens` | 节点输出 Token；未采集时为 `null`。 |
| `retry_count` | 节点重试次数。 |
| `error_code` | 错误码；无错误时为 `null`。 |
| `error_message` | 错误信息；无错误时为 `null`。 |
| `risk_ids` | 节点涉及的风险 ID 列表。 |
| `claim_ids` | 节点涉及的 claim ID 列表。 |
| `next_node` | 下一个节点或路由目标。 |
| `human_review_required` | 是否需要人工审核。 |

节点级缺失数据同样必须配套 availability/status 字段，例如：

- `duration_ms_availability`
- `model_call_availability`
- `tool_call_availability`
- `token_availability`

## 6. 并行执行：fan-out / fan-in

以下三个 Skill 必须作为并行执行节点分别记录：

- Audience Insight
- Selling Point Analyst
- Platform Strategy

并行规则：

1. 三个 Skill 由 Planner 分发。
2. 三个 Skill 使用同一个 `parallel_group_id`。
3. 三个 Skill 各自拥有独立节点记录。
4. 三个 Skill 各自记录自己的 `started_at`、`ended_at` 和 `duration_ms`。
5. 三个 Skill 全部完成后执行 fan-in。
6. fan-in 节点负责汇合三个并行输出。
7. 汇合后进入 Creative Agent。

禁止把 Audience Insight、Selling Point Analyst、Platform Strategy 三个并行 Skill 错算为一个真实执行节点。它们可以共享 `parallel_group_id`，但不能共享同一个 `node_id` 或同一条节点耗时记录。

## 7. Human Approval

Runtime 必须区分：

- 审批节点已经设计
- 真实人工签核是否实际发生

当前项目真实状态必须保留为：

```json
{
  "overall_decision": "needs_revision",
  "human_signature": "pending",
  "reviewer_name": null,
  "reviewed_at": null
}
```

不得写“人工审批已完成”。
不得写“人工审核已通过”。
不得把已设计的审批节点等同于真实签核完成。

## 8. Release Gates

以下五个 Gate 必须继续保持 `blocked`：

- `final_marketing_copy`
- `final_image_prompt`
- `image_generation`
- `frontend_page`
- `public_release`

`blocked` 的原因是证据、素材授权或人工签核不足，不代表 JSON 验证失败，也不代表 Schema 验证失败。

Release Gate 记录应包含 gate ID、状态、阻断原因、相关风险或 claim，以及解除阻断所需条件。

## 9. 缺失数据规则

如果真实执行时没有采集某项数据：

- 对该字段使用 `null`
- 同时填写对应的 availability/status 字段
- 在说明字段中记录缺失原因（如可得）

禁止：

- 使用推测值
- 用当前时间代替历史时间
- 把 `58 ms` 写成 Agent Runtime
- 把 Failure Scenario Test 耗时写成模型、Agent 或完整工作流耗时
- 补造 `run_id`
- 补造时间戳
- 补造耗时
- 虚构 Token
- 虚构成本
- 虚构模型调用
- 虚构工具调用

Historical WorkTrace 中无法确认的时间、耗时或运行信息必须写 `historical_not_available`，不能写估计值。

## 10. 后续实施顺序

- 第 2 小步：创建 Runtime JSON Schema
- 第 3 小步：创建 Runtime Runner 和日志采集器
- 第 4 小步：真实运行“运动相机”案例
- 第 5 小步：生成 Runtime Report
- 第 6 小步：把 Runtime Viewer 加入 Portfolio
- Runtime 跑通后，再考虑增加“便携投影仪”跨品类案例
