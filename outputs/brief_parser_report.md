# Brief Parser Agent Report

产物：`standardized_brief_summary`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Brief Parser Agent  
节点状态：`needs_review`  
置信度：`0.91`

本报告只运行第一个工作流节点 Brief Parser Agent。当前阶段不生成最终营销文案、不生成小红书文案、不生成抖音脚本、不生成图片 Prompt、不做前端页面。

## 1. Brief 基础信息摘要

| 字段 | 值 |
| --- | --- |
| 项目 | E-commerce Growth Agent Studio |
| 中文名 | 电商增长 Agent 工作台 |
| 行业 | 智能影像设备 |
| 场景 | 新品上市营销工作流 |
| Demo 商品 | 运动相机 |
| 商品类目 | 运动相机 / 智能影像设备 |
| 上市阶段 | launch |
| 目标区域 | 中国大陆 |
| 输出语言 | zh-CN |
| 审核模式 | human_in_loop |
| 置信度阈值 | 0.82 |

定位说明：`运动相机` 是第一个行业 Demo，工作流主线仍是可迁移到多行业商品 Brief 的“电商增长 Agent 工作台”。

## 2. 字段完整度评分

| 维度 | 结果 |
| --- | --- |
| Schema 校验状态 | pass |
| 必填字段 | 30 / 30 |
| 必填字段完整度 | 100% |
| Schema 定义字段 | 42 / 42 |
| Schema 字段覆盖率 | 100% |
| 综合评分 | 100% |

评分说明：`sample_brief.json` 覆盖了 `schemas/product_brief.schema.json` 中所有必填字段，也覆盖了当前 schema 定义的可选字段。节点没有因为字段缺失而阻塞。

## 3. 缺失字段列表

当前缺失字段：无。

```json
[]
```

## 4. 风险字段列表

| 字段 | 风险等级 | 原因 | 处理建议 |
| --- | --- | --- | --- |
| `brand_name` | minor | 当前为 `Demo Brand`，适合作品集 Demo，但真实企业交付需要确认品牌名或匿名策略。 | 作为 Demo 占位保留，或在客户场景中替换为已授权品牌名。 |
| `core_features[].proof` | major | `高清`、防抖、防水、AI 自动剪辑等证明点会影响后续广告表达。 | 下游不得改写成绝对化承诺，需保留证明需求。 |
| `specs.waterproof` | major | 防水能力通常需要等级、深度、时长、使用条件等限定。 | 合规节点需要要求条件化表达。 |
| `specs.stabilization` | major | 防抖能力容易被误读为任何场景都稳定。 | 避免“百分百稳定”等绝对表述。 |
| `core_features[4].feature` | major | AI 自动剪辑容易被过度承诺为无需学习即可生成专业结果。 | 只能作为效率辅助或降低门槛处理，不能承诺专业结果。 |
| `positioning_statement` | minor | “高质量内容”属于方向性价值表达，但需要场景和证明支撑。 | 用作定位背景，不直接作为未经证明的广告承诺。 |
| `availability.launch_date` | minor | 当前只有月份 `2026-07`，不足以做精确排期。 | 若后续做平台节奏，需要补充日级时间。 |

## 5. 合规敏感字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `do_not_claim` | 广告表达边界 | 限制行业第一、绝对化、竞品攻击、耐用性承诺和专业效果承诺。 |
| `compliance_rules` | 品牌与平台规则 | 限制广告语、防水防摔续航表达、竞品表达、收益暗示、Logo 和名人形象。 |
| `negative_constraints` | Workflow 保护约束 | 防止项目变成单一品牌工具，并约束夸张场景、AI 效果和审核需求。 |
| `core_features` | 性能声明 | 包含画质、防抖、防水、AI 剪辑等需证明能力。 |
| `specs` | 技术参数 | 技术参数必须按已给信息使用，不能外推。 |
| `competitors` | 竞争表达 | 当前为类目级竞品，但后续仍需避免攻击具体品牌。 |
| `required_assets` | 素材依赖 | 商品图、佩戴图、样片、App 截图需要确认授权和可用性。 |

## 6. 下游 Readiness 状态

| 下游节点 | 状态 | 置信度 | 说明 |
| --- | --- | --- | --- |
| Audience Insight Skill | ready | 0.94 | 人群、需求、痛点、触发点、使用场景、决策因素、阻力、渠道和活动目标完整。 |
| Selling Point Analyst Agent | ready_with_review | 0.90 | 功能、证明点、规格、竞品、差异化和定位完整，但性能声明需要带风险进入分析。 |
| Platform Strategy Skill | ready | 0.92 | 渠道、内容格式、KPI、预算、周期、活动目标和商品上下文完整。 |
| Brand Compliance Agent | ready_with_review | 0.88 | 合规规则、禁止表达和负向约束完整，且已识别多个需审核的技术与广告声明。 |

## 7. 传给 Audience Insight Skill 的字段

```json
[
  "standardized_product_brief",
  "target_audiences",
  "usage_scenarios",
  "decision_factors",
  "barriers",
  "channels",
  "campaign_goal",
  "target_regions",
  "language"
]
```

交接说明：这些字段用于生成人群分层、痛点触发点映射、内容兴趣标签和购买旅程假设。Audience Insight Skill 只能基于 Brief 已有信息做结构化洞察，不能直接生成平台文案。

## 8. 传给 Selling Point Analyst Agent 的字段

```json
[
  "standardized_product_brief",
  "core_features",
  "specs",
  "competitors",
  "differentiators",
  "positioning_statement",
  "target_audiences",
  "usage_scenarios",
  "decision_factors",
  "barriers",
  "do_not_claim"
]
```

交接说明：这些字段用于生成“功能 -> 证明 -> 用户利益 -> 场景 -> 风险”的卖点矩阵。防水、防抖、AI 自动剪辑和画质相关字段必须带着风险标记进入下游。

## 9. 传给 Platform Strategy Skill 的字段

```json
[
  "standardized_product_brief",
  "channels",
  "campaign_goal",
  "primary_kpis",
  "secondary_kpis",
  "budget_level",
  "timeline",
  "content_formats",
  "target_audiences",
  "usage_scenarios",
  "decision_factors",
  "barriers"
]
```

交接说明：这些字段用于设计平台角色、内容格式要求、增长漏斗、活动节奏和 KPI 约束。当前 Brief 可支持策略设计，但若需要日级排期，应补充更精确的日期。

## 10. 传给 Brand Compliance Agent 的字段

```json
[
  "standardized_product_brief",
  "core_features",
  "specs",
  "positioning_statement",
  "competitors",
  "do_not_claim",
  "brand_voice",
  "visual_style",
  "required_assets",
  "compliance_rules",
  "negative_constraints",
  "review_mode",
  "risk_fields",
  "compliance_sensitive_fields"
]
```

交接说明：这些字段用于检查广告表达、技术证明、竞品边界、素材授权、图片限制和人工审核要求。Brand Compliance Agent 应在任何创意内容正式输出前介入。

## 11. 审计记录

| 项目 | 内容 |
| --- | --- |
| 输入 Brief | `sample_brief.json` |
| 校验 Schema | `schemas/product_brief.schema.json` |
| I/O 契约 | `workflow/agent_io_contracts.md` |
| 工作流说明 | `workflow/agent_workflow.md` |
| 生成 JSON 产物 | `outputs/standardized_brief_summary.json` |
| 生成 Markdown 报告 | `outputs/brief_parser_report.md` |
| 当前工作流节点 | 1 / 9 |
| 当前是否进入创意生成 | 否 |

## 12. 下一步建议

- 将 `target_audiences`、`usage_scenarios`、`decision_factors`、`barriers`、`channels` 和 `campaign_goal` 传给 Audience Insight Skill。
- 将 `core_features`、`specs`、`competitors`、`differentiators` 和风险字段传给 Selling Point Analyst Agent。
- 将 `channels`、`primary_kpis`、`secondary_kpis`、`budget_level` 和 `timeline` 传给 Platform Strategy Skill。
- 将 `do_not_claim`、`compliance_rules`、`negative_constraints`、性能声明和素材依赖传给 Brand Compliance Agent。

结论：Brief Parser Agent 已完成第一个节点运行。输入标准化通过，字段完整度充足，工作流可以进入下游节点，但性能与合规相关字段需要继续保持 `human_in_loop` 审核。
