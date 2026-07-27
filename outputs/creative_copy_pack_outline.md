# Creative Copy Agent Report

产物：`creative_copy_pack_outline`  
版本：`0.1.0`  
Brief ID：`brief_demo_action_camera_001`  
工作流节点：Creative Copy Agent  
节点状态：`needs_review`  
置信度：`0.86`

本报告只运行 Creative Copy Agent 的结构化规划节点。当前阶段不生成最终营销文案、不生成小红书正文、不生成抖音脚本正文、不生成直播话术正文、不生成图片 Prompt、不做前端页面。

项目主线是“电商增长 Agent 工作台”：电商是业务场景，核心展示 AI Agent 产品化、Workflow 编排、Skills 体系、可审计输出、多 Agent 协作和合规约束传递。`运动相机` 只是 Demo 商品。

## 1. Agent / Skill 角度

### 1.1 职责边界

Creative Copy Agent 负责：

- 将上游 Agent 产物转成创意文案包结构。
- 定义每类内容的模块、字段来源、卖点边界、证明材料等待项和合规风险。
- 输出可交给 Brand Compliance、Image Prompt、Growth Metrics 和 Reporter 的结构化字段。

Creative Copy Agent 不负责：

- 最终营销文案
- 小红书正文
- 抖音脚本正文
- 直播话术正文
- 图片 Prompt
- 前端页面
- 公开发布审批

### 1.2 接收的上游 Agent 产物

| 上游节点 | 输入产物 | 使用方式 |
| --- | --- | --- |
| Brief Parser Agent | `outputs/standardized_brief_summary.json` | 获取标准化 Brief、品牌语气、审核模式、风险字段和合规敏感字段 |
| Audience Insight Skill | `outputs/audience_insight.json` | 获取用户分层、痛点、购买触发点、场景兴趣标签、待验证假设 |
| Selling Point Analyst Agent | `outputs/selling_point_matrix.json` | 获取卖点优先级、功能利益映射、证明材料需求和声明风险 |
| Platform Strategy Skill | `outputs/platform_strategy_plan.json` | 获取平台角色、内容格式、漏斗路径、指标框架、A/B 测试方向和人工审核项 |

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

- 不声称行业第一、唯一、最好、百分百稳定。
- 不攻击具体竞品品牌。
- 防水、防摔、续航等能力必须保留条件描述。
- 不暗示使用产品即可保证商业收益。
- 不暗示普通用户无需学习即可达到专业摄影师水平。
- 不把项目包装成单一品牌专属工具。

### 1.4 Human-in-the-loop 审核

| 审核项 | 原因 | 审核方 |
| --- | --- | --- |
| 所有进入正文生成前的内容模块 | 本节点只生成结构，正文生成前必须确认模块、字段来源和合规边界 | Brand Compliance Agent |
| 高清影像、防抖、防水、AI 剪辑相关表达 | 上游标记为高风险或需证明材料 | Brand Compliance Agent |
| 直播间商品点击、CVR、GMV 等转化表达 | 指标只能作为观测目标，不能作为承诺 | Brand Compliance Agent + Growth Metrics Agent |
| 达人 Brief 可用卖点和禁止表达 | 达人协作容易扩展未经证明的说法 | Brand Compliance Agent |

### 1.5 可复用性

这个 Agent 可复用于智能硬件、美妆、服饰、食品饮料、家电、B2B SaaS 等场景。可复用结构包括：`content_type`、`modules`、`do_not_generate`、`primary_upstream_fields`、`selling_point_boundaries`、`claim_source_map`、`proof_waitlist`。可替换维度包括平台、内容格式、品牌语气、合规规则、证明材料和指标目标。

产品化价值：它把“写文案”前置为可治理的工作流阶段，让内容结构、证据边界和合规责任先被审计，再进入正文生成。

## 2. 创意内容结构角度

### 2.1 抖音短视频脚本结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 开场场景钩子模块 | 定义场景和用户注意力入口 | 抖音平台角色；使用场景兴趣标签 | 不使用绝对化钩子 |
| 用户痛点呈现模块 | 映射运动不稳、构图困难、剪辑耗时 | Audience Insight 用户痛点 | 不夸大痛点 |
| 主卖点解释模块 | 指定防抖、多平台复用、AI 剪辑等卖点顺序 | Selling Point 优先级 | 性能类卖点需证据 |
| 证明材料占位模块 | 标记样片、测试条件、App 演示位置 | proof_requirements | 证明不到位不得生成正文 |
| 场景结果说明模块 | 定义可说明的场景结果范围 | usage_scenario_interest_map | 不承诺内容表现 |
| 转化动作占位模块 | 预留商品点击或直播间承接结构 | metrics_framework | 不承诺成交 |
| 合规备注模块 | 记录禁用表达和审核项 | compliance_constraints | 必须进合规审核 |

### 2.2 小红书种草笔记结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 场景身份引入模块 | 定义旅行、城市漫游、一人出行等内容入口 | Audience Insight 场景标签 | 不写正文 |
| 使用困扰说明模块 | 映射拍摄角度有限、横竖屏适配、剪辑负担 | 用户痛点与购买旅程 | 不制造焦虑 |
| 内容创作流程模块 | 定义后期取景、导出、AI 剪辑辅助位置 | 功能利益映射 | AI 只能作为辅助 |
| 卖点与场景对应模块 | 将多平台复用、高清、AI 剪辑映射到场景 | 卖点矩阵 | 不承诺专业大片 |
| 素材证明占位模块 | 标记样片、流程截图、素材授权 | proof_waitlist | 证明不到位不得生成正文 |
| 收藏/搜索意图占位模块 | 保留指标和用户动作结构 | Platform Strategy 指标 | 不承诺平台表现 |
| 合规备注模块 | 记录禁用表达 | 合规约束 | 进入合规审核 |

### 2.3 天猫详情页文案结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 商品定位模块 | 定义商品在类目中的表达位置 | 标准化 Brief；定位句 | 不写商品标题正文 |
| 核心卖点排序模块 | 定义详情页卖点模块顺序 | core_selling_point_priority | 不使用绝对化广告语 |
| 规格与证明模块 | 预留 高清、防水、防抖等参数证明 | specs；proof_requirements | 参数必须有证据 |
| 场景化利益点模块 | 把功能映射到旅行、骑行、滑雪等场景 | feature_benefit_mapping | 不夸张场景 |
| 套装与权益占位模块 | 预留套装和首发权益位置 | bundles；availability | 等待品牌确认 |
| 购买疑虑回应模块 | 对价格、剪辑、续航等阻力建结构 | barriers | 不承诺结果 |
| 合规条件说明模块 | 记录条件化表达需求 | compliance_rules | 合规审核前不生成正文 |

### 2.4 京东参数/问答内容结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 参数解释模块 | 定义 高清影像、防抖、防水、导出比例等解释结构 | specs；core_features | 只用已给参数 |
| 类目级对比模块 | 定义与手机、传统运动相机的类目差异 | competitors | 不攻击具体品牌 |
| 真实场景评测模块 | 预留样片和测试条件位置 | proof_requirements | 无证据不生成正文 |
| 购买疑问拆解模块 | 对剪辑、续航、必要性等问题建结构 | barriers；decision_factors | 不承诺解决所有问题 |
| 证明材料引用模块 | 记录引用材料来源 | proof_waitlist | 必须可追溯 |
| 售前问答占位模块 | 定义问答字段，不写问答正文 | content_formats | 需合规审核 |
| 合规备注模块 | 记录绝对化与竞品风险 | claim_risk_notes | 进入合规审核 |

### 2.5 直播间话术结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 开场商品定位模块 | 定义直播间开场信息结构 | 标准化 Brief；平台策略 | 不写口播 |
| 人群识别模块 | 对应户外、旅行、数码人群 | audience_segments | 不夸大人群痛点 |
| 场景痛点提问模块 | 建立痛点提问顺序 | need_pain_trigger_map | 不制造焦虑 |
| 卖点讲解顺序模块 | 定义卖点排序 | core_selling_point_priority | 高风险卖点带证明 |
| 证明材料展示提示模块 | 标记样片、测试、App 演示位置 | proof_requirements | 证明不到位不生成话术 |
| 购买疑虑回应模块 | 定义价格、续航、学习成本回应结构 | barriers | 不承诺收益 |
| 商品点击引导占位模块 | 保留商品点击结构 | metrics_framework | 不承诺 GMV |
| 合规提醒模块 | 标记禁用表达 | compliance_constraints | 必须审核 |

### 2.6 达人 Brief 结构

| 模块 | 作用 | 使用上游字段 | 卖点边界 |
| --- | --- | --- | --- |
| 合作目标模块 | 定义本次内容合作的业务目标 | campaign_goal；platform_strategy_plan | 不写具体 Brief |
| 目标人群模块 | 指定达人内容面向的人群 | audience_segments | 不扩大人群结论 |
| 内容场景模块 | 指定可选场景 | usage_scenario_interest_map | 不生成图片 Prompt |
| 可用卖点模块 | 列出可用卖点范围 | platform_selling_point_fit | 不扩展未经证明能力 |
| 必须避免表达模块 | 列出禁用表达 | do_not_claim；claim_risk_notes | 强制合规审核 |
| 素材与证明材料模块 | 指定必须使用或等待的材料 | required_assets；proof_waitlist | 未授权素材不可用 |
| 交付格式模块 | 定义平台格式与结构 | channel_role_map.content_formats | 不写发布文案 |
| 审核流程模块 | 定义品牌与合规审核路径 | human_in_the_loop_review | 不跳过审核 |

## 3. 约束与审计角度

### 3.1 每类内容的字段来源

| 内容类型 | 主要字段来源 |
| --- | --- |
| 抖音短视频脚本结构 | 抖音平台角色；卖点优先级；用户痛点；证明材料；指标框架 |
| 小红书种草笔记结构 | 小红书平台角色；旅行内容创作者洞察；场景兴趣标签；卖点边界 |
| 天猫详情页文案结构 | 商品规格；套装权益；卖点矩阵；证明材料；合规条件 |
| 京东参数/问答内容结构 | specs；competitors；proof_requirements；claim_risk_notes |
| 直播间话术结构 | 抖音平台策略；用户痛点；卖点顺序；转化指标；人工审核项 |
| 达人 Brief 结构 | audience_segments；usage_scenario_interest_map；platform_selling_point_fit；合规约束 |

### 3.2 必须等待证明材料的表达

- 高清影像质量：等待高清样片和分辨率规格说明。
- 运动防抖：等待真实运动样片、防抖测试条件和对比素材。
- 裸机防水与耐用：等待防水等级、深度、时长、环境条件和使用注意事项。
- AI 自动剪辑：等待流程演示、初稿示例和人工编辑步骤说明。
- 首发权益、套装和库存：等待品牌确认。

### 3.3 必须交给 Brand Compliance Agent 的内容

- 所有内容模块结构。
- `claim_source_map`
- `proof_waitlist`
- 高风险卖点边界。
- 禁止表达和合规规则。
- 直播间转化相关表达边界。
- 达人 Brief 可用卖点和必须避免表达。

### 3.4 可以交给 Creative Package Reporter 的内容

- Creative Copy Agent 职责边界。
- 上游风险和合规继承。
- 各平台内容模块结构。
- 字段来源、证明材料等待项和审核状态。
- Agent 可复用性说明。
- 下游交接字段和审计记录。

## 4. 下游交接

### 4.1 传给 Brand Compliance Agent 的字段

```json
[
  "creative_copy_pack_outline",
  "content_module_specs",
  "claim_source_map",
  "proof_waitlist",
  "human_in_the_loop_review",
  "upstream_inheritance.compliance_constraints",
  "upstream_inheritance.selling_point_claim_risks",
  "upstream_inheritance.platform_strategy_constraints"
]
```

交接说明：用于在任何正文生成前审核模块结构、禁用表达、证明材料依赖和合规边界。

### 4.2 传给 Image Prompt Skill 的字段

```json
[
  "creative_copy_pack_outline.content_type",
  "creative_copy_pack_outline.modules",
  "content_module_specs",
  "proof_waitlist",
  "upstream_inheritance.platform_strategy_constraints"
]
```

交接说明：只作为后续视觉规划上下文，本节点不生成图片 Prompt。

### 4.3 传给 Growth Metrics Agent 的字段

```json
[
  "creative_copy_pack_outline",
  "content_module_specs",
  "platform_strategy_plan.metrics_framework",
  "platform_strategy_plan.ab_test_directions",
  "claim_source_map",
  "human_in_the_loop_review"
]
```

交接说明：用于把后续创意变体与 KPI、A/B 测试和复盘字段连接起来。

### 4.4 传给 Creative Package Reporter 的字段

```json
[
  "agent_contract",
  "upstream_inheritance",
  "creative_copy_pack_outline",
  "content_module_specs",
  "claim_source_map",
  "proof_waitlist",
  "human_in_the_loop_review",
  "reusability_notes"
]
```

交接说明：用于展示文案结构规划的可追踪性、治理边界、Agent 复用能力和审核状态。

## 5. 审计记录

| 项目 | 内容 |
| --- | --- |
| 输入 Brief | `sample_brief.json` |
| Brief Parser 产物 | `outputs/standardized_brief_summary.json` |
| Audience Insight 产物 | `outputs/audience_insight.json` |
| Selling Point 产物 | `outputs/selling_point_matrix.json` |
| Platform Strategy 产物 | `outputs/platform_strategy_plan.json` |
| I/O 契约 | `workflow/agent_io_contracts.md` |
| 工作流说明 | `workflow/agent_workflow.md` |
| 生成 JSON 产物 | `outputs/creative_copy_pack_outline.json` |
| 生成 Markdown 报告 | `outputs/creative_copy_pack_outline.md` |
| 当前工作流节点 | 5 / 9 |
| 当前是否进入正文生成 | 否 |

结论：Creative Copy Agent 已完成结构化规划。该产物不是最终文案，而是给 Brand Compliance、Image Prompt、Growth Metrics 和 Creative Package Reporter 使用的可审计模块规格。
