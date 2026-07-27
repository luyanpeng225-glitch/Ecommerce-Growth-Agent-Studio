# 项目蓝图

项目名称：E-commerce Growth Agent Studio / 电商增长 Agent 工作台

## 1. 产品定位

这是一个面向企业电商团队的 ToB Agent 工作台。它不是简单的 AI 文案工具，而是把企业电商营销中的多个步骤拆成可编排、可复用、可审计的 Agent / Skills 工作流。

核心价值：

- 把商品 Brief 标准化
- 把商品卖点转成用户可感知利益点
- 为不同平台生成不同策略
- 让文案结构、视觉素材结构、直播话术模块和后续生成任务进入同一套工作流
- 在企业交付前加入品牌与合规检查
- 用增长指标和 A/B 测试建议连接业务结果

## 2. 企业痛点

- 电商内容生产链路长，运营、内容、设计、投放之间反复沟通。
- 大模型能写内容，但很难稳定变成企业可复用的工作流。
- 不同平台规则不同，同一套文案很难同时适配抖音、小红书、天猫、京东和直播间。
- 内容输出容易缺少品牌一致性和合规审核。
- 企业团队需要的不只是“生成”，还需要可追踪、可复盘、可沉淀。

## 3. Skills 体系

当前规划的 Skills / Agent 包括：

- Brief Parser Agent：解析和校验商品 Brief。
- Planner Agent：拆解任务、编排节点、设置预算、风险和评估目标。
- Audience Insight Skill：生成用户洞察、痛点和购买触发点。
- Selling Point Analyst Agent：把功能转成卖点矩阵。
- Platform Strategy Skill：生成分平台内容与增长策略。
- Creative Copy Agent：生成文案包结构和后续内容生产任务。
- Image Prompt Skill：规划视觉素材结构、素材依赖和图片 Prompt 治理规范。
- Brand Compliance Agent：检查品牌、广告法、平台风险、素材授权和最终生成闸口。
- Human Approval Node：记录企业人工审批、修改意见和放行条件。
- Growth Metrics Agent：保留原 MVP 的 KPI、A/B 测试和复盘规划资产。
- Growth Evaluation Agent：基于全链路产物、合规状态和审批结果做 Agent 测评、失败归因和迭代建议。
- Creative Package Reporter：汇总 Steps 1-11 的 V1 创意包报告。
- V2 Final Report Generator：汇总 Planner、Human Approval、Growth Evaluation 和 V1 Artifact Index，形成 V2 最终报告。

## 4. Demo 场景

当前 Demo 选择“智能影像设备新品上市营销工作流”。

示例商品：运动相机。

选择这个场景的原因：

- 适合短视频、小红书、直播和电商详情页等多平台表达。
- 有明确的商品卖点、使用场景和目标用户。
- 能体现文案结构、视觉素材结构、增长指标和合规检查的完整链路。
- 可以作为真实企业电商运营场景，而不是抽象 AI demo。

## 5. 两周 MVP 范围

第一阶段：项目地基

- 商品 Brief 输入模板
- `sample_brief.json`
- `product_brief.schema.json`
- Agent / Skill I/O 契约
- Agent Workflow 说明
- Brief Parser Agent 提示词
- Brief Parser Agent 标准化输出
- Brief Parser Agent 报告
- Audience Insight Skill 提示词
- Audience Insight Skill 用户洞察输出
- Audience Insight Skill 报告
- Selling Point Analyst Agent 提示词
- Selling Point Analyst Agent 卖点矩阵输出
- Selling Point Analyst Agent 报告
- Platform Strategy Skill 提示词
- Platform Strategy Skill 平台策略输出
- Platform Strategy Skill 报告
- Creative Copy Agent 提示词
- Creative Copy Agent 内容模块结构输出
- Creative Copy Agent 报告
- Image Prompt Skill 提示词
- Image Prompt Skill 视觉素材结构输出
- Image Prompt Skill 报告
- Brand Compliance Agent 提示词
- Brand Compliance Agent 合规审核输出
- Brand Compliance Agent 报告
- Growth Metrics Agent 提示词
- Growth Metrics Agent 指标与复盘规划输出
- Growth Metrics Agent 报告
- Creative Package Reporter 提示词
- Creative Package Reporter 最终结构化报告输出
- Creative Package Reporter 最终 Markdown 报告

第二阶段：跑通工作流

- Brief Parser Agent（已完成）
- Audience Insight Skill（已完成）
- Selling Point Analyst Agent（已完成）
- Platform Strategy Skill（已完成）
- Creative Copy Agent（已完成）
- Image Prompt Skill（已完成）
- Brand Compliance Agent（已完成）
- Growth Metrics Agent（已完成）
- Creative Package Reporter（已完成）
- Planner Agent（Step 12 已完成、修订并验收）
- Human Approval Node（Step 13 已完成，状态 `needs_revision`）
- Growth Evaluation Agent（Step 14 已完成，状态 `needs_review`）
- V2 Final Report Generator（Step 15 已完成，状态 `needs_review`）

第三阶段：作品集展示

- 最终创意包报告
- 项目 README（已完成）
- 工作流图（已完成）
- 最终报告导航（已完成）
- 作品集要求对齐清单（已完成）
- 效果指标与测试数据方案（已完成）
- ToB 治理功能设计（已完成）
- OpenClaw Demo 运行手册（已完成）
- Demo 输入与输出
- 可展示的案例说明
- V2 最终汇总报告（已完成）

当前进度：Steps 1-15 已完成。V2 Final Report Generator 已完成，项目总体状态为 `needs_review`。两周作品集 Demo 已完整交付，但不代表生产系统上线；最终生成与公开发布继续 `blocked`。后续只做验证扩展，不再增加必做 Agent 节点。

## 6. 当前边界

当前后续方向：只做验证扩展，例如新增 benchmark case、补字段级 trace、补真实审批与授权证据、补测评数据；不再增加必做 Agent 节点。

MVP 阶段不做：

- 复杂前端页面
- 多租户企业账号
- 真实投放系统
- 真实电商平台 API 接入
- 完整 SaaS 计费系统

MVP 阶段重点是：

- 标准输入
- 清晰 Agent 分工
- 可追踪中间产物
- 完整工作流闭环
- 能放进作品集展示
- 能说明效果指标如何测试
- 能体现企业审批、审计和可解释执行记录
