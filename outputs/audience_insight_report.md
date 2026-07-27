# Audience Insight Skill Report

产物：`audience_insight`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Audience Insight Skill  
节点状态：`needs_review`  
置信度：`0.90`

本报告只运行第二个工作流节点 Audience Insight Skill。当前阶段不生成最终营销文案、不生成小红书文案、不生成抖音脚本、不生成图片 Prompt、不做前端页面。

说明：用户请求中引用了 `data/sample_brief.json`，但当前工作区实际存在的是根目录 `sample_brief.json`。本次运行使用 `sample_brief.json` 和 `outputs/standardized_brief_summary.json`。

## 1. 用户分层

| 用户分层 | 核心需求 | 核心痛点 | 购买触发点 | 内容兴趣标签 |
| --- | --- | --- | --- | --- |
| 户外运动爱好者 | 稳定记录运动过程；解放双手；快速分享精彩瞬间 | 普通手机拍摄不稳；运动时难以构图；后期剪辑耗时 | 新品首发优惠；运动场景样片；防抖和防水能力证明 | 骑行第一视角；滑雪和水上运动记录；稳定画面对比；装备固定方式；户外耐用性说明 |
| 旅行内容创作者 | 高质量旅行素材；多平台内容复用；独特视角 | 一个人旅行拍摄角度有限；素材不够有冲击力；横竖屏适配麻烦 | 360 度后期取景演示；旅行大片模板；轻量化剪辑流程 | 城市漫游；旅行打卡；一人出行拍摄；横竖屏复用；后期取景流程 |
| 数码发烧友 | 新技术体验；高规格影像能力；可玩性 | 同质化运动相机缺少新鲜感；参数强但实际体验不明确 | 高清样片对比；真实场景评测；首发权益 | 高清样片解析；参数体验对照；全景玩法；首发权益；真实场景评测 |

## 2. 需求、痛点、触发点映射

| 用户分层 | 主需求 | 主痛点 | 触发点组合 | 下游价值 |
| --- | --- | --- | --- | --- |
| 户外运动爱好者 | 在高运动量场景稳定、低负担地记录过程 | 手机或普通设备在运动中拍摄不稳，构图困难，剪辑耗时 | 运动样片；防抖证明；防水或户外耐用证明；首发权益 | 帮助 Selling Point Analyst Agent 评估防抖、防水、固定方式和配件卖点 |
| 旅行内容创作者 | 一次拍摄获得可复用、多角度、适配多平台的旅行素材 | 独自旅行难以拍到多角度素材，横竖屏适配和剪辑流程增加负担 | 360 度后期取景演示；旅行内容模板；多平台导出；轻量化剪辑流程 | 帮助 Platform Strategy Skill 设计种草和承接平台的内容兴趣路径 |
| 数码发烧友 | 理解新技术是否真的带来可感知体验提升 | 参数强但实际价值不明确，同质化产品缺少新鲜感 | 高清样片对比；真实场景评测；参数解释；首发权益 | 帮助 Selling Point Analyst Agent 区分参数证明、体验证明和表达边界 |

## 3. 使用场景与内容兴趣标签

| 使用场景 | Brief 场景描述 | 期望结果 | 内容兴趣标签 | 相关人群 | 风险提醒 |
| --- | --- | --- | --- | --- | --- |
| 骑行第一视角记录 | 用户将相机固定在车把或头盔上，记录城市骑行或山地路线 | 生成稳定、有速度感、适合短视频发布的骑行内容 | 第一视角；速度感；车把或头盔固定；城市骑行；山地路线；稳定画面 | 户外运动爱好者；数码发烧友 | 稳定画面相关表达需要避免绝对化 |
| 旅行打卡与城市漫游 | 用户使用隐形自拍杆拍摄景点、街区和人物同框画面 | 一次拍摄产出多平台场景素材 | 城市漫游；旅行打卡；人物同框；隐形自拍杆；多平台复用；一人出行 | 旅行内容创作者；户外运动爱好者 | 多平台复用是内容效率方向，不等于承诺平台表现 |
| 滑雪和水上运动 | 用户在雪地、雨天或海边环境中拍摄运动过程 | 突出防抖、防水和耐用性，形成高冲击力样片 | 滑雪；水上运动；雨天拍摄；海边场景；户外耐用；运动样片 | 户外运动爱好者；数码发烧友 | 防水和耐用相关内容必须等待规格条件或合规确认 |

## 4. 购买旅程

| 阶段 | 用户问题 | 来自 Brief 的输入 | 内容兴趣标签 | 合规护栏 |
| --- | --- | --- | --- | --- |
| 认知 | 为什么我需要一台全景运动相机，而不是继续用手机或传统运动相机？高清影像和 360 度后期取景有什么实际价值？ | `short_description`；`positioning_statement`；`differentiators`；`usage_scenarios` | 全景视角价值；运动和旅行真实场景；一次拍摄多平台复用 | 不得使用行业第一、唯一、最好等绝对化认知钩子 |
| 兴趣 | 这个产品能解决拍摄不稳、构图困难和剪辑耗时的问题吗？不同人群能怎么用？ | `target_audiences`；`usage_scenarios`；`core_features`；`barriers` | 场景演示；固定方式；后期取景流程；AI 剪辑辅助 | AI 自动剪辑只能作为辅助能力，不得承诺无学习成本达到专业水平 |
| 比较 | 相比手机或传统运动相机，它的差异在哪里？画质、防抖、防水、配件和剪辑效率是否支撑中高端价格带？ | `competitors`；`decision_factors`；`price_band`；`specs`；`core_features` | 参数解释；真实场景评测；类目差异；配件套装 | 只做类目级比较，不攻击具体竞品品牌 |
| 转化 | 现在购买有什么权益？套装、渠道、售后和首发备货是否能降低决策风险？ | `bundles`；`availability`；`channels`；`primary_kpis`；`campaign_goal` | 首发权益；套装选择；渠道承接；购买阻力消除 | 不得暗示购买后一定获得商业收益或内容增长结果 |

## 5. 来自 Brief 的洞察

- 目标人群分为户外运动爱好者、旅行内容创作者和数码发烧友。来源：`target_audiences`
- 共同购买阻力集中在价格、剪辑门槛、续航、运动相机必要性和运动稳定性。来源：`barriers`
- 核心使用场景覆盖骑行、旅行城市漫游、滑雪和水上运动。来源：`usage_scenarios`
- 平台覆盖抖音、小红书、天猫和京东，既有内容种草，也有电商转化承接。来源：`channels`
- Brief 明确要求不要把项目包装成单一品牌专属工具，需保留企业电商团队协作和审核需求。来源：`negative_constraints`

## 6. 待验证假设

| 假设 | 需要验证 | 未验证风险 |
| --- | --- | --- |
| 户外运动爱好者可能优先被防抖、防水和固定方式证明打动 | 平台内容数据、调研或历史素材表现 | 可能高估技术证明对所有运动人群的转化影响 |
| 旅行内容创作者会重视一人出行、多平台复用和轻量剪辑流程 | 旅行创作者内容生产习惯和平台发布频率 | 可能把内容效率误判为所有旅行人群的第一购买动机 |
| 数码发烧友会通过样片、参数解释和真实评测建立购买信心 | 评测内容点击、评论和转化数据 | 可能过度依赖参数表达，忽略价格和实际使用门槛 |
| 认知到转化的主路径可以从内容平台种草过渡到天猫、京东等承接渠道 | 跨平台链路数据或 UTM/埋点 | 可能无法准确归因内容种草对电商转化的贡献 |

## 7. 保留的风险字段与合规约束

Audience Insight Skill 已继承 Brief Parser Agent 的风险字段，不在本节点消解风险：

- `brand_name`：Demo Brand 适合作品集 Demo，但真实交付要确认品牌授权或匿名策略。
- `core_features[].proof`：高清影像、防抖、防水、AI 自动剪辑等证明点需要事实依据。
- `specs.waterproof`：需要等级、深度、时长或使用条件。
- `specs.stabilization`：不得暗示所有场景都稳定。
- `core_features[4].feature`：AI 自动剪辑不得被表达为无需学习即可达到专业结果。
- `positioning_statement`：“高质量内容”需要场景和证明支撑。
- `availability.launch_date`：月份级日期不足以做精确排期。

继续保留的合规约束：

- 禁止行业第一、唯一、最好、百分百稳定等绝对化表达。
- 禁止攻击具体竞品品牌。
- 防水、防摔、续航等能力需要条件化描述。
- 不得暗示使用产品即可保证商业收益。
- 不得生成真实品牌 Logo 或未经授权的名人形象。
- 不要把项目包装成单一品牌专属工具。
- 不要忽略企业电商团队的协作和审核需求。

## 8. 传给 Selling Point Analyst Agent 的字段

```json
[
  "audience_segments",
  "need_pain_trigger_map",
  "usage_scenario_interest_map",
  "purchase_journey_notes",
  "brief_derived_insights",
  "assumptions_to_validate",
  "retained_risk_fields",
  "retained_compliance_constraints"
]
```

交接说明：用于按人群需求、痛点和触发点评估卖点优先级，并保留性能声明、证明需求和合规边界。

## 9. 传给 Platform Strategy Skill 的字段

```json
[
  "audience_segments",
  "usage_scenario_interest_map",
  "purchase_journey_notes",
  "channels",
  "campaign_goal",
  "primary_kpis",
  "secondary_kpis",
  "assumptions_to_validate",
  "retained_compliance_constraints"
]
```

交接说明：用于设计平台角色、内容节奏、增长漏斗和 KPI 约束，待验证假设需要进入策略备注。

## 10. 传给 Creative Copy Agent 的字段

```json
[
  "audience_segments",
  "need_pain_trigger_map",
  "purchase_journey_notes",
  "content_interest_tags",
  "brief_derived_insights",
  "assumptions_to_validate",
  "retained_risk_fields",
  "retained_compliance_constraints"
]
```

交接说明：这些字段只能作为后续文案规划输入，不能绕过合规节点直接生成最终文案。

## 11. 传给 Image Prompt Skill 的字段

```json
[
  "usage_scenario_interest_map",
  "audience_segments.content_interest_tags",
  "visual_style",
  "required_assets",
  "retained_risk_fields",
  "retained_compliance_constraints"
]
```

交接说明：这些字段只能作为后续视觉规划输入，必须保留夸张场景、Logo、名人形象、素材授权等限制。

## 12. 传给 Growth Metrics Agent 的字段

```json
[
  "audience_segments",
  "purchase_journey_notes",
  "assumptions_to_validate",
  "channels",
  "primary_kpis",
  "secondary_kpis",
  "campaign_goal"
]
```

交接说明：用于后续设计 KPI 映射、A/B 测试变量和验证闭环，不在本节点制定增长方案。

## 13. 审计记录

| 项目 | 内容 |
| --- | --- |
| 输入 Brief | `sample_brief.json` |
| 上游产物 | `outputs/standardized_brief_summary.json` |
| I/O 契约 | `workflow/agent_io_contracts.md` |
| 工作流说明 | `workflow/agent_workflow.md` |
| 生成 JSON 产物 | `outputs/audience_insight.json` |
| 生成 Markdown 报告 | `outputs/audience_insight_report.md` |
| 当前工作流节点 | 2 / 9 |
| 当前是否进入创意生成 | 否 |

结论：Audience Insight Skill 已完成运行。产物可传给后续卖点分析、平台策略、创意规划、视觉规划和增长指标节点，但所有性能、合规和待验证假设必须继续随字段向下游传递。
