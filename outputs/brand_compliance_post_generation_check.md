# Brand Compliance Agent post_generation_check Report

## 运行模式

- compliance_mode: `post_generation_check`
- execution_context: `retrospective_design_validation`
- historical_execution_claimed: `false`
- 商品名称：运动相机
- compliance_run_id: `brief_demo_action_camera_001::brand_compliance::post_generation_check::001`
- trace_id: `brief_demo_action_camera_001::two_stage_compliance`

本次是回溯式设计验证，不声称该检查在历史 Human Approval 前真实运行过，也不补造历史 timestamp、耗时或运行时间。当前检查对象只是结构化创意方案和结构化视觉方案；本次没有检查最终营销文案、最终图片 Prompt 或生成图片。

## 总体结论

- 整体 decision: `needs_review`
- target_stage: `Human Approval Node`
- 是否允许进入 Human Approval：允许，但必须携带全部 unresolved 风险和 risk_traceability_gap。
- 是否允许最终营销文案：不允许，继续 `blocked`。
- 是否允许最终图片 Prompt：不允许，继续 `blocked`。
- 是否允许图片生成：不允许，继续 `blocked`。
- 是否允许前端页面：不允许，继续 `blocked`。
- 是否允许公开发布：不允许，继续 `blocked`。

结构化创意方案和结构化视觉方案保留了 proof waitlist、claim source map、asset dependency map、forbidden elements 和人工审核要求，因此可以进入 Human Approval Node 做正式人工审核。但“已记录”“等待审核”“增加免责声明”不等于风险已解决；所有 pre_check 继承风险仍未见正式证明材料、有效素材授权或明确删除。

## 继承与跨阶段分类

- inherited_risk_ids: 10，与 pre_check 的 detected_risk_ids 完全一致。
- resolved_risk_ids: 0。
- unresolved_risk_ids: 10。
- newly_detected_risk_ids: 1，即 `risk_traceability_gap`。

历史下游结构化产物继承了风险主题、proof waitlist 与 forbidden elements，但没有逐条使用本次新增 pre_check 的稳定 risk_id。由于本次 Two-stage Compliance Optimization 是回溯式设计验证，这不是历史执行事实错误，但对双阶段审计而言构成跨阶段可追踪性缺口，已新增 `risk_traceability_gap` 并将整体 decision 保持为 `needs_review`。

## 结构化创意方案检查

结论：可进入人工审核，但不得进入最终文案生成。

主要发现：

- 未生成最终营销文案、脚本正文、直播话术或公开素材。
- claim source map 保留了高清影像、运动防抖、裸机防水与耐用、AI 自动剪辑、平台转化与商业结果的来源边界。
- proof waitlist 覆盖高清样片与规格说明、运动防抖真实样片和测试条件、防水等级/深度/时长/使用条件、AI 自动剪辑流程演示等关键证明等待项。
- 未见“最好”“唯一”“百分百稳定”“自动生成爆款”“保证 GMV/流量/转化”等最终正文承诺。
- 但相关能力声明仍然存在于结构化模块中，且没有正式证明材料，因此不得标记为 resolved。

## 结构化视觉方案检查

结论：可进入人工审核，但不得进入最终图片 Prompt 或图片生成。

主要发现：

- 当前产物是 visual asset structure，不是最终图片 Prompt，也不是模型可直接使用的 Prompt。
- visual risk register 明确保留防水、防摔、稳定性、高清影像、AI 自动剪辑、平台转化、品牌 Logo、名人和竞品元素等风险。
- asset dependency map 保留商品白底图、佩戴或固定方式图、户外运动场景样片、移动端 App 剪辑界面截图及证明材料的授权/审核要求。
- forbidden elements 明确禁止真实品牌 Logo、未经授权名人形象、夸张失真的极限户外画面、任何场景防水/防摔/稳定暗示、AI 自动生成爆款、竞品攻击、平台流量/GMV/转化承诺等。
- 但保留授权要求不等于已经获得授权，因此素材相关风险仍 unresolved。

## 仍需 Human Approval 重点审核

- 高清和 360 度拍摄是否有正式规格、样片和证明材料。
- 运动防抖是否有测试条件和真实样片。
- 裸机防水与耐用是否有等级、深度、时长、环境条件和使用限制。
- AI 自动剪辑是否只表达为辅助能力，是否避免爆款、专业级保证或零学习成本承诺。
- 商品白底图、佩戴/固定方式图、户外运动场景样片、App 界面截图是否授权。
- Logo、人物肖像、场景素材和真实品牌元素是否完成权利清理。
- CTR、CVR、GMV、流量和成交是否仅作为观测指标，不被写成结果承诺。
- post_generation_check 后续是否继续使用稳定 risk_id，避免风险改名、遗漏或弱化。

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

`post_generation_check` 的 `needs_review` 只表示结构化方案可以进入 Human Approval Node；不代表最终内容合规，不代表证明或授权已补齐，不代表允许最终生成、图片生成、前端页面或公开发布。
