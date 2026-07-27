# Automatic Claim Trace Matrix Spec

Validation Extension C / Substep 1：Automatic Claim Trace Matrix Spec。

本文件只定义后续 Automatic Claim Trace Matrix 的口径，不生成 Claim Trace Matrix JSON、不创建 Schema、不创建脚本、不重跑或修改 Steps 1-15，也不解除任何 release gate。

## 1. Purpose

Claim Trace Matrix 的目的：追踪一项声明从原始来源、下游引用、证据状态、合规判断到 release gate 的完整路径。

它用于回答：

- 这项声明最早来自哪里？
- 是否能在原始 Brief 或正式证明材料中找到来源？
- 下游哪些 Agent / Skill 引用了、改写了或扩展了这项声明？
- 引用后的含义是否仍与上游一致？
- 证据状态是什么？
- Brand Compliance 和 Human Approval 对它的治理判断是什么？
- 它对最终营销文案、最终图片 Prompt、图片生成、前端页面和公开发布 release gates 的影响是什么？

本项目 Demo 商品名称只使用“运动相机”。Claim Trace Matrix 不得把技术参数、功能词或画质词恢复为商品名称，也不得把下游 Agent 产物反向当作原始事实证明。

## 2. Source Artifacts for Future Matrix

未来生成 Claim Trace Matrix 时，至少读取以下现有产物：

- `data/sample_brief.json`
- `outputs/standardized_brief_summary.json`
- `outputs/selling_point_matrix.json`
- `outputs/platform_strategy_plan.json`
- `outputs/creative_copy_pack_outline.json`
- `outputs/image_prompt_pack_outline.json`
- `outputs/brand_compliance_report.json`
- `outputs/growth_metrics_plan.json`
- `outputs/human_approval_record.json`
- `outputs/growth_evaluation_report.json`
- `outputs/v2_final_report.json`

## 3. Claim Categories

每条声明必须归入以下类别之一：

| claim_category | 说明 |
| --- | --- |
| `product_capability` | 产品能力、规格、功能、使用条件或性能边界相关声明。 |
| `ai_capability` | AI 自动剪辑、智能识别、自动生成初稿等 AI 能力相关声明。 |
| `usage_scenario` | 户外、旅行、骑行、滑雪、水上等使用场景和用户结果相关声明。 |
| `visual_asset_authorization` | 商品图、App 截图、Logo、人物肖像、场景素材、达人素材等素材授权相关声明。 |
| `compliance_or_safety` | 广告法、平台规范、安全边界、绝对化表达、竞品比较、禁用表达相关声明。 |
| `growth_or_business_outcome` | CTR、CVR、GMV、流量、转化、成交、直播间商品点击等增长或业务结果相关声明。 |

## 4. Required Fields per Claim

未来每条 Claim Trace Matrix 记录必须包含以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `claim_id` | string | 稳定声明 ID，例如 `claim_product_capability_001`。 |
| `claim_category` | enum | 声明类别，使用第 3 节枚举。 |
| `claim_summary` | string | 声明摘要。必须保持中性，不写成最终营销文案。 |
| `source_artifact` | string/null | 原始事实来源文件。优先为 `data/sample_brief.json` 或正式证明材料；没有来源时为 null。 |
| `source_json_pointer` | string/null | 指向原始来源字段的 JSON Pointer，例如 `/core_features/2/proof`。没有来源时为 null。 |
| `source_exists` | enum | source trace 状态，使用第 5 节枚举。 |
| `evidence_artifact` | string/null | 证据文件。可与 source_artifact 相同；如果需要外部证明但未提供，则为 null。 |
| `evidence_json_pointer` | string/null | 指向证据字段的 JSON Pointer；无证据时为 null。 |
| `evidence_status` | enum | 证据状态，使用第 6 节枚举。 |
| `downstream_artifacts` | array | 下游引用该声明的产物列表。每项应包含 artifact path、JSON Pointer、引用类型和一致性检查结果。 |
| `risk_level` | string | 风险等级，例如 `minor`、`medium`、`major`、`critical`。 |
| `human_review_required` | boolean | 是否需要人工确认。缺少来源、缺少证明、涉及法律授权或影响发布闸口时必须为 true。 |
| `compliance_decision` | string | 合规判断，例如 `approved_for_planning`、`needs_revision`、`blocked_for_final_generation`、`not_applicable`。 |
| `release_gate_effect` | object | 对 release gates 的影响，应至少说明 final marketing copy、final image prompt、image generation、frontend page、public release 是否 blocked。 |
| `required_action` | string | 后续动作，例如补证明材料、补授权、修改表达、保持观测口径、禁止最终生成等。 |

## 5. Source Trace Status Enum

`source_exists` 必须使用以下枚举：

- `source_found`：源文件存在，JSON Pointer 存在，并能定位到声明来源。
- `source_missing`：应有源文件或证明材料，但文件不存在。
- `pointer_missing`：源文件存在，但 JSON Pointer 不存在或不能定位到声明来源。
- `conflicting_sources`：多个来源存在冲突，不能自动判定哪一个为准。
- `not_applicable`：该记录不是事实声明来源追踪，例如纯治理规则或 release gate 汇总。

## 6. Evidence Status Enum

`evidence_status` 必须使用以下枚举：

- `supported_by_provided_source`：当前项目内提供的原始 Brief 或正式证明材料直接支持该声明。
- `requires_human_verification`：有线索或下游引用，但需要人工核验证明材料、条件、授权或表达边界。
- `unsupported`：没有可用来源或证据，或下游扩展超出原始来源。
- `derived_from_mock`：来自 mock 数据、样例审计日志或 Demo 测评数据，只能用于演示或测评，不能证明真实业务效果。
- `not_available`：当前没有可靠证据或样本，不能判断。

## 7. Downstream Artifact Record Shape

`downstream_artifacts` 中每项建议使用以下结构：

```json
{
  "artifact": "outputs/example.json",
  "json_pointer": "/data/path/to/reference",
  "reference_type": "direct_quote | paraphrase | risk_inheritance | governance_decision | metric_observation",
  "value_consistency": "consistent | expanded_claim | narrowed_claim | conflicting | not_machine_comparable",
  "notes": "string"
}
```

说明：

- `direct_quote` 表示直接引用上游字段。
- `paraphrase` 表示改写或摘要。
- `risk_inheritance` 表示继承风险、证明需求或禁止表达。
- `governance_decision` 表示 Brand Compliance、Human Approval、Growth Evaluation 或 V2 Final Report 给出的治理判断。
- `metric_observation` 表示仅作为指标、实验、看板或复盘字段出现，不代表真实业务结果。

## 8. Machine-Checkable Items

机器可以检查：

1. 文件是否存在：
   - `source_artifact` 是否存在。
   - `evidence_artifact` 是否存在。
   - `downstream_artifacts[].artifact` 是否存在。

2. JSON Pointer 是否存在：
   - `source_json_pointer` 是否能在 source_artifact 中定位。
   - `evidence_json_pointer` 是否能在 evidence_artifact 中定位。
   - `downstream_artifacts[].json_pointer` 是否能在对应下游产物中定位。

3. 上下游值是否一致：
   - 下游是否直接引用了上游字段。
   - 下游是否把“结构化规划”扩展成“最终生成许可”。
   - 下游是否把“观测指标”扩展成“业务结果承诺”。
   - 下游是否把“需要证明”扩展成“已证明”。

4. blocked 状态是否正确继承：
   - final marketing copy 是否仍为 `blocked`。
   - final image prompt 是否仍为 `blocked`。
   - image generation 是否仍为 `blocked`。
   - frontend page 是否仍为 `blocked`。
   - public release 是否仍为 `blocked`。

5. 商品命名是否一致：
   - Demo 商品名称只能是“运动相机”。
   - 不得将参数词、功能词或规格词恢复为商品名称。

## 9. Not Machine-Proved Items

机器不能证明：

- 商品声明在现实中是否真实。
- 品牌、Logo、肖像或素材是否获得法律授权。
- 审美质量、视觉冲击力、构图质量或素材是否真正适合投放。
- GMV、CTR、CVR、流量、成交或转化提升是否真实发生。
- 人工审核人是否真实代表企业授权，除非后续提供可验证的审批记录和授权材料。
- 外部证明材料是否权威、完整、未过期、适用于当前使用条件。

这些项目必须保留人工审核或正式证明材料要求，不能仅凭 JSON 结构或下游 Agent 产物自动放行。

## 10. Source Priority Rules

来源优先级如下：

1. 原始 Brief 或正式证明材料是事实来源。
   - `data/sample_brief.json` 可作为 Demo 输入事实来源。
   - 未来正式规格书、测试报告、素材授权书、审批记录可作为更高可信证据。

2. Human Approval 和 Brand Compliance 是治理决定来源。
   - `outputs/brand_compliance_report.json` 可证明某项风险是否被识别、是否要求证明、是否阻断最终生成。
   - `outputs/human_approval_record.json` 可证明 Demo 审批记录中的治理判断，但不能伪造真实企业签字或授权。

3. Agent 下游产物只能算引用，不能反过来证明原始声明。
   - `outputs/selling_point_matrix.json`、`outputs/platform_strategy_plan.json`、`outputs/creative_copy_pack_outline.json`、`outputs/image_prompt_pack_outline.json`、`outputs/growth_metrics_plan.json` 等只能说明声明被引用、改写、结构化或纳入计划。
   - 下游产物不能把未证明的产品能力变成已证明事实。

4. mock 数据不能证明真实业务效果。
   - `data/evaluation_metrics_sample.csv`、`data/audit_log_sample.json`、Growth Evaluation 中的 derived_from_mock / estimated / not_available 只能用于 Demo 测评，不证明真实 GMV、CTR、CVR、流量或转化结果。

## 11. Required Handling for Missing Source or Evidence

没有来源或证据的声明必须标记为以下之一，不能自动放行：

- `unsupported`
- `not_available`
- `requires_human_verification`

规则：

- 如果 source_artifact 缺失：`source_exists = source_missing`，`evidence_status` 通常为 `unsupported` 或 `not_available`。
- 如果 source_artifact 存在但 JSON Pointer 不存在：`source_exists = pointer_missing`。
- 如果来源存在但缺少证明条件、规格、授权或测试材料：`evidence_status = requires_human_verification`。
- 如果声明来自 mock 或 Demo 测评数据：`evidence_status = derived_from_mock`，并禁止写成真实业务效果。
- 如果多个来源冲突：`source_exists = conflicting_sources`，必须进入人工审核。

## 12. Release Gate Baseline

Claim Trace Matrix 必须保留现有 blocked release gates。当前基线：

| Release gate | Status |
| --- | --- |
| structured_planning_package | `approved` |
| growth_evaluation | `approved_for_evaluation_only` |
| final_marketing_copy | `blocked` |
| final_image_prompt | `blocked` |
| image_generation | `blocked` |
| frontend_page | `blocked` |
| public_release | `blocked` |

说明：

- `approved_for_evaluation_only` 只表示可以用于测评，不等于允许最终生成或公开发布。
- 任何没有来源或证据的声明不得解除 blocked gate。
- 涉及素材、Logo、肖像、商品图、App 截图或场景素材的声明，必须等待正式授权证明和人工审核。

## 13. Initial Claim Families to Cover Later

未来生成 Claim Trace Matrix JSON 时，至少覆盖以下声明族：

1. 产品能力与性能边界：
   - 画质、全景、后期取景、运动防抖、防水、耐用、导出比例、移动端剪辑与导出。

2. AI 能力边界：
   - AI 自动剪辑、精彩片段识别、短视频初稿、效率观察口径。

3. 使用场景：
   - 骑行、旅行、滑雪、水上、雨天、海边等场景是否来自 Brief，是否被下游扩展。

4. 视觉素材授权：
   - 商品图、App 截图、Logo、人物肖像、场景样片、达人或创作者素材。

5. 合规与安全：
   - 绝对化表达、竞品攻击、任何场景不会损坏、普通用户无需学习达到专业效果等禁止表达。

6. 增长或业务结果：
   - CTR、CVR、GMV、流量、转化、成交、直播间商品点击等只允许作为观测、实验、看板或复盘字段。

## 14. Non-Goals for This Substep

本小步不做：

- 不创建 Claim Trace Matrix JSON。
- 不创建 Schema。
- 不创建 JavaScript 脚本。
- 不更新 README 或文件导航。
- 不修改任何上游 JSON。
- 不生成营销内容、图片 Prompt、图片或前端。
- 不新增 Agent 节点。
- 不解除任何 blocked release gate。
