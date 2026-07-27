# Image Prompt Skill Report

产物：`image_prompt_pack_outline`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Image Prompt Skill  
节点状态：`needs_review`  
置信度：`0.85`

本报告只运行 Image Prompt Skill 的结构化规划节点。当前阶段不生成最终图片 Prompt、不生成具体图片描述正文、不生成 Midjourney / 即梦 / Stable Diffusion / DALL-E 可直接使用的 Prompt、不生成最终营销文案、不生成小红书正文、不生成抖音脚本、不生成直播话术、不做前端页面。

项目主线是“电商增长 Agent 工作台”：电商是业务场景，核心展示 AI Agent 产品化、Workflow 编排、Skills 体系、可审计输出、多 Agent 协作、多模态生成约束和合规风险传递。`运动相机` 只是 Demo 商品。

## 1. Agent / Skill 角度

### 1.1 职责边界

Image Prompt Skill 负责：

- 将上游 Agent 产物转成视觉素材结构规格。
- 定义每类素材的画面目标、平台、人群、卖点、字段来源、证明等待、构图约束、商品露出、文字限制、禁止元素和审核状态。
- 继承风险字段、待验证假设、证明材料需求和合规约束。
- 输出可交给 Brand Compliance、Growth Metrics、Creative Package Reporter 和后续图片 Prompt 生成节点的结构化字段。

Image Prompt Skill 不负责：

- 最终图片 Prompt
- 模型可直接使用的 Midjourney / 即梦 / Stable Diffusion / DALL-E Prompt
- 具体图片描述正文
- 最终营销文案
- 小红书正文、抖音脚本、直播话术
- 前端页面

### 1.2 接收的上游 Agent 产物

| 上游节点 | 输入产物 | 使用方式 |
| --- | --- | --- |
| Brief Parser Agent | `outputs/standardized_brief_summary.json` | 获取标准化商品、视觉风格、必备素材、合规敏感字段 |
| Audience Insight Skill | `outputs/audience_insight.json` | 获取用户分层、场景兴趣标签、购买旅程、待验证假设 |
| Selling Point Analyst Agent | `outputs/selling_point_matrix.json` | 获取卖点优先级、功能利益映射、证明材料需求和声明风险 |
| Platform Strategy Skill | `outputs/platform_strategy_plan.json` | 获取平台角色、内容格式、漏斗路径、指标和人工审核项 |
| Creative Copy Agent | `outputs/creative_copy_pack_outline.json` | 获取内容模块结构、claim source map、proof waitlist 和审核清单 |

### 1.3 风险与合规继承

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
- 内容平台种草到天猫、京东等承接渠道的转化路径需要数据验证。

继承的合规约束：

- 不使用绝对化广告语。
- 防水、防摔、续航、防抖等能力必须保留条件描述。
- 不攻击具体竞品品牌。
- 不暗示使用产品即可保证商业收益。
- 不生成真实品牌 Logo 或未经授权名人形象。
- 不把项目包装成单一品牌专属工具。

### 1.4 Human-in-the-loop 审核

| 审核项 | 原因 | 审核方 |
| --- | --- | --- |
| 所有视觉素材结构进入最终 Prompt 生成前 | 当前产物只定义结构，需要确认素材授权、证明材料和合规边界 | Brand Compliance Agent |
| 防水、防抖、高清、AI 剪辑相关画面 | 涉及高风险技术能力或效果声明 | Brand Compliance Agent + Product Owner |
| 达人 Brief 配图和素材包 | 达人协作可能扩展未经证明的视觉表达 | Brand Compliance Agent |
| 后续模型可用 Prompt 生成 | 需要先通过结构规划、素材授权、证明材料和合规审核 | Future Image Prompt Generation Node gated by Brand Compliance Agent |

### 1.5 可复用性

该 Skill 可复用于智能硬件、美妆、服饰、食品饮料、B2B SaaS 和企业多模态创意工作流。可复用结构包括：`asset_type`、`visual_goal`、`applicable_platforms`、`target_audience_segments`、`corresponding_selling_points`、`required_upstream_fields`、`proof_materials_to_wait_for`、`composition_requirements`、`product_exposure_requirements`、`forbidden_elements`、`requires_human_review`。

产品化价值：它把多模态生成前置为可治理的 Workflow 节点，让视觉结构、证据边界、素材授权和合规风险在最终 Prompt 生成前被审计。

## 2. 视觉素材结构角度

### 2.1 商品主图结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 建立商品识别、类目定位和核心信息层级，服务电商承接 |
| 适用平台 | 天猫；京东 |
| 目标用户分层 | 旅行内容创作者；户外运动爱好者；数码发烧友 |
| 对应卖点 | 一次拍摄，多平台复用；高清影像与沉浸视角 |
| 必须使用的上游字段 | `product_name`；`product_category`；`required_assets`；`core_selling_point_priority`；`content_module_specs` |
| 必须等待的证明材料 | 商品白底图；高清样片与规格说明；已授权商品渲染或实拍素材 |
| 画面主体 | 商品主体和关键配件的结构占位，不写具体画面描述 |
| 使用场景 | 电商货架和商品详情承接 |
| 构图要求 | 主体清晰、信息层级明确、避免遮挡关键部件 |
| 光线/色彩/风格要求 | 遵循明亮自然光和科技感信息标注方向，但不生成具体风格 Prompt |
| 商品露出要求 | 商品必须可识别，配件关系清楚 |
| 文案/文字限制 | 只允许文字占位和信息层级，不生成主图文案 |
| 不允许出现的元素 | 真实品牌 Logo；未经授权商标；绝对化卖点文字；无证明的高清 或防水承诺 |
| 是否需要人工审核 | 是 |

### 2.2 户外运动场景图结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 承接骑行、滑雪、水上运动等运动场景，展示使用情境和运动记录价值 |
| 适用平台 | 抖音；小红书；天猫；京东 |
| 目标用户分层 | 户外运动爱好者；数码发烧友 |
| 对应卖点 | 运动场景稳定记录；户外环境覆盖能力 |
| 必须使用的上游字段 | `usage_scenario_interest_map`；`feature_benefit_mapping`；`channel_role_map`；`proof_waitlist` |
| 必须等待的证明材料 | 真实运动样片；防抖测试条件；防水等级、深度、时长和使用条件 |
| 画面主体 | 运动场景中的商品使用关系占位，不写具体镜头 Prompt |
| 使用场景 | 骑行第一视角、滑雪、水上运动或雨天户外 |
| 构图要求 | 商品和使用方式可见，避免过度危险或极限化构图 |
| 光线/色彩/风格要求 | 高动态户外画面、自然光、真实运动环境方向 |
| 商品露出要求 | 商品固定方式或佩戴方式需清楚 |
| 文案/文字限制 | 只允许证明材料和规格条件的文字占位，不生成营销文字 |
| 不允许出现的元素 | 夸张失真的极限户外画面；暗示任何场景都防水、防摔、稳定；危险动作鼓励 |
| 是否需要人工审核 | 是 |

### 2.3 旅行/城市漫游场景图结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 承接旅行内容创作者的一人出行、多平台复用和城市漫游素材需求 |
| 适用平台 | 小红书；抖音；天猫 |
| 目标用户分层 | 旅行内容创作者；户外运动爱好者 |
| 对应卖点 | 一次拍摄，多平台复用；高清影像与沉浸视角；AI 剪辑辅助降低发布门槛 |
| 必须使用的上游字段 | `audience_segments`；`usage_scenario_interest_map`；`audience_selling_point_fit`；`funnel_mapping`；`creative_copy_pack_outline` |
| 必须等待的证明材料 | 旅行或城市漫游样片；同一素材多比例导出示例；AI 自动剪辑流程演示 |
| 画面主体 | 旅行或城市漫游中的商品使用关系占位，不写具体图像描述 |
| 使用场景 | 城市街区、旅行打卡、人物同框和一人出行记录 |
| 构图要求 | 保留人物、环境和商品关系，避免商品不可见 |
| 光线/色彩/风格要求 | 明亮自然光、真实城市或旅行氛围、不过度滤镜化 |
| 商品露出要求 | 商品或使用方式需有明确露出 |
| 文案/文字限制 | 不生成小红书标题、标签、正文或图中文字 |
| 不允许出现的元素 | 未经授权名人形象；虚构地标商标；专业大片必然效果暗示；平台流量或商业收益承诺 |
| 是否需要人工审核 | 是 |

### 2.4 详情页信息图结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 为天猫和京东承接参数、证明材料、卖点层级和购买疑虑说明提供结构 |
| 适用平台 | 天猫；京东 |
| 目标用户分层 | 数码发烧友；旅行内容创作者；户外运动爱好者 |
| 对应卖点 | 高清影像质量；运动防抖；户外环境覆盖；多平台复用 |
| 必须使用的上游字段 | `specs`；`bundles`；`availability`；`proof_requirements`；`claim_source_map` |
| 必须等待的证明材料 | 分辨率规格；防水标准；防抖测试条件；套装和首发权益确认 |
| 画面主体 | 参数、卖点、证明材料和商品图的版块占位 |
| 使用场景 | 详情页模块、参数解释、购买疑虑回应 |
| 构图要求 | 信息分区清晰、证据来源可追踪、避免过密排版 |
| 光线/色彩/风格要求 | 电商信息图方向，清晰、克制、专业可信 |
| 商品露出要求 | 商品图和参数模块必须对应 |
| 文案/文字限制 | 只生成字段占位，不生成详情页文案或参数卖点正文 |
| 不允许出现的元素 | 无依据排名；竞品攻击；绝对化参数表达；未经确认的价格或权益 |
| 是否需要人工审核 | 是 |

### 2.5 短视频分镜画面结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 为抖音短视频和平台短内容提供分镜画面字段，不生成镜头 Prompt 或脚本 |
| 适用平台 | 抖音；小红书 |
| 目标用户分层 | 户外运动爱好者；旅行内容创作者；数码发烧友 |
| 对应卖点 | 运动场景稳定记录；一次拍摄多平台复用；AI 剪辑辅助 |
| 必须使用的上游字段 | `creative_copy_pack_outline[抖音短视频脚本结构]`；`ab_test_directions`；`purchase_journey_notes`；`claim_risk_notes` |
| 必须等待的证明材料 | 真实运动样片；App 流程演示；同一素材多比例导出示例 |
| 画面主体 | 分镜画面模块占位，包括场景、商品、证明材料、转化动作位置 |
| 使用场景 | 认知、兴趣、比较、转化阶段的短视频结构 |
| 构图要求 | 只保留结构字段，避免生成可直接拍摄的镜头正文 |
| 光线/色彩/风格要求 | 按平台风格要求保留风格字段，不生成最终 Prompt |
| 商品露出要求 | 关键分镜必须有商品或使用方式露出 |
| 文案/文字限制 | 不生成字幕、标题、口播、脚本正文 |
| 不允许出现的元素 | 平台流量承诺；直播成交承诺；AI 自动爆款暗示；无证据的运动稳定结论 |
| 是否需要人工审核 | 是 |

### 2.6 直播间讲解素材结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 为直播间讲解提供商品、证据、场景和购买疑虑回应的素材结构 |
| 适用平台 | 抖音 |
| 目标用户分层 | 户外运动爱好者；旅行内容创作者；数码发烧友 |
| 对应卖点 | 运动防抖；高清影像；户外环境覆盖；AI 剪辑辅助 |
| 必须使用的上游字段 | `直播间话术结构`；`human_in_the_loop_review`；`proof_requirements`；`bundles`；`availability` |
| 必须等待的证明材料 | 首发权益、套装和库存确认；防抖样片；防水条件说明；AI 剪辑流程演示 |
| 画面主体 | 直播讲解所需素材版块占位，不写直播画面 Prompt |
| 使用场景 | 直播间商品讲解、证明材料展示、购买疑虑回应 |
| 构图要求 | 商品、证明材料和要点区分明确，避免过度促单视觉 |
| 光线/色彩/风格要求 | 清晰、可信、适合讲解，不夸张 |
| 商品露出要求 | 商品主体和证明材料需对应讲解模块 |
| 文案/文字限制 | 不生成主播口播、促单文案、价格权益文案 |
| 不允许出现的元素 | GMV 或成交承诺；未经确认的价格权益；极限功效承诺；未经授权 Logo |
| 是否需要人工审核 | 是 |

### 2.7 达人 Brief 配图结构

| 字段 | 结构要求 |
| --- | --- |
| 画面目标 | 为达人协作提供可用场景、素材要求、禁用元素和审核流程的配图结构 |
| 适用平台 | 小红书；抖音 |
| 目标用户分层 | 旅行内容创作者；户外运动爱好者；数码发烧友 |
| 对应卖点 | 多平台复用；运动稳定记录；高清影像；AI 剪辑辅助 |
| 必须使用的上游字段 | `达人 Brief 结构`；`usage_scenario_interest_map`；`platform_selling_point_fit`；`required_assets`；`human_in_the_loop_review` |
| 必须等待的证明材料 | 商品白底图；佩戴/固定方式图；户外场景样片；App 截图；素材授权确认 |
| 画面主体 | 达人 Brief 中素材规范、禁用元素和审核流程的结构占位 |
| 使用场景 | 达人内容合作前的视觉规范说明 |
| 构图要求 | 清晰区分可用素材、禁止元素、审核流程和交付格式 |
| 光线/色彩/风格要求 | 专业、清晰、适合企业协作流转 |
| 商品露出要求 | 示例素材必须保持商品可见和授权可追溯 |
| 文案/文字限制 | 不生成达人发布文案、标题、标签或 Prompt |
| 不允许出现的元素 | 达人自行扩展未经证明的能力；未经授权名人形象；真实品牌 Logo；单一品牌专属工具包装 |
| 是否需要人工审核 | 是 |

## 3. 多模态约束与审计角度

### 3.1 字段来源

| 来源 | 画面字段 |
| --- | --- |
| Brief | `product_name`；`product_category`；`core_features`；`specs`；`usage_scenarios`；`visual_style`；`required_assets`；`compliance_rules`；`negative_constraints` |
| Audience Insight | `audience_segments`；`usage_scenario_interest_map`；`purchase_journey_notes`；`assumptions_to_validate` |
| Selling Point Matrix | `core_selling_point_priority`；`feature_benefit_mapping`；`audience_selling_point_fit`；`platform_selling_point_fit`；`proof_requirements`；`claim_risk_notes` |
| Platform Strategy | `channel_role_map`；`platform_strategy_plan`；`funnel_mapping`；`metrics_framework`；`ab_test_directions`；`human_in_the_loop_review` |
| Creative Copy Outline | `creative_copy_pack_outline`；`content_module_specs`；`claim_source_map`；`proof_waitlist`；`human_in_the_loop_review` |

### 3.2 高风险视觉表达

- 防水、防摔、稳定性视觉表达：不得暗示任何场景都防水、防摔、稳定。
- 高清影像质量视觉表达：不得暗示行业第一、全面超越手机或无条件高画质。
- AI 自动剪辑视觉表达：不得暗示自动生成爆款、保证内容表现或无需学习达到专业效果。
- 平台转化和 GMV 视觉表达：不得承诺平台流量、GMV、转化或商业收益。
- 品牌、Logo、名人和竞品元素：不得生成真实品牌 Logo、未经授权名人形象或具体竞品攻击。

### 3.3 必须等待品牌授权或证明材料的素材

- 商品白底图、商品渲染图、商品实拍图。
- 相机佩戴或固定方式图。
- 户外运动场景样片。
- 移动端 App 剪辑界面截图。
- 防水、防抖、高清 和 AI 剪辑证明材料。
- 首发权益、套装和库存相关信息。

### 3.4 必须交给 Brand Compliance Agent 的内容

- 所有视觉素材结构。
- 多模态审计映射。
- 高风险视觉表达清单。
- 禁止元素列表。
- 素材依赖和授权状态。
- 证明材料等待项。
- 后续图片 Prompt 生成前置条件。

### 3.5 可以交给 Creative Package Reporter 的内容

- Image Prompt Skill 职责边界。
- 上游风险和合规继承。
- 七类视觉素材结构。
- 多模态审计映射。
- 禁止元素和素材依赖。
- human-in-the-loop 审核项。
- Skill 复用说明和下游交接字段。

## 4. 禁止元素与合规边界

必须明确禁止：

- 不生成真实品牌 Logo。
- 不生成未经授权的名人形象。
- 不生成夸张失真的极限户外画面。
- 不暗示任何场景都防水、防摔、稳定。
- 不暗示 AI 剪辑能自动生成爆款。
- 不攻击具体竞品品牌。
- 不承诺平台流量、GMV、转化或商业收益。
- 不把项目包装成单一品牌专属工具。
- 不生成模型可直接使用的最终图片 Prompt。
- 不生成小红书正文、抖音脚本或直播话术。

## 5. 下游交接

### 5.1 传给 Brand Compliance Agent 的字段

```json
[
  "visual_asset_structures",
  "multimodal_audit_map",
  "visual_risk_register",
  "forbidden_elements",
  "asset_dependency_map",
  "human_in_the_loop_review",
  "upstream_inheritance.compliance_constraints"
]
```

交接说明：用于在最终图片 Prompt 生成前审核视觉结构、高风险声明、禁止元素、素材授权和证明材料依赖。

### 5.2 传给 Growth Metrics Agent 的字段

```json
[
  "visual_asset_structures.asset_type",
  "visual_asset_structures.applicable_platforms",
  "visual_asset_structures.corresponding_selling_points",
  "platform_strategy_plan.metrics_framework",
  "platform_strategy_plan.ab_test_directions",
  "asset_dependency_map"
]
```

交接说明：用于后续设计视觉素材变体评估、平台指标映射和素材复用率追踪。

### 5.3 传给 Creative Package Reporter 的字段

```json
[
  "skill_contract",
  "upstream_inheritance",
  "visual_asset_structures",
  "multimodal_audit_map",
  "visual_risk_register",
  "forbidden_elements",
  "asset_dependency_map",
  "human_in_the_loop_review",
  "reusability_notes"
]
```

交接说明：用于最终报告展示多模态 Workflow Trace、Skill 复用价值、视觉素材结构和审核状态。

### 5.4 后续如果真的生成图片 Prompt

后续应交给一个受 Brand Compliance Agent gate 控制的 `Future Image Prompt Generation Node`，而不是由本节点直接生成。

前置审核条件：

- Brand Compliance Agent 审核通过。
- 高风险声明的证明材料可用。
- 品牌素材授权完成。
- human-in-the-loop 审核完成。
- 已选择目标图片模型和平台尺寸要求。
- 已确认禁用元素和视觉风格边界。

## 6. 审计记录

| 项目 | 内容 |
| --- | --- |
| 输入 Brief | `sample_brief.json` |
| Brief Parser 产物 | `outputs/standardized_brief_summary.json` |
| Audience Insight 产物 | `outputs/audience_insight.json` |
| Selling Point 产物 | `outputs/selling_point_matrix.json` |
| Platform Strategy 产物 | `outputs/platform_strategy_plan.json` |
| Creative Copy 产物 | `outputs/creative_copy_pack_outline.json` |
| I/O 契约 | `workflow/agent_io_contracts.md` |
| 工作流说明 | `workflow/agent_workflow.md` |
| 生成 JSON 产物 | `outputs/image_prompt_pack_outline.json` |
| 生成 Markdown 报告 | `outputs/image_prompt_pack_outline.md` |
| 当前工作流节点 | 6 / 9 |
| 当前是否进入最终 Prompt 生成 | 否 |

结论：Image Prompt Skill 已完成结构化规划。该产物不是最终图片 Prompt，而是给 Brand Compliance、Growth Metrics、Creative Package Reporter 和后续受控图片 Prompt 生成节点使用的多模态素材规格。
