# Agent / Skill I/O Contracts

本文档定义 E-commerce Growth Agent Studio 中每个 Agent / Skill 的职责边界、输入输出协议和交付物名称。项目主线是“电商增长 Agent 工作台”，`运动相机` 只是第一个行业 Demo，用于验证智能影像设备新品上市场景。V2 在原 MVP 契约上新增 Planner、Human Approval、Growth Evaluation 和 V2 Final Report Generator；Steps 1-15 均已完成。项目总体状态为 `needs_review`，两周作品集 Demo 已完整交付，但不代表生产系统上线。Steps 1-15 是历史执行产物；双阶段 Brand Compliance 是后续正式目标工作流设计，新增产物均为 `retrospective_design_validation`，`historical_execution_claimed = false`。

本阶段只定义工作流规范，不生成最终营销文案、不搭建前端页面、不编写复杂后端代码。

## 1. 通用契约

### 1.1 输入基线

所有节点默认接收以下上下文：

```json
{
  "brief_id": "string",
  "workflow_version": "string",
  "project_name": "string",
  "industry": "string",
  "scenario_type": "string",
  "product_name": "string",
  "product_category": "string",
  "launch_stage": "pre_launch | launch | growth | mature",
  "target_regions": ["string"],
  "language": "string",
  "review_mode": "auto | human_in_loop | strict",
  "confidence_threshold": 0.82
}
```

### 1.2 输出信封

每个 Agent / Skill 输出统一采用结构化信封，方便在作品集里展示“可追踪、可审计、可编排”的 ToB Agent Workflow 能力。

```json
{
  "artifact_name": "string",
  "artifact_version": "0.1.0",
  "brief_id": "string",
  "producer": "agent_or_skill_name",
  "status": "pass | needs_review | blocked",
  "confidence": 0.0,
  "inputs_used": ["field_or_artifact_name"],
  "summary": "string",
  "data": {},
  "risks": [],
  "next_actions": []
}
```

### 1.3 状态规则

`pass` 表示产物可进入下游节点；`needs_review` 表示可继续流转，但最终报告应提示人工审核；`blocked` 表示关键字段缺失、合规冲突或输出不可用，需要回到上游补充 Brief。

## 2. Brief Parser Agent

作用：校验 `sample_brief.json` 是否符合标准输入结构，并转成下游统一可读的商品 Brief 对象。

输入字段：

- 原始文件：`sample_brief.json`
- Schema：`schemas/product_brief.schema.json`
- 关键字段：基础信息、商品信息、目标用户、场景、竞品、平台、合规约束、工作流控制字段

处理逻辑：

- 使用 JSON Schema 校验字段类型、必填项、枚举值和数组结构。
- 抽取商品、行业、场景、目标区域、语言和工作流版本。
- 标记缺失字段、低置信字段、合规敏感字段和下游依赖字段。
- 将 Demo 商品信息归一化为行业无关的 `standardized_product_brief`，避免工作流只服务单一相机品类。

输出字段：

- `standardized_product_brief`
- `field_completeness_score`
- `missing_fields`
- `risk_fields`
- `downstream_readiness`

输出格式：JSON

交付物名称：`standardized_brief_summary.json`

下游使用方：Planner Agent、Audience Insight Skill、Selling Point Analyst Agent、Platform Strategy Skill、Brand Compliance Agent、Creative Package Reporter

## 3. Audience Insight Skill

作用：把商品 Brief 中的人群、场景和购买阻力转成电商增长可用的用户洞察。

输入字段：

- `standardized_product_brief`
- `target_audiences`
- `usage_scenarios`
- `decision_factors`
- `barriers`
- `channels`
- `campaign_goal`

处理逻辑：

- 按用户分层识别核心需求、痛点、内容兴趣和购买触发点。
- 区分认知、兴趣、比较、购买四个阶段的内容诉求。
- 为每个人群生成可服务平台策略和创意生成的洞察标签。
- 标记需要事实证明的洞察，避免把假设包装成确定结论。

输出字段：

- `audience_segments`
- `need_pain_trigger_map`
- `content_interest_tags`
- `purchase_journey_notes`
- `insight_assumptions`

输出格式：JSON + Markdown 摘要

交付物名称：`audience_insight_report.md`

下游使用方：Selling Point Analyst Agent、Platform Strategy Skill、Creative Copy Agent、Image Prompt Skill、Growth Metrics Agent、Creative Package Reporter

## 4. Selling Point Analyst Agent

作用：将功能参数、用户痛点和差异化定位转成卖点优先级和功能到利益点的映射。

输入字段：

- `standardized_product_brief`
- `core_features`
- `specs`
- `competitors`
- `differentiators`
- `positioning_statement`
- `audience_insight_report`

处理逻辑：

- 按“功能 -> 证据 -> 用户利益 -> 场景 -> 合规边界”生成卖点矩阵。
- 根据目标人群、购买阻力和平台目标评估卖点优先级。
- 区分主卖点、辅助卖点、证明点和不建议强化的弱卖点。
- 标记需要素材、参数或第三方证明支撑的表达。

输出字段：

- `selling_point_matrix`
- `priority_score`
- `feature_benefit_mapping`
- `proof_requirements`
- `claim_risk_notes`

输出格式：JSON + Markdown 表格

交付物名称：`selling_point_matrix.md`

下游使用方：Platform Strategy Skill、Creative Copy Agent、Image Prompt Skill、Brand Compliance Agent、Creative Package Reporter

## 5. Platform Strategy Skill

作用：根据平台、KPI、内容格式和用户旅程，设计分平台增长策略。

输入字段：

- `standardized_product_brief`
- `channels`
- `campaign_goal`
- `primary_kpis`
- `secondary_kpis`
- `budget_level`
- `timeline`
- `audience_insight_report`
- `selling_point_matrix`

处理逻辑：

- 将渠道划分为种草、承接、转化、复盘等角色。
- 为每个平台匹配内容形式、主卖点、目标人群、节奏和指标。
- 设计从内容曝光到商品点击、加购、成交或线索转化的路径。
- 输出可给创意生成节点使用的平台约束，而不是直接写最终文案。

输出字段：

- `platform_strategy_plan`
- `channel_role_map`
- `content_format_requirements`
- `funnel_mapping`
- `cadence_recommendations`
- `platform_constraints`

输出格式：JSON + Markdown 策略说明

交付物名称：`platform_strategy_plan.md`

下游使用方：Human Approval Node、Growth Metrics Agent、Growth Evaluation Agent、Creative Package Reporter。Image Prompt Skill 只能在人工审批放行后运行。

## 6. Creative Copy Agent

作用：基于卖点和平台策略生成创意文案包的结构化草稿，但本阶段只定义输出结构，不提前生成最终营销文案。

输入字段：

- `brand_voice`
- `content_formats`
- `selling_point_matrix`
- `platform_strategy_plan`
- `audience_insight_report`
- `do_not_claim`
- `negative_constraints`

处理逻辑：

- 为每种内容格式定义应包含的模块、语气、卖点顺序和转化动作。
- 按平台约束拆分标题、短视频脚本、商品页模块、直播话术、达人 Brief 等产物槽位。
- 为后续合规审核保留 claim 来源、证明需求和风险标签。
- 若 `review_mode` 为 `human_in_loop` 或 `strict`，输出需带审核清单。

输出字段：

- `creative_copy_pack_outline`
- `copy_module_specs`
- `claim_source_map`
- `review_checklist`
- `copy_generation_status`

输出格式：JSON + Markdown 模板

交付物名称：`creative_copy_pack_outline.md`

下游使用方：Brand Compliance Agent、Growth Metrics Agent、Creative Package Reporter

## 7. Image Prompt Skill

作用：把商品、场景、视觉风格和平台要求转成可审计的视觉素材结构，为后续受控图片 Prompt 生成提供字段规范和审核前置条件。

输入字段：

- `product_name`
- `product_category`
- `visual_style`
- `usage_scenarios`
- `required_assets`
- `platform_strategy_plan`
- `selling_point_matrix`
- `negative_constraints`
- `compliance_rules`

处理逻辑：

- 拆分主图、场景图、详情页信息图、短视频分镜画面、直播讲解素材、达人 Brief 配图等素材类型。
- 定义每类视觉素材的画面主体、场景、构图、光线、商品可见性、文字限制和禁止元素。
- 保持电商素材可控，不生成真实品牌 Logo、未经授权名人形象或夸张失真场景。
- 输出视觉素材结构、素材依赖、证明材料等待项和 Prompt 生成前置条件，不在本阶段生成实际图片 Prompt 或图片。

输出字段：

- `image_prompt_pack_outline`
- `visual_asset_structures`
- `multimodal_audit_map`
- `visual_risk_register`
- `forbidden_elements`
- `asset_dependency_map`
- `human_in_the_loop_review`
- `downstream_field_handoff`

输出格式：JSON + Markdown 模板

交付物名称：`image_prompt_pack_outline.md`

下游使用方：Brand Compliance Agent、Creative Package Reporter

## 8. Brand Compliance Agent（同一 Agent，双阶段模式）

作用：检查 Brief、创意内容模块和视觉素材结构是否符合品牌、广告法、平台和企业审核要求。正式目标工作流只保留一个 `Brand Compliance Agent`，通过 `compliance_mode` 区分两次调用；不是两个 Compliance Agent。

### 8.1 通用字段

输入公共字段：

- `brief_id`、`trace_id`、`product_name = 运动相机`
- `do_not_claim`
- `compliance_rules`
- `negative_constraints`
- `standardized_product_brief`
- `risk_register` / `risk_items`

输出公共字段：

- `artifact_name`
- `compliance_mode`: `pre_check | post_generation_check`
- `decision`: `pass | needs_review | blocked`
- `governance_status`: `pass | needs_review | blocked`
- `risk_items`，每项包含稳定 `risk_id`、severity、stage、trigger、status、recommended_action
- `release_gates`：`final_marketing_copy`、`final_image_prompt`、`image_generation`、`frontend_page`、`public_release` 必须继续 `blocked`，直到证明材料、素材授权和真实 human-in-the-loop 审批完成。

### 8.2 `compliance_mode: pre_check`

运行位置：Brief Parser Agent 之后、Planner Agent 之前。

输入：

- `outputs/standardized_brief_summary.json`
- 原始 Brief 中的合规规则、禁用表达、素材要求和证明材料需求
- 商品名统一为“运动相机”

输出文件：

- `outputs/brand_compliance_pre_check.json`
- `outputs/brand_compliance_pre_check.md`

职责：在 Planner 编排前识别证据、素材授权、参数表达、平台风险和禁止承诺，形成可被后续节点继承的 `risk_id` 集合。

### 8.3 `compliance_mode: post_generation_check`

运行位置：单一 Image Prompt Skill 之后、Human Approval Node 之前。

输入：

- `outputs/creative_copy_pack_outline.json`
- `outputs/image_prompt_pack_outline.json`
- `outputs/brand_compliance_pre_check.json` 的 inherited risks
- 卖点矩阵、平台策略和 Brief 合规约束

输出文件：

- `outputs/brand_compliance_post_generation_check.json`
- `outputs/brand_compliance_post_generation_check.md`

职责：复核创意结构和单一 Image Prompt Skill 输出是否继承并处理 pre-check 风险；未解决风险继续传递给 Human Approval Node。

### 8.4 风险继承与验证结果

风险继承规则：

- `pre_check.detected_risks[*].risk_id` 必须在 post-generation 阶段作为 inherited risk 继续追踪。
- resolved、unresolved、newly_detected 三组风险必须可审计且互不混淆。
- `risk_traceability_gap` 是治理发现，不是结构验证失败。

当前双阶段验证产物：

- `outputs/two_stage_compliance_validation_report.json`
- `outputs/two_stage_compliance_validation_report.md`

当前验证结果：

- JSON 解析：37/37
- Schema 映射：11/11
- `validation_status`: `pass`
- `governance_status`: `needs_review`
- inherited risks: 10
- resolved risks: 0
- unresolved risks: 10
- newly detected risks: 1
- 新增风险：`risk_traceability_gap`

边界：最终营销文案 blocked；最终图片 Prompt blocked；图片生成 blocked；前端页面 blocked；公开发布 blocked；没有真实客户验证；没有生产运行数据；不新增或恢复不受支持的参数表述。

## 9. Growth Metrics Agent

作用：把平台策略和创意包结构连接到增长指标、A/B 测试和复盘维度。

输入字段：

- `campaign_goal`
- `primary_kpis`
- `secondary_kpis`
- `platform_strategy_plan`
- `creative_copy_pack_outline`
- `image_prompt_pack_outline`
- `brand_compliance_report`

处理逻辑：

- 按平台和内容格式定义核心指标、辅助指标和观察窗口。
- 设计 A/B 测试变量，例如主卖点、封面风格、开头钩子、价格权益表达、详情页模块顺序。
- 给出埋点、素材命名、复盘看板字段和决策阈值建议。
- 避免承诺具体投放结果，强调企业增长团队可执行的评估闭环。

输出字段：

- `growth_metrics_plan`
- `kpi_mapping`
- `ab_test_plan`
- `tracking_recommendations`
- `review_dashboard_fields`
- `iteration_rules`

输出格式：JSON + Markdown 增长方案

交付物名称：`growth_metrics_plan.md`

下游使用方：Creative Package Reporter、后续投放复盘模块

## 10. Creative Package Reporter

作用：汇总所有中间产物，形成作品集可展示的电商增长创意包报告结构。

输入字段：

- `standardized_brief_summary`
- `audience_insight_report`
- `selling_point_matrix`
- `platform_strategy_plan`
- `creative_copy_pack_outline`
- `image_prompt_pack_outline`
- `brand_compliance_report`
- `growth_metrics_plan`

处理逻辑：

- 按 Brief、洞察、卖点、策略、创意结构、图片 Prompt、合规、增长指标组织报告。
- 保留每个节点的来源、状态、风险和下游依赖。
- 输出企业团队可审阅的执行清单和下一步生成任务。
- 在作品集表达上突出 ToB 工作台、Skills 体系、Agent Workflow 和电商增长场景。

输出字段：

- `final_creative_package_report`
- `artifact_index`
- `workflow_trace`
- `review_summary`
- `execution_checklist`
- `next_generation_tasks`

输出格式：Markdown + JSON artifact index

交付物名称：`final_creative_package_report.md`

下游使用方：作品集展示页、后续创意生成任务、人工审核会、增长复盘流程

## 11. Planner Agent（V2，已完成）

作用：读取标准化 Brief 和既有产物，形成可执行、可回退、可测评的节点计划。

输入字段：

- `standardized_brief_summary`
- Workflow 控制字段、预算和风险字段
- Steps 1-11 的 artifact index、合规状态和下游交接字段

处理逻辑：

- 拆解节点任务并定义串并行关系。
- 为每个节点指定输入、输出、成功条件、失败回退和人工确认点。
- 设置风险优先级、预算边界、trace id 和测评目标。
- 保证 Brand Compliance 位于 Human Approval 之前，单一 Image Prompt Skill 位于人工审批之后。

输出字段：

- `execution_plan`
- `node_dependencies`
- `risk_routing`
- `human_checkpoints`
- `evaluation_targets`

输出格式：JSON + Markdown

交付物名称：`planner_execution_plan.json`、`planner_execution_plan.md`

当前状态：Step 12 已完成、修订并验收。

## 12. Human Approval Node（V2，已完成）

作用：把品牌合规结论转成企业可审计的人工审批记录和放行决定。

输入字段：

- `planner_execution_plan`
- `creative_copy_pack_outline`
- `brand_compliance_report`
- 证明材料、素材授权和人工审核意见

处理逻辑：

- 核对合规阻断项、证明材料和授权状态。
- 记录审批人角色、时间、意见、修改要求和证据引用。
- 使用 `approved`、`needs_revision`、`blocked` 三种审批状态。
- 未获明确放行时，不允许进入最终生成或公开发布。

输出字段：

- `approval_status`
- `review_items`
- `required_revisions`
- `evidence_references`
- `release_conditions`

输出格式：JSON + Markdown

交付物：`human_approval_record.json`、`human_approval_record.md`

当前状态：Step 13 已完成，整体审批状态为 `needs_revision`。结构化规划产物可进入 Growth Evaluation；最终营销文案、最终图片 Prompt、图片生成和公开发布继续 `blocked`。

## 13. Growth Evaluation Agent（V2，已完成）

作用：读取全链路产物、合规状态和人工审批结果，评估增长规划质量与 Agent 过程质量。

输入字段：

- `planner_execution_plan`
- Steps 1-11 的结构化产物
- `brand_compliance_report`
- `human_approval_record`
- `evaluation_metrics_sample.csv`
- `audit_log_sample.json`

处理逻辑：

- 计算任务完成率、平均耗时、人工修改率、幻觉率和合规拦截率。
- 对失败样本做输入、路由、证据、合规和人工审批归因。
- 输出可复现的测评口径、问题清单和迭代建议。
- 不把 mock 数据描述为真实客户业务结果。

输出字段：

- `evaluation_scope`
- `data_quality_summary`
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
- `downstream_handoff`

输出格式：JSON + Markdown

交付物：`growth_evaluation_report.json`、`growth_evaluation_report.md`

当前状态：Step 14 已完成，整体测评状态为 `needs_review`。当前只有“运动相机”一个完整 Demo；“便携投影仪”和“美妆精华”仍为 pending。最终营销文案、最终图片 Prompt、图片生成和公开发布继续 `blocked`。

## 14. V2 Final Report Generator（V2，已完成）

作用：汇总 Planner、Human Approval、Growth Evaluation 和 V1 Artifact Index，形成 V2 最终报告。

输入字段：

- `planner_execution_plan`
- `human_approval_record`
- `growth_evaluation_report`
- `brand_compliance_report`
- `final_creative_package_report` 中的 V1 Artifact Index

处理逻辑：

- 区分 V1 Steps 1-11 历史执行链路和 V2 目标工作流。
- 汇总节点状态、Planner 编排、合规与人工审批、Growth Evaluation 指标、Rubric、问题归因和 Release Gates。
- 明确 `mock`、`estimated`、`not_available` 不是真实业务结果。
- 保持最终营销文案、最终图片 Prompt、图片生成、前端页面和公开发布 `blocked`。

输出字段：

- `project_overview`
- `executed_v1_workflow`
- `designed_v2_workflow`
- `artifact_index`
- `node_status_summary`
- `planner_summary`
- `compliance_summary`
- `human_approval_summary`
- `growth_evaluation_summary`
- `metric_summary`
- `rubric_summary`
- `issue_summary`
- `release_gates`
- `limitations`
- `iteration_backlog`
- `reproducibility_record`
- `final_conclusion`

输出格式：JSON + Markdown

交付物：`v2_final_report.json`、`v2_final_report.md`

当前状态：Step 15 已完成，V2 Final Report Generator 已完成，项目总体状态为 `needs_review`。两周作品集 Demo 已完整交付，但不代表生产系统上线；后续只做验证扩展，不再增加必做 Agent 节点。最终生成和公开发布继续 `blocked`。
