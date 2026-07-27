# Step 12: Planner Agent 执行计划

## 1. Planner Agent 职责边界

Planner Agent 是 **E-commerce Growth Agent Studio / 电商增长 Agent 工作台** 的 V2 编排规划节点。它不重做前 11 步，也不生成最终创意资产，而是把已完成的结构化 Brief、洞察、卖点、平台策略、创意结构、合规报告、增长指标和最终创意包报告整理成一个可执行、可审核、可测评的工作流计划。

本节点负责：

- 拆解 Agent Workflow 的执行任务。
- 定义节点之间的串行、并行和条件路由关系。
- 明确每个节点读取哪些文件、输出什么结构化产物、交给谁使用。
- 将高风险字段路由到 Brand Compliance Agent 和 Human Approval Node。
- 为 Human Approval Node、Growth Evaluation Agent、Final Report Generator 准备交接字段。
- 定义 Agent 工作流测评指标，例如任务完成率、平均耗时、人工修改率、幻觉率、合规拦截率、字段完整率和失败原因归因。

本节点不负责：

- 最终营销文案。
- 最终图片 Prompt。
- 图片生成。
- 前端页面。
- 公开发布素材。
- 重新执行 Steps 1-11。
- 执行 Human Approval Node。
- 执行 Growth Evaluation Agent。

## 2. 本次任务输入

本次 Planner Agent 继承以下已完成项目产物：

- `PROJECT_MEMORY_FOR_OPENCLAW.md`
- `workflow/agent_workflow.md`
- `workflow/agent_io_contracts.md`
- `sample_brief.json`
- `outputs/standardized_brief_summary.json`
- `outputs/audience_insight.json`
- `outputs/selling_point_matrix.json`
- `outputs/platform_strategy_plan.json`
- `outputs/creative_copy_pack_outline.json`
- `outputs/image_prompt_pack_outline.json`
- `outputs/brand_compliance_report.json`
- `outputs/growth_metrics_plan.json`
- `outputs/final_creative_package_report.json`

当前工作区缺少以下作品集导航文件或重复数据入口，因此本步骤记录缺失但不阻断：

- `README.md`
- `FILE_INDEX.md`
- `docs/clickable_file_index.md`
- `docs/steps_01_to_11_content_index.md`
- `docs/workflow_diagram.md`
- `docs/evaluation_metrics_test_plan.md`
- `docs/enterprise_governance_design.md`
- `data/sample_brief.json`

## 3. V2 工作流执行计划

V2 工作流在原有 Steps 1-11 基础上增加 Planner Agent、Human Approval Node 和 Growth Evaluation Agent，使项目从“结构化创意包报告”升级为“可编排、可审批、可测评的企业 Agent 工作流”。

推荐执行路径：

```text
sample_brief.json
  |
  v
Brief Parser Agent
  |
  v
+--------------------------+------------------------------+-------------------------+
| Audience Insight Skill   | Selling Point Analyst Agent  | Platform Strategy Skill |
+--------------------------+------------------------------+-------------------------+
  |                          |                              |
  +--------------------------+------------------------------+
                             |
                             v
                     Creative Agent
                             |
                             v
                    Brand Compliance Agent
                             |
                             v
                      Human Approval Node
                             |
               +-------------+-------------+
               |                           |
               v                           v
        Image Prompt Skill          Growth Evaluation Agent
               |                           |
               +-------------+-------------+
                             |
                             v
                    Final Report Generator
```

关键规则：

1. Brief Parser Agent 必须先执行，因为所有下游节点依赖标准化 Brief。
2. Audience Insight Skill、Selling Point Analyst Agent、Platform Strategy Skill 可在标准化 Brief 之后并行执行。
3. Creative Agent 必须等待用户洞察、卖点矩阵和平台策略汇总后再执行。
4. Brand Compliance Agent 必须在 Human Approval Node 前执行。
5. Human Approval Node 必须记录 `approved`、`needs_revision` 或 `blocked`，并决定哪些结构化字段可以继续进入视觉 Prompt 规划和增长测评。
6. Image Prompt Skill 在 V2 中仍保持单一节点，不拆分为多个视觉节点，并且必须在 Human Approval Node 后执行。
7. Growth Evaluation Agent 必须读取 Brand Compliance 合规结论和 Human Approval 人工审批结果后再测评工作流表现。
8. Final Report Generator 汇总 Planner、审批、测评和最终产物索引。

## 4. 并行与串行节点说明

### 4.1 串行起点：Brief Parser Agent

- 读取：`sample_brief.json`、`schemas/product_brief.schema.json`
- 输出：`outputs/standardized_brief_summary.json`
- 阻断规则：如果必填字段缺失或 Schema 校验失败，工作流停在 Brief Parser。

### 4.2 并行分析组

Brief 标准化后，以下节点可并行：

- Audience Insight Skill
- Selling Point Analyst Agent
- Platform Strategy Skill

并行原因：三者都可以读取标准化 Brief，并分别生成用户洞察、卖点分析和平台策略，互相补充但不必完全串行等待。

### 4.3 创意与合规串行链

并行分析完成后进入串行链：

1. Creative Agent：只生成文案模块结构，不生成最终文案。
2. Brand Compliance Agent：审查文案结构和视觉结构风险。
3. Human Approval Node：由运营、品牌、法务/合规、素材授权角色进行分工审批。

### 4.4 审批后条件节点

Human Approval Node 之后才能进入：

- Image Prompt Skill：仍为单一节点；只在审批通过后继续，不直接生成最终图片 Prompt 或图片。
- Growth Evaluation Agent：根据审批结果、合规拦截和字段完整度测评工作流质量。
- Final Report Generator：输出 V2 工作流最终报告。

## 5. 风险预算与审批计划

Planner Agent 将以下高风险字段统一路由到 Brand Compliance Agent 和 Human Approval Node：

| 风险字段 | 风险等级 | 主要问题 | 审批角色 |
| --- | --- | --- | --- |
| 高清 / 全景等画质参数 | major | 不能作为商品名称或默认事实；只有原始 Brief 明确提供证明时，才能作为待审核参数，否则标记为 needs_review 或 blocked | 品牌、法务/合规 |
| 防水 / 防抖 / 耐用 | critical | 可能暗示任何场景防水、防摔、稳定或不会损坏 | 运营、品牌、法务/合规 |
| AI 自动剪辑 | major | 可能暗示保证爆款、无需学习或专业结果 | 品牌、法务/合规 |
| GMV / 转化 / 流量 / CTR / CVR | critical | 只能作为观测和实验指标，不能作为结果承诺 | 运营、法务/合规 |
| 品牌 Logo / 名人肖像 / 商标 / 肖像权 | critical | 涉及 IP、商标、肖像和授权风险 | 素材授权、品牌、法务/合规 |
| 商品图 / App 截图 / 场景样片 / 达人素材 | critical | 最终多模态素材必须保留来源和使用权证明 | 素材授权、品牌、法务/合规 |

审批分工：

- **运营**：确认活动目标、渠道优先级、内容格式、节奏和 KPI 仅作为观测指标。
- **品牌**：确认品牌语气、定位、卖点优先级和视觉表达边界。
- **法务/合规**：确认性能声明、AI 能力、商业结果、竞品比较和广告合规边界。
- **素材授权**：确认 Logo、商品图、App 截图、场景样片、达人/模特/名人肖像和素材来源授权。

## 6. Agent 测评目标

Growth Evaluation Agent 后续应围绕以下指标测评 Agent 工作流，而不是承诺真实商业结果：

- **任务完成率**：计划节点中成功产出有效结构化 artifact 的比例。
- **平均耗时**：每个节点和整体工作流从开始到有效输出的耗时。
- **人工修改率**：人工审核后修改字段占比。
- **幻觉率**：未被 Brief、上游 artifact、证明材料或审批结果支持的 claim / 素材 / 假设占比。
- **合规拦截率**：Brand Compliance 或 Human Approval 在最终生成前拦截风险项的比例。
- **字段完整率**：每个 artifact 和交接包中必填字段的完整程度。
- **失败原因归因**：按缺失字段、无依据 claim、素材授权缺口、Schema 错误、依赖缺失、人审拒绝等原因分类。

## 7. 下游交接字段

### 7.1 交给 Human Approval Node

- `risk_budget.high_risk_fields`
- `brand_compliance_report.approval_status`
- `brand_compliance_report.risk_items`
- `creative_copy_pack_outline.claim_source_map`
- `image_prompt_pack_outline.asset_dependency_map`
- `platform_strategy_plan.metric_language_constraints`
- `blocked_items`

用途：让人工审批角色确认 claim、合规风险、素材授权、平台指标和下一步允许节点。

### 7.2 交给 Growth Evaluation Agent

- `workflow_routing.routing_rules`
- `node_execution_plan`
- `parallel_execution_groups`
- `human_approval_result.status`
- `evaluation_targets.agent_workflow_metrics`
- `blocked_items`
- `risk_budget.high_risk_fields`

用途：评估工作流效率、输出质量、风险拦截、字段完整度和失败原因。

### 7.3 交给 Final Report Generator

- `planner_scope`
- `source_files`
- `workflow_routing`
- `node_execution_plan`
- `human_approval_plan`
- `evaluation_targets`
- `blocked_items`
- `downstream_handoff`

用途：生成 V2 工作流报告，展示企业级 Agent 编排、治理、审批和测评能力。

## 8. 当前不能生成的内容

继承 Brand Compliance Agent 和 Growth Metrics Agent 的阻断结论，当前仍不能生成：

- 最终营销文案。
- 小红书正文。
- 抖音脚本。
- 直播间销售话术。
- 最终图片 Prompt。
- 具体图片描述正文。
- 生成图片。
- 前端页面。
- 公开发布素材。
- 真实广告投放。

原因：高清/全景等画质参数、防水/防抖/耐用、AI 自动剪辑、平台商业结果、品牌 Logo、名人肖像、商品图、App 截图、场景样片等字段仍需要证明材料、素材授权和 Human Approval。

## 9. 本步骤产物

Step 12 已生成：

- `prompts/planner_agent.md`
- `outputs/planner_execution_plan.json`
- `outputs/planner_execution_plan.md`

Planner Agent 完成并修订后，项目的下一步只能是：

1. Step 13：Human Approval Node。

## 10. Step 12 修订状态

Step 12 已在原文件基础上完成修订并通过验收。该报告完成时的下一节点为 Step 13；目前 Steps 13-15 均已完成，两周作品集 Demo 已完整交付，后续只做验证扩展。
