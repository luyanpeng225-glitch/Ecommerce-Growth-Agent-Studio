# Platform Strategy Skill Report

产物：`platform_strategy_plan`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Platform Strategy Skill  
节点状态：`needs_review`  
置信度：`0.87`

本报告只运行第四个工作流节点 Platform Strategy Skill。当前阶段不生成最终营销文案、不生成小红书文案、不生成抖音脚本、不生成直播话术、不生成图片 Prompt、不做前端页面。

项目主线是“电商增长 Agent 工作台”：电商是业务场景，核心展示 AI Agent 产品化、Workflow 编排、Skills 体系、可审计输出和多 Agent 协作能力。`运动相机` 只是 Demo 商品。

## 1. Agent / Skill 角度

### 1.1 职责边界

Platform Strategy Skill 负责把上游 Agent 产物转成分平台策略字段：

- 定义平台角色、目标用户、卖点承接、内容格式、漏斗路径和指标框架。
- 继承并传递风险字段、待验证假设、证明材料需求和合规约束。
- 输出结构化字段给 Creative Copy、Image Prompt、Growth Metrics、Brand Compliance 和 Reporter。

它不负责：

- 最终营销文案
- 小红书文案
- 抖音脚本
- 直播话术
- 图片 Prompt
- 前端页面
- 真实广告投放或平台 API 对接

### 1.2 接收的上游 Agent 产物

| 上游节点 | 输入产物 | 使用方式 |
| --- | --- | --- |
| Brief Parser Agent | `outputs/standardized_brief_summary.json` | 获取标准化 Brief、审核模式、风险字段和合规敏感字段 |
| Audience Insight Skill | `outputs/audience_insight.json` | 获取用户分层、购买旅程、场景兴趣标签和待验证假设 |
| Selling Point Analyst Agent | `outputs/selling_point_matrix.json` | 获取卖点优先级、用户卖点适配、平台卖点适配、证明材料和声明风险 |

### 1.3 风险继承

继承的风险字段：

- `brand_name`
- `core_features[].proof`
- `specs.waterproof`
- `specs.stabilization`
- `core_features[4].feature`
- `positioning_statement`
- `availability.launch_date`

继承的待验证假设：

- 户外运动爱好者可能优先被防抖、防水和固定方式证明打动。
- 旅行内容创作者会重视一人出行、多平台复用和轻量剪辑流程。
- 数码发烧友会通过样片、参数解释和真实评测建立购买信心。
- 认知到转化的主路径可以从内容平台种草过渡到天猫、京东等承接渠道。

继承的合规约束：

- 不声称行业第一、唯一、最好、百分百稳定。
- 不攻击具体竞品品牌。
- 防水、防摔、续航等能力必须保留条件描述。
- 不暗示使用产品即可保证商业收益。
- 不把项目包装成单一品牌专属工具。

### 1.4 Human-in-the-loop 审核

| 审核项 | 原因 | 阻塞级别 |
| --- | --- | --- |
| 防水、耐用、防抖、高清 和 AI 剪辑相关卖点 | 上游标记为高风险或需要证明材料 | 创意生成前必须审核 |
| 首发权益、套装和库存信息 | 当前 Brief 只提供概括信息 | 创意包上线前审核 |
| 跨平台归因路径 | 内容种草到电商转化是假设路径 | 增长指标节点验证 |
| 竞品和类目对比策略 | 避免攻击具体品牌和无依据排名 | 公开文案前必须审核 |

### 1.5 可复用性

这个 Skill 可复用于智能硬件、美妆、服饰、食品饮料、家电、B2B SaaS 等场景。可复用输入包括用户分层、购买旅程、卖点优先级、平台角色、KPI、时间节奏、风险字段和合规约束。可替换维度包括平台列表、内容格式、指标集、合规规则和活动节奏。

产品化价值：它把“平台策略”封装成可复用的 Workflow 节点，而不是一次性的电商运营方案。

## 2. 平台策略角度

### 2.1 平台角色地图

| 平台 | 角色 | 适合用户分层 | 主推卖点 | 内容格式 |
| --- | --- | --- | --- | --- |
| 抖音 | 认知放大；场景种草；直播转化入口 | 户外运动爱好者；数码发烧友；旅行内容创作者 | 运动场景稳定记录；一次拍摄，多平台复用；AI 剪辑辅助降低发布门槛 | 15 秒卖点视频结构；30 秒场景视频结构；直播间讲解结构 |
| 小红书 | 生活方式种草；场景解释；搜索心智沉淀 | 旅行内容创作者；户外运动爱好者；数码发烧友 | 一次拍摄，多平台复用；高清影像与沉浸视角；AI 剪辑辅助降低发布门槛 | 种草笔记结构；场景解释结构；达人 Brief 结构 |
| 天猫 | 货架承接；商品详情转化；加购与成交决策 | 旅行内容创作者；户外运动爱好者；数码发烧友 | 一次拍摄，多平台复用；高清影像与沉浸视角；户外环境覆盖能力 | 商品标题结构；详情页卖点模块结构；主图信息层级结构 |
| 京东 | 参数解释；理性决策承接；问答与对比导购 | 数码发烧友；户外运动爱好者；旅行内容创作者 | 高清影像与沉浸视角；运动场景稳定记录；户外环境覆盖能力 | 参数解释结构；类目对比导购结构；问答素材结构 |

说明：以上是结构和策略字段，不是文案、脚本、话术或 Prompt。

### 2.2 漏斗路径

| 阶段 | 目标 | 主要平台 | 卖点承接 | 指标 |
| --- | --- | --- | --- | --- |
| 认知 | 让用户理解全景运动相机在运动、旅行和内容创作中的价值 | 抖音；小红书 | 运动场景稳定记录；一次拍摄多平台复用；高清影像视角 | CTR；完播率；互动率 |
| 兴趣 | 用场景和功能解释降低构图、剪辑和多平台适配门槛 | 抖音；小红书 | 一次拍摄多平台复用；AI 剪辑辅助；户外环境覆盖 | 收藏加购率；互动率；素材复用率 |
| 比较 | 通过参数、样片和类目级对比建立购买信心 | 京东；天猫；小红书 | 高清影像质量；运动防抖；户外环境覆盖 | CTR；互动率；收藏加购率 |
| 转化 | 承接商品点击、加购、直播间商品点击和成交 | 天猫；京东；抖音 | 多平台复用；户外环境覆盖；AI 剪辑辅助 | 直播间商品点击率；CVR；GMV；收藏加购率 |
| 复盘 | 复盘卖点有效性、平台承接效率和素材复用价值 | 全平台 | 全部卖点组合 | CTR；CVR；完播率；互动率；收藏加购率；GMV；素材复用率 |

## 3. 指标与闭环角度

### 3.1 平台指标框架

| 平台 | 核心指标 |
| --- | --- |
| 抖音 | CTR；完播率；互动率；直播间商品点击率；CVR；GMV |
| 小红书 | CTR；收藏加购率；互动率；完播率；素材复用率 |
| 天猫 | CTR；收藏加购率；CVR；GMV；素材复用率 |
| 京东 | CTR；CVR；互动率；GMV；素材复用率 |

指标说明：这些是后续 Growth Metrics Agent 使用的策略字段，不是预测结果或投放承诺。

### 3.2 新品上市活动节奏

| 阶段 | 时间 | Workflow 目标 | 平台重点 | 策略任务 |
| --- | --- | --- | --- | --- |
| 预热期 | T-14 至 T-7 | 建立新品认知和核心场景兴趣 | 抖音；小红书 | 验证高动态场景、旅行场景和用户阻力问题 |
| 首发期 | T-7 至 T+7 | 把内容兴趣导向商品点击、加购和直播间商品点击 | 抖音；天猫；京东 | 承接核心卖点和首发权益，监控 CTR、直播间商品点击率、收藏加购率、CVR |
| 增长期 | T+7 至 T+30 | 基于早期数据迭代卖点、素材结构和平台分发 | 全平台 | 比较卖点组合差异，复用高表现素材，补齐证明材料 |
| 复盘期 | T+30 后 | 沉淀可复用 Skill 模板和跨品类策略规则 | 全平台 | 更新假设状态，复盘用户、卖点、平台角色和指标表现 |

### 3.3 A/B 测试方向

| 测试方向 | 变量 | 目标指标 | 是否需审核 |
| --- | --- | --- | --- |
| 主卖点顺序 | 一次拍摄多平台复用；运动防抖；高清影像质量 | CTR；完播率；收藏加购率 | 是，涉及性能类卖点 |
| 用户场景入口 | 骑行第一视角；旅行城市漫游；滑雪和水上运动 | 完播率；互动率；素材复用率 | 是，户外场景和防水防抖需条件化 |
| 平台承接路径 | 内容平台到天猫；内容平台到京东；抖音到直播间商品点击 | CTR；直播间商品点击率；CVR；GMV | 否，主要是链路归因和指标验证 |
| 证明材料类型 | 真实运动样片；参数说明；App 流程演示 | 互动率；收藏加购率；CVR | 是，证明材料必须真实准确 |

### 3.4 需要数据验证或人工审核的策略

- 内容平台种草到天猫、京东承接的转化链路需要数据验证。
- 不同用户分层对防抖、防水、高清、AI 剪辑的响应差异需要数据验证。
- 防水、防抖、高清 和 AI 剪辑相关策略需要人工审核。
- GMV、CVR 等结果指标只能作为后续观测指标，不能作为本节点承诺。

## 4. 下游交接

### 4.1 传给 Creative Copy Agent 的字段

```json
[
  "channel_role_map",
  "platform_strategy_plan",
  "funnel_mapping",
  "platform_constraints",
  "core_selling_point_priority",
  "claim_risk_notes",
  "human_in_the_loop_review",
  "compliance_constraints"
]
```

交接说明：用于后续规划文案模块和声明边界，但不得绕过合规生成最终文案。

### 4.2 传给 Image Prompt Skill 的字段

```json
[
  "channel_role_map.content_formats",
  "platform_strategy_plan",
  "funnel_mapping",
  "usage_scenario_interest_map",
  "proof_requirements",
  "human_in_the_loop_review",
  "compliance_constraints"
]
```

交接说明：用于后续视觉规划，不在本节点生成图片 Prompt。

### 4.3 传给 Growth Metrics Agent 的字段

```json
[
  "metrics_framework",
  "funnel_mapping",
  "cadence_recommendations",
  "ab_test_directions",
  "assumptions_to_validate",
  "platform_strategy_plan"
]
```

交接说明：用于后续定义 KPI 映射、实验设计、埋点字段和复盘看板。

### 4.4 传给 Brand Compliance Agent 的字段

```json
[
  "upstream_artifact_inheritance",
  "human_in_the_loop_review",
  "platform_constraints",
  "proof_requirements",
  "claim_risk_notes",
  "ab_test_directions"
]
```

交接说明：用于检查平台策略和后续创意输出是否保留证明材料、合规边界和人工审核要求。

### 4.5 传给 Creative Package Reporter 的字段

```json
[
  "skill_contract",
  "upstream_artifact_inheritance",
  "channel_role_map",
  "platform_strategy_plan",
  "funnel_mapping",
  "metrics_framework",
  "cadence_recommendations",
  "ab_test_directions",
  "human_in_the_loop_review",
  "reusability_notes"
]
```

交接说明：用于最终报告展示 Agent Workflow Trace、Skill 复用价值、平台策略和审核状态。

## 5. 审计记录

| 项目 | 内容 |
| --- | --- |
| 输入 Brief | `sample_brief.json` |
| Brief Parser 产物 | `outputs/standardized_brief_summary.json` |
| Audience Insight 产物 | `outputs/audience_insight.json` |
| Selling Point 产物 | `outputs/selling_point_matrix.json` |
| I/O 契约 | `workflow/agent_io_contracts.md` |
| 工作流说明 | `workflow/agent_workflow.md` |
| 生成 JSON 产物 | `outputs/platform_strategy_plan.json` |
| 生成 Markdown 报告 | `outputs/platform_strategy_plan.md` |
| 当前工作流节点 | 4 / 9 |
| 当前是否进入创意生成 | 否 |

结论：Platform Strategy Skill 已完成运行。该产物把平台策略封装为可复用、可审计、可交接的 Skill 输出，可进入 Creative Copy、Image Prompt、Growth Metrics、Brand Compliance 和 Creative Package Reporter 下游节点。
