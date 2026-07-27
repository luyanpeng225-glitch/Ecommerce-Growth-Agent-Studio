# Agent Workflow

本文档说明 E-commerce Growth Agent Studio 如何从 `data/sample_brief.json` 出发，经过一组可编排 Agent / Skills，形成可审核、可复用、可评估的电商增长创意包工作流。

当前版本为 V2 工作流：在原有 11 步 MVP 的基础上，加入 `Planner Agent`、`Human Approval Node` 和 `Growth Evaluation Agent`，使项目更贴近字节、腾讯、金山等岗位对 Agent Workflow、Skills 体系、人工确认和测评闭环的要求。

重要边界：

- 本项目是 ToB 电商增长 Agent 工作台，不是个人文案生成器。
- 示例商品保持为泛化的 `运动相机`，不绑定单一品牌或具体商品型号。
- 本阶段不生成最终营销文案、不生成最终图片 Prompt、不生成图片、不做公开发布。
- `Image Prompt Skill` 保留为单一节点，不拆成两个视觉节点。

## 1. 工作流目标

E-commerce Growth Agent Studio 要解决的不是“写一段广告文案”，而是把企业商品 Brief 标准化后，交给多个职责清晰的 Agent / Skill，逐步完成：

- Brief 校验与结构化。
- Planner 任务拆解、路由、预算和风险预判。
- 用户洞察、卖点分析和平台策略并行处理。
- 创意内容结构规划，而不是直接生成最终文案。
- Brand Compliance Agent 的双阶段治理：先做 `pre_check`，后做 `post_generation_check`。
- 单一 Image Prompt Skill 输出视觉素材结构与受控 Prompt 前置条件。
- 品牌合规审核和人工审批。
- Growth Evaluation Agent 输出工作流测评、指标来源分级、Rubric、问题归因和迭代建议。
- Final Report Generator 汇总可审计的结构化创意包。

当前状态：Steps 1-15 已完成；V2 Final Report Generator 已完成；项目总体状态为 `needs_review`。Steps 1-15 是已经完成的历史执行产物，不得改写为双阶段合规已经在当时真实运行；新增 `pre_check` 和 `post_generation_check` 属于 `retrospective_design_validation`，其 `historical_execution_claimed = false`。双阶段链路是后续正式工作流目标设计，不是 Step 16，也不是新的历史步骤。最终生成和公开发布继续 `blocked`；后续只做验证扩展，不再增加必做 Agent 节点。

最终交付物是一个可审阅、可追踪、可复盘的创意包报告结构，后续才进入真实文案、图片和页面生成。

## 2. 输入与前置校验

起点文件：`data/sample_brief.json`

校验文件：`schemas/product_brief.schema.json`

输入 Brief 必须覆盖以下业务维度：

- 商品基础信息：行业、品类、上市阶段、目标区域、语言。
- 商品价值信息：核心功能、证明点、用户利益、规格、套装、售卖状态。
- 用户与场景：目标人群、需求、痛点、购买触发点、使用场景。
- 竞争与定位：竞品、差异化、定位句、禁止表达。
- 平台与增长：渠道、内容格式、KPI、预算级别、活动节奏。
- 品牌与合规：品牌语气、视觉风格、素材要求、合规规则、负向约束。
- Workflow 控制：启用 Skills、期望产物、审核模式、置信度阈值。

若校验失败，工作流停在 Brief Parser Agent，并输出缺失字段和修复建议。

## 3. 正式目标工作流

```text
Brief Parser Agent
  -> Brand Compliance Agent（pre_check）
  -> Planner Agent
  -> Audience Insight / Selling Point / Platform Strategy
  -> Creative Agent
  -> 单一 Image Prompt Skill
  -> Brand Compliance Agent（post_generation_check）
  -> Human Approval Node
  -> Growth Evaluation Agent
  -> Final Report Generator
```

说明：

- 两次 Compliance 是同一个 `Brand Compliance Agent` 的两次调用，通过 `compliance_mode = pre_check | post_generation_check` 区分运行位置。
- 不是两个 Compliance Agent，也不新增第二个合规节点身份。
- `Image Prompt Skill` 仍然只有一个；不拆分、不恢复两个视觉 Skill。
- `Human Approval Node` 仍是正式人工审批节点，位于 post-generation compliance 之后。
- `Two-stage Compliance Optimization` 是后续正式工作流目标设计和验证扩展，不是 Step 16。
- Steps 1-15 是已经完成的历史执行产物；不得把历史执行顺序改写成双阶段合规已经在当时真实运行。
- 新增 `outputs/brand_compliance_pre_check.*`、`outputs/brand_compliance_post_generation_check.*` 和 `outputs/two_stage_compliance_validation_report.*` 均为 `retrospective_design_validation`；`historical_execution_claimed = false`。
- 项目总体状态仍为 `needs_review`。

历史 V2 产物中，Brand Compliance 曾作为 Step 9 单次合规报告存在；正式目标工作流将同一个 Agent 拆成 pre-check 与 post-generation-check 两次调用，但不回写历史执行事实。

当前双阶段验证结果：JSON 解析 37/37；Schema 映射 11/11；`validation_status = pass`；`governance_status = needs_review`；inherited risks 10；resolved risks 0；unresolved risks 10；newly detected risks 1；新增风险 `risk_traceability_gap` 是治理发现，不是结构验证失败。

release gates 保持不变：最终营销文案 blocked；最终图片 Prompt blocked；图片生成 blocked；前端页面 blocked；公开发布 blocked。没有真实客户验证，没有生产运行数据；商品名称只使用“运动相机”；不新增或恢复不受支持的参数表述。

## 4. V2 分阶段设计

### 4.1 Brief Parser Agent

作用：将 `data/sample_brief.json` 转成标准化商品对象。

输入：

- `data/sample_brief.json`
- `schemas/product_brief.schema.json`

处理逻辑：

- 执行 JSON Schema 校验。
- 判断必填字段、枚举字段、数组字段和嵌套对象是否合规。
- 抽取行业、商品、目标人群、渠道、合规和工作流控制字段。
- 标记缺失字段、风险字段和下游可用性。

输出：

- `outputs/standardized_brief_summary.json`
- `outputs/brief_parser_report.md`

下游使用方：Brand Compliance Agent（pre_check）、Planner Agent、Final Report Generator。

### 4.2 Planner Agent

作用：把标准化 Brief 转成可执行的 Agent 任务计划。

输入：

- `outputs/standardized_brief_summary.json`
- Workflow 控制字段
- 企业审核模式、渠道范围、预算级别和风险字段

处理逻辑：

- 判断本次任务需要调用哪些 Skills。
- 将任务拆成分析、策略、创意、合规、审批、评估和报告阶段。
- 为每个节点指定输入、输出、成功条件、失败回退和人工确认点。
- 标记哪些任务可以并行，哪些必须串行。
- 生成本次执行的 trace id、任务预算、风险优先级和测评目标。

输出：

- `prompts/planner_agent.md`
- `outputs/planner_execution_plan.json`
- `outputs/planner_execution_plan.md`

当前状态：Step 12 已完成、修订并验收，JSON 已通过合法性检查。

下游使用方：Audience Insight Skill、Selling Point Analyst Agent、Platform Strategy Skill、Human Approval Node、Growth Evaluation Agent。

### 4.3 Audience Insight Skill

作用：把商品和目标人群转成内容与增长可用的用户洞察。

输入：

- 标准化商品对象
- Planner 任务计划
- `target_audiences`
- `usage_scenarios`
- `decision_factors`
- `barriers`
- `channels`

输出：

- `outputs/audience_insight.json`
- `outputs/audience_insight_report.md`

下游使用方：Creative Agent、Growth Evaluation Agent、Final Report Generator。

### 4.4 Selling Point Analyst Agent

作用：把商品功能转成用户可感知、平台可传播、合规可审核的卖点矩阵。

输入：

- 标准化商品对象
- Planner 任务计划
- 用户洞察报告
- `core_features`
- `specs`
- `competitors`
- `differentiators`

输出：

- `outputs/selling_point_matrix.json`
- `outputs/selling_point_matrix.md`

下游使用方：Creative Agent、Brand Compliance Agent、Growth Evaluation Agent。

### 4.5 Platform Strategy Skill

作用：把渠道、KPI 和内容格式转成分平台增长策略。

输入：

- 标准化商品对象
- Planner 任务计划
- 用户洞察报告
- 卖点矩阵
- `channels`
- `campaign_goal`
- `primary_kpis`
- `secondary_kpis`

输出：

- `outputs/platform_strategy_plan.json`
- `outputs/platform_strategy_plan.md`

下游使用方：Creative Agent、Human Approval Node、Growth Evaluation Agent。

### 4.6 Creative Agent

作用：生成创意内容包的结构化任务规格，而不是直接写最终营销文案。

输入：

- 用户洞察
- 卖点矩阵
- 平台策略
- 品牌语气
- 内容格式
- 禁止表达
- 负向约束

处理逻辑：

- 按平台和内容格式拆出内容模块。
- 规定每个模块需要覆盖的人群、卖点、语气、CTA 和证明点。
- 建立 claim 来源映射，方便合规审核和人工审批。
- 保留标题、短视频脚本、商品页文案、直播话术、达人 Brief 等未来生成任务的占位结构。

输出：

- `outputs/creative_copy_pack_outline.json`
- `outputs/creative_copy_pack_outline.md`

下游使用方：Brand Compliance Agent、Human Approval Node、Growth Evaluation Agent、Final Report Generator。

### 4.7 Brand Compliance Agent（同一 Agent 的双阶段调用）

作用：在企业工作流中提供品牌、广告法和平台内容安全审核。正式目标工作流中它以同一个 Agent 身份运行两次：`pre_check` 在 Brief Parser 之后、Planner 之前；`post_generation_check` 在单一 Image Prompt Skill 之后、Human Approval Node 之前。

输入：

- 标准化商品对象
- 卖点矩阵
- 创意内容结构
- `do_not_claim`
- `compliance_rules`
- `negative_constraints`

处理逻辑：

- 检查绝对化用语、夸大承诺、竞品攻击、收益暗示、参数无证明和视觉侵权风险。
- 给风险分级，并说明触发原因。
- 对可修复问题给出替代表达方向或视觉调整方向。
- 判断是否允许进入人工审批。

输出：

- 历史 Step 9：`outputs/brand_compliance_report.json`、`outputs/brand_compliance_report.md`。
- 目标工作流 pre-check：`outputs/brand_compliance_pre_check.json`、`outputs/brand_compliance_pre_check.md`。
- 目标工作流 post-generation-check：`outputs/brand_compliance_post_generation_check.json`、`outputs/brand_compliance_post_generation_check.md`。
- 双阶段验证：`outputs/two_stage_compliance_validation_report.json`、`outputs/two_stage_compliance_validation_report.md`。

下游使用方：pre-check 下游为 Planner Agent；post-generation-check 下游为 Human Approval Node、Growth Evaluation Agent、Final Report Generator。

### 4.8 Human Approval Node

作用：把企业侧人工确认放进 Agent Workflow，而不是把人工审核当成流程外动作。

输入：

- Planner 任务计划
- 创意内容结构
- 合规报告
- 平台策略
- 高风险 claim、素材授权需求和证明材料需求

处理逻辑：

- 展示需要业务、法务、品牌或运营确认的项目。
- 将每个审批项标记为 `approved`、`needs_revision` 或 `blocked`。
- 记录审批人角色、审批时间、审批原因和修改意见。
- 只有审批通过的结构化任务才能进入 Image Prompt Skill。

输出：

- `outputs/human_approval_record.json`（后续可补）
- `docs/enterprise_governance_design.md` 中的审批规则可作为当前设计依据。

下游使用方：Image Prompt Skill、Growth Evaluation Agent、Final Report Generator。

### 4.9 Image Prompt Skill

作用：设计可审计的视觉素材结构，让后续图片 Prompt 生成、合规审核和素材复盘能够服务电商内容与平台策略。

V2 约束：

- 保留单一 Image Prompt Skill。
- 不拆成 `Visual Structure Skill` 和 `Controlled Image Prompt Skill`。
- 本阶段仍不生成模型可直接使用的最终图片 Prompt。
- 正式目标工作流中，该节点位于 Creative Agent 之后、Brand Compliance Agent（post_generation_check）之前；它仍然只生成视觉素材结构和受控 Prompt 前置条件，不生成最终图片 Prompt。

输入：

- 商品信息
- 视觉风格
- 使用场景
- 必备素材
- 卖点矩阵
- 平台策略
- 合规规则
- 人工审批记录

输出：

- `outputs/image_prompt_pack_outline.json`
- `outputs/image_prompt_pack_outline.md`

下游使用方：Growth Evaluation Agent、Final Report Generator。图片生成仍属于未来阶段。

### 4.10 Growth Evaluation Agent

作用：把增长指标和 Agent 测评合并成可复盘的评估层。

输入：

- Planner 任务计划
- 各节点输出
- 合规报告
- 人工审批记录
- 指标规划
- 测试样本和审计日志

处理逻辑：

- 评估业务指标：CTR、CVR、内容生产耗时、审核通过率、素材复用率、人工修改率。
- 评估 Agent 指标：任务完成率、字段完整率、幻觉率、合规拦截率、人工返工率、失败原因。
- 对失败样本做问题归因：输入缺失、Planner 路由错误、卖点证据不足、合规阻断、人工审批未通过。
- 输出下一轮迭代建议，让项目兼具电商增长和 Agent 测评体系。

输出：

- `prompts/growth_evaluation_agent.md`
- `outputs/growth_evaluation_report.json`
- `outputs/growth_evaluation_report.md`

已读取但不覆盖：

- `outputs/growth_metrics_plan.json`
- `docs/evaluation_metrics_test_plan.md`
- `data/evaluation_metrics_sample.csv`
- `data/audit_log_sample.json`

下游使用方：Final Report Generator、后续测评体系扩展。

### 4.11 Final Report Generator

作用：汇总所有中间产物，形成作品集可展示、企业团队可审阅的工作流报告。

输入：

- Brief Parser 输出
- Planner 任务计划
- Audience / Selling Point / Platform 三个分析节点输出
- Creative Agent 输出
- Brand Compliance 输出
- Human Approval 记录
- Image Prompt Skill 输出
- Growth Evaluation 输出

输出：

- `outputs/final_creative_package_report.json`（V1 Steps 1-11 历史报告）
- `outputs/final_creative_package_report.md`（V1 Steps 1-11 历史报告）
- `outputs/v2_final_report.json`（V2 最终汇总报告）
- `outputs/v2_final_report.md`（V2 最终汇总报告）
- `docs/final_report_navigation.md`

下游使用方：作品集展示、企业 Demo 汇报、后续 Agent 测评扩展。

## 5. 数据流与产物索引

| 顺序 | 节点 | 输入产物 | 输出产物 | 主要下游 |
| --- | --- | --- | --- | --- |
| 1 | Brief Parser Agent | `data/sample_brief.json` | `standardized_brief_summary.json` | Planner、报告 |
| 2 | Brand Compliance Agent（pre_check） | 标准化 Brief + 合规约束 | `brand_compliance_pre_check.json` | Planner |
| 3 | Planner Agent | 标准化 Brief + pre-check 风险 | `planner_execution_plan.json` | 全部执行节点 |
| 3 | Audience Insight Skill | Brief + Planner | `audience_insight.json` | Creative、评估 |
| 4 | Selling Point Analyst Agent | Brief + Planner + 洞察 | `selling_point_matrix.json` | Creative、合规 |
| 5 | Platform Strategy Skill | Brief + Planner + 洞察 + 卖点 | `platform_strategy_plan.json` | Creative、审批 |
| 6 | Creative Agent | 洞察 + 卖点 + 策略 | `creative_copy_pack_outline.json` | 合规、审批 |
| 7 | Image Prompt Skill（单一） | 创意结构 + 视觉约束 | `image_prompt_pack_outline.json` | post-check、评估 |
| 8 | Brand Compliance Agent（post_generation_check） | 创意结构 + 单一 Image Prompt Skill 输出 + inherited risks | `brand_compliance_post_generation_check.json` | 审批、评估 |
| 9 | Human Approval Node | post-check 合规报告 + 创意结构 | `human_approval_record.json` | 评估、报告 |
| 10 | Growth Evaluation Agent | Planner + 合规 + 人审 + 测试数据 | `growth_evaluation_report.json` | 报告、迭代 |
| 11 | Creative Package Reporter | Steps 1-10 中间产物 | `final_creative_package_report.md` | V1 报告、作品集 |
| 12 | Planner Agent | V1 artifacts + 项目约束 | `planner_execution_plan.json` | 审批、测评 |
| 13 | Human Approval Node | Planner + 合规报告 | `human_approval_record.json` | 测评、报告 |
| 14 | Growth Evaluation Agent | Planner + 合规 + 人审 + 测评样本 | `growth_evaluation_report.json` | V2 报告、迭代 |
| 15 | V2 Final Report Generator | Planner + 人审 + 测评 + V1 Artifact Index | `v2_final_report.md` | 作品集、Demo 汇报 |

注：`planner_execution_plan.json` 已在 Step 12 完成；`human_approval_record.json` 已在 Step 13 完成；`growth_evaluation_report.json` 已在 Step 14 完成。已有 Steps 1-11 产物继续作为 V2 的上游资产使用。

## 6. 审核与回退机制

当节点输出 `status = needs_review` 时，工作流继续向下游传递，但最终报告必须显示风险和人工审核项。

当节点输出 `status = blocked` 时，工作流回退：

- Brief Parser Agent blocked：回到 `data/sample_brief.json` 补字段。
- Planner Agent blocked：重新拆解任务、压缩范围或调整节点顺序。
- Audience Insight Skill blocked：补充人群、场景或购买阻力。
- Selling Point Analyst Agent blocked：补充证明点、规格或竞品信息。
- Platform Strategy Skill blocked：补充渠道、KPI、预算或活动周期。
- Creative Agent blocked：补充品牌语气、内容格式或禁用表达。
- Brand Compliance Agent blocked：调整卖点、内容结构、视觉素材结构或最终生成前置条件。
- Human Approval Node blocked：回到 Creative Agent 或 Brand Compliance Agent 修改。
- Image Prompt Skill blocked：补充视觉风格、素材依赖、证明材料或授权信息。
- Growth Evaluation Agent blocked：补充测试样本、指标口径、审计日志或失败标签。

## 7. 作品集呈现重点

本工作流适合在作品集中体现以下能力：

- ToB 产品思维：标准输入、结构化产物、权限审批、审计记录、团队协作。
- Agent Workflow：Planner 编排、多 Agent 分工、上下游依赖、失败回退。
- Skills 体系：把用户洞察、卖点分析、平台策略、图片 Prompt、合规审核和增长评估抽象成可复用能力。
- Agent 测评：不仅展示“能生成”，还展示任务完成率、平均耗时、人工修改率、幻觉率和合规拦截率。
- 电商增长场景：从商品 Brief 连接到种草、承接、转化、复盘。
- 可扩展 Demo：当前 Demo 是运动相机，后续可替换为美妆、服饰、食品饮料、家电或 B2B SaaS 商品。

## 8. 当前进度与下一步

Steps 1-15 已完成。V2 Final Report Generator 已完成，项目总体状态为 `needs_review`。

两周作品集 Demo 已完整交付，但不代表生产系统上线。后续只做验证扩展，例如新增 benchmark case、补字段级 trace、补真实审批与授权证据、补测评数据；不再增加必做 Agent 节点。

仍然不要生成最终营销文案、最终图片 Prompt、图片、前端页面或公开发布素材，除非未来补齐证明材料、素材授权和 human-in-the-loop 审核。没有真实客户验证，没有生产运行数据；商品名称只使用“运动相机”，不新增或恢复不受支持的参数表述。
