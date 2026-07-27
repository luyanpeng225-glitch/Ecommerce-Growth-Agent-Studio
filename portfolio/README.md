# Portfolio Page

## 本地启动

在项目根目录运行：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

打开：

- 常规页面：`http://127.0.0.1:4173/portfolio/`
- 自动演示：`http://127.0.0.1:4173/portfolio/?demo=1#workflow`（10 个业务阶段；不调用实时模型；Instrumented Runtime 使用本地产物执行，`model_usage.usage_status = not_used`，Token 和 cost 均为 null；不承诺固定播放耗时）

页面会读取：

- `outputs/portfolio_evidence_pack.json`
- `outputs/artifact_validation_report.json`
- `outputs/failure_scenario_test_report.json`
- `outputs/workflow_metrics_report.json`
- `outputs/worktrace.json`
- `outputs/worktrace_failure_scenario.json`
- `outputs/runtime_execution.json`

无法读取时会显示“数据加载失败”或 N/A，不应回退到旧 Evidence 数值，但录屏前应通过本地服务器访问，以展示真实项目数据。

## 页面信息架构

六个主区：

1. 项目概览 / Overview
2. 为什么做 / Why
3. 如何实现 / How
4. 企业治理 / Governance
5. 证据与测评 / Proof
6. 边界与总结 / Boundary

企业治理区包含两个标签：

- 双阶段合规 / Two-stage Compliance
- 失败恢复测试 / Failure Recovery

证据与测评区包含四个标签：

- 证据包 / Evidence Pack
- 验证指标 / Validation Metrics
- 执行追踪 / WorkTrace
- 运行记录 / Runtime

`#how` 已增加“系统分层视图 / System Layers”，放在“架构设计决策 / Architecture Decisions”和“工作流执行图 / Execution Graph”之间。六层架构为：展示层 / Frontend；编排层 / Workflow Orchestration；智能体与技能层 / Agent & Skill；企业治理层 / Governance；测评与证据层 / Evaluation & Evidence；本地产物层 / Artifact Store。本地产物层当前使用本地 JSON / Markdown 产物库，不是企业级数据库或云端存储。

推荐演示路径：先打开 `portfolio/index.html#overview` 说明项目概览，再到 `portfolio/index.html#how` 查看系统分层视图和 Execution Graph，再到 `portfolio/index.html#workflow` 播放 10 个业务阶段的自动演示，随后在 `portfolio/index.html#governance` 展示双阶段合规与失败恢复测试，在 `portfolio/index.html#proof` 展示证据包、验证指标和 WorkTrace，最后到 `portfolio/index.html#boundary` 说明项目边界、个人贡献和后续验证。

## 当前有效数据

- Evidence：150
- Runtime Evidence：13
- JSON：49/49
- Schema：18/18
- 风险：10 + 1
- 自动演示：10 个业务阶段
- Execution Graph：13 个可视节点
- Instrumented Runtime：12 个 measured 节点
- Historical WorkTrace：15 个历史产物节点
- Failure WorkTrace：3 个测试节点
- Runtime duration_ms：12 ms（当前一次本地 instrumented workflow 的实测耗时；不代表模型推理耗时、线上 Agent 延迟、人工审批耗时或业务效率提升）
- Runtime model_usage：`not_used`；Token = null；cost = null
- Runtime run_id / started_at / ended_at：查看 `outputs/runtime_execution.json`，不要写成长期固定 ID
- Failure Test Runtime：58 ms，仅属于本地确定性测试
- Historical Runtime：`historical_not_available`

自动演示将完整业务链路压缩为 10 个业务阶段，用于页面 Demo 展示。Execution Graph 展示 13 个可视节点。Instrumented Runtime 展示 12 个 measured 节点，是本地读取、检查和编排已有产物的运行记录。Historical WorkTrace 展示 15 个历史产物节点，用于审计追踪；它和 10 个自动演示阶段用途不同，不是一一对应关系。Failure WorkTrace 展示 3 个确定性测试节点、`duration_ms = 58` 和 `retry_count = 1`。

## 项目边界

- `validation_status = pass`
- `governance_status = needs_review`
- `production_ready = false`
- `customer_validated = false`
- Human Approval 保持 `overall_decision = needs_revision`、`human_signature = pending`、`reviewer_name = null`、`reviewed_at = null`，不得写成已完成或已通过
- 五个 release gates（final_marketing_copy、final_image_prompt、image_generation、frontend_page、public_release）继续 `blocked`
- 没有实时模型调用；Instrumented Runtime 使用本地产物执行，`model_usage.usage_status = not_used`，Token 和 cost 均为 null
- 没有真实客户业务效果验证
- 这是作品集 Demo，不是生产系统

`artifact_trace_key` 不是运行时 `trace_id`，两个 WorkTrace 的 `trace_id` 均为 null。Schema pass 不代表治理通过；`58 ms` 不是模型推理耗时，也不是完整 Agent Workflow 耗时。

## 实现说明

业务问题、产品定位、Agent/Skill 拆分、工作流、合规、审批和测评方案由项目作者设计。前端和验证脚本使用 Codex 与 OpenClaw 辅助实现。不使用绝对化独立开发等无法准确证明的表述。

## Case Study

- 页面锚点：`portfolio/index.html#case-study`
- 正式文案：`docs/case_study.md`
- 内容边界：`docs/case_study_enrichment_spec.md`

Case Study 数据边界：Evidence 总数为 150，Runtime Evidence 为 13，公开仓库 JSON 解析为 49/49，Schema 映射为 18/18；自动演示为 10 个业务阶段，Execution Graph 为 13 个可视节点，Instrumented Runtime 为 12 个 measured 节点，Historical WorkTrace 为 15 节点，Failure WorkTrace 为 3 个测试节点；Runtime `duration_ms = 12` 只代表当前一次本地 instrumented workflow 实测耗时，不代表模型推理耗时、线上 Agent 延迟、人工审批耗时或业务效率提升；`production_ready = false`，`customer_validated = false`。Case Study 不生成最终营销文案、最终图片 Prompt、图片、电商落地页或公开发布素材，五个 release gates 继续 blocked。

## 相关材料

- Case Study 页面锚点：`portfolio/index.html#case-study`
- Case Study 文案：`docs/case_study.md`
- Case Study Enrichment Spec：`docs/case_study_enrichment_spec.md`
- WorkTrace Viewer：`portfolio/index.html#worktrace`
- 录屏脚本：`docs/demo_recording_script.md`
- 面试展示提纲：`docs/interview_presentation_outline.md`
- 面试展示文稿：`outputs/ecommerce_agent_interview_deck.pptx`
- 工作流图：`docs/workflow_diagram.md`
- 最终证据包：`outputs/portfolio_evidence_pack.md`
- Historical WorkTrace Report：`outputs/worktrace.md`
- Failure Scenario WorkTrace Report：`outputs/worktrace_failure_scenario.md`
- 失败场景测试报告：`outputs/failure_scenario_test_report.md`
- 工作流指标报告：`outputs/workflow_metrics_report.md`
