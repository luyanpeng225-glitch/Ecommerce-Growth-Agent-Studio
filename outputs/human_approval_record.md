# Step 13: Human Approval Node 审批记录
## 1. 节点定位与职责边界

Human Approval Node 是 E-commerce Growth Agent Studio / 电商增长 Agent 工作台的 ToB 企业人工审批节点。它承接 Planner Agent 的 V2 执行计划、Creative Agent 的结构化创意方案和 Brand Compliance Agent 的风险结论，形成可审计、可追踪、可交给下游节点读取的审批记录。

本节点不生成最终营销文案、不生成最终图片 Prompt、不生成图片、不修改原始商品 Brief、不自动解除合规阻断，也不伪造真实人工签字或审批人姓名。
## 2. 本次审批范围

- Demo 商品名称：运动相机。
- 审批对象：结构化规划包、创意结构、合规风险、证明材料缺口、素材授权缺口和 release gates。
- 审批性质：作品集 Demo 审批记录，不是真实企业员工签字。
## 3. 上游输入文件

- `PROJECT_MEMORY_FOR_OPENCLAW.md`
- `README.md`
- `FILE_INDEX.md`
- `workflow/agent_workflow.md`
- `workflow/agent_io_contracts.md`
- `prompts/planner_agent.md`
- `outputs/planner_execution_plan.json`
- `outputs/creative_copy_pack_outline.json`
- `outputs/brand_compliance_report.json`
- `data/sample_brief.json`
## 4. 审批结论摘要

- Overall decision：`needs_revision`。
- 结构化规划产物可以进入 Step 14：Growth Evaluation Agent。
- 可以进入测评不等于允许最终生成。
- 最终营销文案、最终图片 Prompt、图片生成和公开发布继续保持 `blocked`。
- reviewer_name：`null`；human_signature：`pending`；reviewed_at：`null`。
## 5. 分角色审批意见

| 角色 | 决策 | 意见 | 所需证明 |
| --- | --- | --- | --- |
| 品牌 | `needs_revision` | 项目定位与 Demo 商品命名可用于作品集展示。；品牌语气、卖点边界和 AI 自动剪辑表述仍需人工确认。 | 品牌语气确认；可用卖点清单；AI 自动剪辑演示材料 |
| 法务/合规 | `blocked` | 最终生成和公开发布条件不满足。；性能声明、商业结果表达和素材授权仍存在关键阻断。 | 防水等级和使用条件；防抖测试条件；耐用性限制说明；广告合规确认 |
| 电商运营 | `approved` | 结构化规划包可以进入 Step 14 做流程测评。；指标只能作为观测、实验、看板或复盘字段。 | 渠道目标确认；指标口径确认 |
| 内容负责人 | `needs_revision` | 创意模块结构可用于测评。；最终文案生成前需要补齐证明材料和改写规则。 | claim 来源映射；证明材料清单；禁止表达清单 |
| 设计负责人 | `blocked` | 未提供真实素材授权，不能进入最终图片 Prompt 或图片生成。；可在 Step 14 评估素材授权缺口对流程的影响。 | 商品图授权；App 截图授权；场景素材授权；人物肖像授权或排除证明 |

## 6. 风险与证明材料检查表

| 审批项 | 类别 | 风险 | 证据状态 | 决策 | 责任角色 |
| --- | --- | --- | --- | --- | --- |
| approval_item_001 | structured_planning_package | minor | verified | `approved` | 电商运营 |
| approval_item_002 | copy_structure | major | missing | `needs_revision` | 内容负责人 |
| approval_item_003 | technical_and_performance_claims | critical | missing | `blocked` | 法务/合规 |
| approval_item_004 | ai_auto_editing_claim | major | pending | `needs_revision` | 品牌 |
| approval_item_005 | growth_metric_language | critical | verified | `approved` | 电商运营 |
| approval_item_006 | asset_authorization | critical | missing | `blocked` | 设计负责人 |
| approval_item_007 | portfolio_demo_positioning | minor | verified | `approved` | 品牌 |

## 7. Release Gate 状态表

| Gate | 状态 |
| --- | --- |
| structured_planning_package | `approved` |
| growth_evaluation | `approved` |
| final_marketing_copy | `blocked` |
| final_image_prompt | `blocked` |
| image_generation | `blocked` |
| public_release | `blocked` |

## 8. Revision Queue

| ID | Source Node | Issue | Required Action | Owner | Priority | Return To |
| --- | --- | --- | --- | --- | --- | --- |
| rev_001 | Creative Agent | 高清、全景、防水、防抖、耐用等表达缺少完整证明材料和适用条件。 | 补充证明材料字段、适用范围、限制说明和可替代表达。 | 内容负责人 | high | Creative Agent |
| rev_002 | Brand Compliance Agent | 最终生成和公开发布的合规阻断仍未解除。 | 确认合规替代表达、阻断规则和人工复核清单。 | 法务/合规 | high | Brand Compliance Agent |
| rev_003 | Image Prompt Skill | 商品图片、App 截图、Logo、人物肖像和场景素材缺少授权。 | 补充素材授权、来源追踪和使用范围；未完成前保持图片相关 release gate blocked。 | 设计负责人 | high | Image Prompt Skill |
| rev_004 | Planner Agent | 进入 Step 14 时需要保留“可测评不等于可生成”的闸口说明。 | 将审批状态、blocked items 和 revision queue 传给 Growth Evaluation Agent。 | 电商运营 | medium | Growth Evaluation Agent |

## 9. Growth Evaluation 下游交接

- 该审批记录完成时的下一步为 Step 14 Growth Evaluation Agent；目前 Steps 14-15 均已完成，后续只做验证扩展。
- growth_evaluation_allowed：`true`。
- generation_allowed：`false`。
- 传递字段：审批状态、角色意见、release gates、revision queue、blocked items 和 unresolved risks。
- Step 14 只能评估工作流质量、风险拦截、字段完整度、人工修改需求和失败归因，不能提前生成最终内容。
## 10. 审计记录

- trace_id：`brief_demo_action_camera_001::step13_human_approval_node`。
- created_for：`portfolio_demo`。
- 决策依据：Planner 路由、Creative 结构化产物、Brand Compliance 阻断结论，以及未提供真实审核人、签字、时间和授权证明的事实。
## 11. 当前不能放行的内容

- 最终营销文案：`blocked`。
- 最终图片 Prompt：`blocked`。
- 图片生成：`blocked`。
- 公开发布：`blocked`。
- 任何把 GMV、流量、CTR、CVR 或转化提升写成结果承诺的表达：`blocked`。
- 未授权的 Logo、人物肖像、商品图片、App 截图和场景素材：`blocked`。
## 12. 作品集展示价值

本节点展示了企业级 Agent Workflow 中的 human-in-the-loop 治理能力：既允许结构化规划产物进入测评闭环，又明确阻断最终生成和公开发布，体现审批角色、证据要求、合规风险、release gate 和下游交接字段的可审计设计。
