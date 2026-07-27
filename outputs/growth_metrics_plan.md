# Growth Metrics Agent Report

产物：`growth_metrics_plan`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Growth Metrics Agent  
节点状态：`needs_review`  
置信度：`0.88`

本报告只运行 Growth Metrics Agent。当前阶段不生成最终营销文案、不生成小红书正文、不生成抖音脚本、不生成直播话术、不生成最终图片 Prompt、不生成具体图片描述正文、不生成图片、不做前端页面、不公开发布。

## 1. 输入文件读取情况

| 文件 | 状态 | 说明 |
| --- | --- | --- |
| `PROJECT_MEMORY_FOR_OPENCLAW.md` | read | 已继承项目进度与第 9 步合规结论 |
| `README.md` | source read | 当前工作区根目录缺失，已从源项目目录读取 |
| `PROJECT_BLUEPRINT.md` | source read | 当前工作区根目录缺失，已从源项目目录读取 |
| `docs/steps_01_to_11_file_map.md` | available | 已整理为第 1 步到第 11 步文件地图 |
| `workflow/agent_io_contracts.md` | read | 已继承 Growth Metrics Agent I/O 契约 |
| `workflow/agent_workflow.md` | read | 已继承工作流顺序、审核与回退机制 |
| `outputs/platform_strategy_plan.json` | read | 已继承平台角色、漏斗、指标和 A/B 方向 |
| `outputs/creative_copy_pack_outline.json` | read | 已继承文案模块、claim source map 和 proof waitlist |
| `outputs/image_prompt_pack_outline.json` | read | 已继承视觉资产结构、素材依赖和视觉风险 |
| `outputs/brand_compliance_report.json` | read | 已继承阻断结论、风险项、禁止表达和审核门 |

说明：项目说明文件和上游 JSON 产物完整可用；本节点可继续交给 Creative Package Reporter。

## 2. Agent 职责边界

Growth Metrics Agent 负责：

- 把平台策略、创意结构、视觉结构和合规结论转成可观测指标。
- 定义平台 KPI、漏斗观察指标、A/B 测试方向、埋点字段和复盘字段。
- 设计素材复用率、审核通过率和内容生产效率的计算口径。
- 继承合规阻断项，确保指标不被写成结果承诺。

它不负责：

- 最终营销文案
- 小红书正文
- 抖音脚本
- 直播话术
- 最终图片 Prompt
- 图片生成
- 前端页面
- 真实投放或平台 API 接入
- 承诺 CTR、CVR、GMV、流量、成交或转化结果

## 3. 合规阻断结论继承

| 项目 | 继承结论 |
| --- | --- |
| 结构化规划产物 | 可进入 Growth Metrics Agent 和 Creative Package Reporter |
| 最终营销文案 | blocked |
| 最终图片 Prompt | blocked |
| 图片生成 | blocked |
| 公开发布 | blocked |

指标语言规则：CTR、CVR、GMV、流量、转化、直播间商品点击和成交只能作为观测指标、实验指标、看板字段或复盘字段，不能作为承诺。

## 4. 平台指标框架

| 平台 | 角色 | 核心指标 | 辅助指标 | 观察窗口 | 审核门 |
| --- | --- | --- | --- | --- | --- |
| 抖音 | 认知放大；场景种草；直播转化入口 | CTR；完播率；互动率；直播间商品点击率 | CVR；GMV；素材复用率；审核通过率 | 发布后 24h / 72h；直播后 24h；首发期 7 天滚动 | 防抖、AI 剪辑、直播转化表达需审核 |
| 小红书 | 生活方式种草；场景解释；搜索心智沉淀 | CTR；收藏加购率；互动率；完播率 | 素材复用率；审核通过率；内容生产效率；搜索承接观察 | 发布后 24h / 72h / 7 天；T+7 到 T+30 搜索观察 | 不得承诺专业大片、平台流量或商业收益 |
| 天猫 | 货架承接；商品详情转化；加购与成交决策 | CTR；收藏加购率；CVR；GMV | 素材复用率；详情页审核通过率；证明材料完备率；购买疑虑覆盖率 | T-7 至 T+7 每日观察；T+7 至 T+30 周度复盘 | 参数、防水、权益、套装和库存需确认 |
| 京东 | 参数解释；理性决策承接；问答与对比导购 | CTR；CVR；互动率；GMV | 素材复用率；问答覆盖率；类目对比审核通过率；证明材料完备率 | T-7 至 T+7 每日观察；T+7 至 T+30 按问题复盘 | 类目对比不得攻击具体品牌；技术参数需证明 |

## 5. 漏斗转化观察指标

| 漏斗阶段 | 平台 | 观察指标 | 说明 |
| --- | --- | --- | --- |
| 认知 | 抖音；小红书 | 曝光；CTR；完播率；互动率；合规阻断率 | 观察内容吸引和理解信号，不承诺流量 |
| 兴趣 | 抖音；小红书 | 收藏加购率；互动率；素材复用率；内容生产效率；证明材料缺口数 | AI 剪辑只作为辅助流程观察 |
| 比较 | 京东；天猫；小红书 | CTR；互动率；收藏加购率；证明材料完备率；审核通过率 | 竞品比较必须类目级、中性、可证明 |
| 转化 | 天猫；京东；抖音 | 直播间商品点击率；CVR；GMV；收藏加购率；承接页跳失观察 | CVR、GMV 和成交只作为观测与复盘字段 |
| 复盘 | 全平台 | CTR；CVR；完播率；互动率；收藏加购率；GMV；素材复用率；审核通过率；内容生产效率 | 复盘结果用于迭代，不回写成营销承诺 |

## 6. A/B 测试方向

| 测试方向 | 变量 | 平台 | 目标指标 | 审核门 |
| --- | --- | --- | --- | --- |
| 主卖点顺序 | 多平台复用优先；运动稳定优先；高清影像优先 | 全平台 | CTR；完播率；收藏加购率；CVR | 高清影像、防抖、防水、AI 剪辑需 proof status |
| 用户场景入口 | 骑行第一视角；旅行城市漫游；滑雪或水上运动；参数解释入口 | 全平台 | 完播率；互动率；素材复用率；收藏加购率 | 户外极限、防水、防抖视觉表达需安全和合规审核 |
| 证明材料类型 | 真实运动样片；参数说明；App 流程演示；类目级中性对比 | 抖音；小红书；天猫；京东 | 互动率；收藏加购率；CVR；审核通过率 | 证明材料必须真实、授权、可追踪 |
| 平台承接路径 | 内容平台到天猫；内容平台到京东；抖音到直播间商品点击 | 全平台 | CTR；直播间商品点击率；CVR；GMV；跳失观察 | 只能使用观测口径，不得承诺转化 |
| 详情页与问答模块顺序 | 规格证明优先；场景利益优先；购买疑虑回应优先 | 天猫；京东 | CTR；收藏加购率；CVR；问答互动率 | 权益、库存、参数和类目对比需确认 |

本节点只定义测试变量、观察指标、审核门和停用条件，不生成具体文案、脚本、Prompt 或图片。

## 7. 埋点字段

核心事件：

- `creative_variant_registered`：记录创意结构变体进入测试池。
- `compliance_review_completed`：记录文案模块、视觉结构或指标表述审核结果。
- `proof_asset_attached`：记录证明材料或素材授权与卖点、模块、素材结构的绑定关系。
- `platform_performance_observed`：记录平台表现观察数据。
- `asset_reuse_logged`：记录素材结构或授权素材的复用情况。
- `production_efficiency_logged`：记录内容生产效率与审核返工成本。

关键字段：

- `brief_id`
- `workflow_version`
- `platform`
- `content_type`
- `creative_variant_id`
- `visual_asset_type`
- `selling_point_primary`
- `funnel_stage`
- `experiment_id`
- `generation_status`
- `compliance_gate_status`
- `proof_status`
- `asset_authorization_status`
- `review_status`
- `blocked_expression_rule_ids`
- `observation_window`
- `ctr`
- `cvr`
- `gmv_observed`

## 8. 素材复用率

定义：衡量一个已授权素材或素材结构在多平台、多内容模块、多尺寸规格中的复用程度。

推荐公式：

```text
素材复用率 = reused_asset_instances / total_approved_asset_instances
```

核心字段：

- `asset_id`
- `asset_type`
- `authorization_status`
- `proof_status`
- `platforms_used`
- `content_modules_used`
- `format_ratio`
- `reuse_count`

合规说明：未授权商品图、App 截图、Logo、名人肖像和场景样片不得计入可发布复用池，只能计入待授权素材缺口。

## 9. 审核通过率

定义：衡量内容模块、视觉结构、证明材料和指标表达在审核中的通过情况。

推荐公式：

```text
审核通过率 = approved_review_items / submitted_review_items
```

建议分维度查看：

- 文案模块
- 视觉素材结构
- 声明类别
- 平台
- 风险等级
- 审核方

合规说明：由于 Brand Compliance Agent 已阻断最终生成，本阶段审核通过率只能衡量结构化规划和审核准备度，不代表公开发布通过。

## 10. 内容生产效率

定义：衡量从 Brief 到结构化创意规划、视觉结构、审核准备和复盘字段的生产效率。

推荐指标：

- `time_to_platform_strategy`
- `time_to_copy_outline`
- `time_to_visual_outline`
- `time_to_compliance_review`
- `time_to_growth_metrics_plan`
- `review_cycle_count`
- `blocked_item_count`
- `approved_structure_ratio`
- `proof_gap_resolution_time`

合规说明：效率指标不能绕过证明材料和人工审核；如果效率提升来自省略合规步骤，应标记为不可接受。

## 11. 复盘报告字段

建议 Creative Package Reporter 和未来复盘看板保留以下字段：

```json
[
  "brief_id",
  "workflow_version",
  "campaign_stage",
  "platform",
  "content_type",
  "creative_variant_id",
  "visual_asset_type",
  "selling_point_primary",
  "target_audience_segment",
  "funnel_stage",
  "experiment_id",
  "variant_label",
  "observation_window",
  "ctr_observed",
  "completion_rate_observed",
  "engagement_rate_observed",
  "favorite_add_cart_rate_observed",
  "live_product_click_rate_observed",
  "cvr_observed",
  "gmv_observed",
  "asset_reuse_rate",
  "approval_pass_rate",
  "content_production_efficiency",
  "proof_material_status",
  "asset_authorization_status",
  "compliance_gate_status",
  "blocked_reason",
  "human_review_notes",
  "decision",
  "next_iteration_action"
]
```

## 12. 合规阻断项对指标设计的影响

| 阻断项 | 影响指标 | 指标设计影响 |
| --- | --- | --- |
| 高清 / 全景画质证明不足 | CTR；收藏加购率；CVR；审核通过率 | 高清影像变体必须增加 `proof_status`、`proof_asset_id` 和 `claim_area` 字段；证明缺失时不能进入公开测试池 |
| 防水 / 防抖 / 耐用性能条件缺失 | 完播率；互动率；素材复用率；审核通过率 | 运动场景必须记录测试条件、安全审核和使用限制；缺失时暂停场景变体 |
| AI 自动剪辑不能承诺爆款或专业结果 | 互动率；内容生产效率；收藏加购率 | AI 相关实验必须使用辅助能力口径，只观察用户对流程支持的兴趣 |
| 平台转化、GMV、流量不能作为结果承诺 | CTR；直播间商品点击率；CVR；GMV | 商业结果字段必须命名为 observed、review 或 dashboard 字段 |
| 品牌 Logo、名人肖像、商品图、App 截图和场景样片需要授权 | 素材复用率；内容生产效率；审核通过率 | 素材复用池必须按授权状态分层；未授权素材只进入缺口分析 |
| 最终文案、最终图片 Prompt、图片生成和公开发布被阻断 | 审核通过率；内容生产效率；发布准备度 | 所有指标必须区分 `planning_ready`、`generation_blocked`、`public_release_blocked` |

## 13. 迭代规则

- 任何指标被写成保证流量、保证转化、保证 GMV、保证成交或保证点击时，回退 Brand Compliance Agent。
- 高清、防水、防抖、耐用或 AI 剪辑相关变量缺少证明材料时，只保留为结构化假设。
- 比较不同平台、卖点或素材表现时，必须按 `compliance_gate_status` 分层。
- 计算素材复用率时，只把授权完成或结构规划允许复用的素材计入可发布复用池。
- 任何节点准备进入最终文案、最终图片 Prompt、图片生成或公开发布前，必须完成人工审核。

## 14. 下游交接

传给 Creative Package Reporter：

```json
[
  "compliance_inheritance",
  "platform_metric_framework",
  "funnel_observation_metrics",
  "ab_test_plan",
  "tracking_event_schema",
  "asset_reuse_rate_model",
  "approval_pass_rate_model",
  "content_production_efficiency_model",
  "retrospective_report_fields",
  "compliance_blocker_metric_impact",
  "iteration_rules",
  "audit_trace"
]
```

交接说明：Reporter 应展示策略、创意结构、视觉规划、合规闸口和增长复盘如何形成闭环，同时继续标明最终生成和公开发布被阻断。

## 15. 审计记录

| 项目 | 内容 |
| --- | --- |
| Platform Strategy 输入 | `outputs/platform_strategy_plan.json` |
| Creative Copy 输入 | `outputs/creative_copy_pack_outline.json` |
| Image Prompt 输入 | `outputs/image_prompt_pack_outline.json` |
| Brand Compliance 输入 | `outputs/brand_compliance_report.json` |
| 生成 Prompt | `prompts/growth_metrics_agent.md` |
| 生成 JSON 产物 | `outputs/growth_metrics_plan.json` |
| 生成 Markdown 报告 | `outputs/growth_metrics_plan.md` |
| 当前工作流节点 | 8 / 9 |
| 当前是否进入最终生成 | 否 |

结论：Growth Metrics Agent 已完成。结构化增长指标方案可进入 Creative Package Reporter；最终营销文案、最终图片 Prompt、图片生成和公开发布仍被阻断。
