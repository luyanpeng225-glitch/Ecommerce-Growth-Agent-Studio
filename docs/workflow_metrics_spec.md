# Workflow Metrics Spec

## 目的

Workflow Metrics 用于把 Agent 工作流的执行、验证、治理和风险状态汇总成可追溯指标。它是 Steps 1-15 之后的验证与展示扩展，不是新的 Agent 节点。

## 指标分组

### 1. Runtime Metrics

- `planner_runtime`：读取 Workflow Execution Log。历史 Planner 没有真实开始与结束时间，必须为 `value = null`、`status = historical_not_available`。
- `historical_node_timing_coverage`：统计 15 个历史节点中真实 measured runtime 的数量。
- `failure_scenario_test_runtime`：读取 Failure Scenario Test 的真实脚本运行耗时，只代表该确定性测试，不代表 Planner 或完整 Agent 工作流耗时。
- `workflow_retry_count`：Failure Scenario Test 从 blocked 修复后重跑一次，因此该测试范围内 retry 为 1。

### 2. Quality Metrics

- JSON parse rate：来自 `outputs/artifact_validation_report.json`。
- Schema match rate：来自统一 Schema 映射结果。
- Failure Scenario assertion rate：来自 `outputs/failure_scenario_test_report.json`。
- Release gate preservation rate：检查五个关键 gate 是否保持 `blocked`。

### 3. Governance Metrics

- Compliance validation status：结构与跨阶段集合验证状态。
- Compliance governance status：证明、授权和人工审核是否完成。
- Human Review status：读取 Step 13 的 `overall_decision` 和真实签名状态。
- Risk tracking：inherited、resolved、unresolved、newly detected 与总风险数量。

### 4. Overall Status

- `workflow_status = needs_review`：结构验证通过，但真实证明、授权、人工签核和多案例测评仍不完整。
- `final_score = null`、`availability = not_available`：当前没有经过校准的权重、基线和多案例数据，不能生成看似精确的总分。

## 证据类型

- `measured`：本次脚本真实记录的运行时间。
- `deterministic_verified`：由 Schema、文件和状态关系确定性计算。
- `artifact_derived`：从已有产物读取并汇总。
- `historical_not_available`：历史记录不存在，禁止补造。
- `not_available`：当前证据不足，不能给出数字或结论。

## 边界

- 不把构建脚本耗时或 Failure Scenario Test 耗时写成 Planner Time。
- 不把 Compliance `validation_status = pass` 写成治理已经通过。
- 不把 `needs_revision` 改写成真实人工审批完成。
- 不生成未校准的 Final Score。
- 五个关键 release gates 继续 `blocked`。
- `production_ready = false`、`customer_validated = false`。

