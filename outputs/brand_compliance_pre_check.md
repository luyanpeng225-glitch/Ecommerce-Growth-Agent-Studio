# Brand Compliance Agent pre_check Report

## 运行模式

- compliance_mode: `pre_check`
- execution_context: `retrospective_design_validation`
- historical_execution_claimed: `false`
- 商品名称：运动相机
- compliance_run_id: `brief_demo_action_camera_001::brand_compliance::pre_check::001`
- trace_id: `brief_demo_action_camera_001::two_stage_compliance`

本次是回溯式设计验证，只验证如果 Brand Compliance Agent 以 `pre_check` 模式运行在 Brief Parser Agent 之后、Planner Agent 之前，应如何记录风险和治理结论。本文不声称该 pre_check 在历史 Steps 1-15 执行前真实运行过，也不补造历史运行时间、耗时或 timestamp。

## 总体结论

- 整体 decision: `needs_review`
- 是否允许进入 Planner Agent：允许，但必须携带全部风险和限制。
- 是否允许最终营销文案：不允许，继续 `blocked`。
- 是否允许最终图片 Prompt：不允许，继续 `blocked`。
- 是否允许图片生成：不允许，继续 `blocked`。
- 是否允许前端页面：不允许，继续 `blocked`。
- 是否允许公开发布：不允许，继续 `blocked`。

Brief 结构完整：标准化摘要显示必填字段和已定义字段均已提供。因此，Planner 可以使用该 Brief 进入结构化规划。但 Brief 完整不等于事实证明充分；Brief 中 `proof` 字段填写的描述只是自述或需求线索，不等于第三方证明、正式测试报告、素材授权、法务审批或真实投放结果。

## 可进入 Planner 的内容

Planner Agent 可以读取并使用以下结构化输入：

- 商品和业务上下文：运动相机、智能影像设备、新品上市营销工作流。
- 受众、使用场景、决策因素和购买障碍。
- 渠道角色、内容形式、KPI 观测字段、预算和节奏。
- 品牌语气、视觉风格、合规规则、负向约束。
- 商品能力声明和必要素材清单，但只能作为待验证规划约束，不得升级为最终承诺。

Planner 必须把所有风险继续传递给后续 Audience Insight、Selling Point、Platform Strategy、Creative Agent、Image Prompt Skill、post_generation_check 和 Human Approval。

## 必须传递到 post_generation_check 和 Human Approval 的风险

1. `risk_brief_structure_complete_but_evidence_not_formal`  
   Brief 结构完整，但字段齐全不代表事实证明充分。

2. `risk_hd_360_image_quality_requires_formal_proof`  
   高清和 360 度拍摄需要正式规格、测试条件、样片来源或技术证明。

3. `risk_stabilization_claim_requires_test_conditions`  
   运动防抖需要测试场景、适用限制和正式评测或样片证明。

4. `risk_waterproof_durability_requires_rating_and_limits`  
   裸机防水与耐用需要等级、深度、时长、环境条件、测试标准和免责边界。

5. `risk_ai_auto_editing_effect_requires_scope_limits`  
   AI 自动剪辑只能作为辅助效率能力，不能承诺爆款、专业摄影师水平、零学习成本或商业结果。

6. `risk_required_product_app_scene_assets_need_authorization`  
   商品白底图、商品佩戴或固定方式图、户外运动场景样片、移动端 App 剪辑界面截图都需要授权确认。

7. `risk_logo_portrait_and_scene_materials_need_rights_clearance`  
   Logo、人物肖像、真实品牌元素、场景素材和 App 界面截图需要权利清理；不得生成真实品牌 Logo 或未经授权的人物肖像。

8. `risk_forbidden_expression_competitor_and_negative_constraints`  
   必须避免行业第一、最好、唯一、百分百稳定、攻击具体竞品品牌、任何场景不会损坏、无需学习达到专业水平等表达。

9. `risk_growth_metrics_must_not_be_result_promises`  
   CTR、CVR、GMV、流量、成交、直播间进入率、商品点击率等只能作为观测指标、实验指标或复盘字段，不能作为结果承诺。

10. `risk_mock_estimated_not_available_data_must_not_be_real_results`  
    mock、estimated、not_available、artifact_derived 数据不得被写成真实客户验证、真实投放结果或生产 telemetry。

## 能力声明证明要求

以下能力声明需要正式证明后才能进入最终对外表达：

- 高清和 360 度拍摄。
- 运动防抖。
- 裸机防水与耐用。
- AI 自动剪辑。

在证明补齐前，这些内容只能作为结构化规划中的待验证卖点和审核约束。

## 素材授权要求

以下素材必须在最终内容前完成授权确认：

- 商品白底图。
- 商品佩戴或固定方式图。
- 户外运动场景样片。
- 移动端 App 剪辑界面截图。
- Logo、人物肖像、真实品牌元素和场景素材。

## release gates

| Gate | Status |
| --- | --- |
| structured_planning_package | needs_review |
| growth_evaluation | approved_for_evaluation_only |
| final_marketing_copy | blocked |
| final_image_prompt | blocked |
| image_generation | blocked |
| frontend_page | blocked |
| public_release | blocked |

`pre_check` 的 `needs_review` 只表示可以带风险进入 Planner 和结构化创意阶段；不代表最终内容合规，不代表事实已经被证明，不代表素材已经授权，不代表允许生成最终图片 Prompt、图片、前端页面或公开发布。
