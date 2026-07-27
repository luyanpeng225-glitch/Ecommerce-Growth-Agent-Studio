# Two-stage Compliance Optimization Spec

## 1. Purpose and Scope

This document defines a two-stage compliance optimization for E-commerce Growth Agent Studio. It is a workflow design specification only.

This optimization:

- Keeps exactly one `Brand Compliance Agent`.
- Gives that single Agent two run modes: `pre_check` and `post_generation_check`.
- Keeps exactly one `Image Prompt Skill`.
- Does not create a second Compliance Agent.
- Does not create a second Image Prompt Skill.
- Is not Step 16.
- Does not rerun or modify Steps 1-15.
- Does not create Schema, scripts, output JSON, final marketing copy, final image prompts, images, frontend pages, or public-release material.
- Keeps the Demo product name as `运动相机` only.

Steps 1-15 remain completed historical artifacts. The project remains `needs_review`, and all existing blocked release gates stay blocked.

## 2. Target Workflow

The target workflow repositions the same Brand Compliance Agent into two explicit runs, without adding any new Agent node:

```text
Brief Parser Agent
  → Brand Compliance Agent（pre_check）
  → Planner Agent
  → Audience Insight / Selling Point / Platform Strategy
  → Creative Agent
  → 单一 Image Prompt Skill
  → Brand Compliance Agent（post_generation_check）
  → Human Approval Node
  → Growth Evaluation Agent
  → Final Report Generator
```

### Workflow notes

- `Brand Compliance Agent（pre_check）` and `Brand Compliance Agent（post_generation_check）` are two runs of the same Agent, not two Agents.
- `Image Prompt Skill` remains a single Skill. It is not split into a visual-structure Skill and a controlled-prompt Skill.
- `Human Approval Node` remains the formal human approval node.
- `Growth Evaluation Agent` remains an evaluation node and does not release final generation or public publishing.
- `Final Report Generator` summarizes governed artifacts; it does not create final marketing material.

## 3. Brand Compliance Agent Run Modes

### 3.1 `pre_check`

`pre_check` is the early compliance run. It happens after Brief Parser Agent and before Planner Agent. Its job is to decide whether the standardized Brief is safe and complete enough to enter planning and creative structuring.

`pre_check` must check:

- Brief field completeness.
- Evidence materials for product capability claims.
- Brand, Logo, portrait, and asset authorization requirements.
- Forbidden expressions and negative constraints.
- Data source types, including mock, estimated, not_available, and human-review-required sources.
- Whether the workflow may enter planning and creative phases.

Typical `pre_check` decisions:

- `approved`: Brief can enter Planner Agent with tracked risks and constraints.
- `needs_review`: Brief can continue for structured planning, but the unresolved risks must be passed downstream.
- `blocked`: Brief must be corrected or supplemented before planning and creative structuring.

`pre_check` through-pass does not mean final content is compliant. It only means the Brief and inherited constraints are acceptable for structured planning.

### 3.2 `post_generation_check`

`post_generation_check` is the later compliance run. It happens after Creative Agent and the single Image Prompt Skill, before Human Approval Node. In the current Demo, it reviews structured creative and visual plans, not final assets.

`post_generation_check` must check:

- Creative Copy structured artifacts.
- Image Prompt Skill structured visual plan.
- Newly created factual claims and exaggerated wording.
- Consistency between claims and sources.
- Visual element and asset authorization risks.
- Whether the workflow may enter Human Approval.

Current Demo boundary:

- There is no final marketing copy.
- There is no final image Prompt.
- There are no generated images.
- `post_generation_check` currently reviews structured creative plans and structured visual plans only.

Typical `post_generation_check` decisions:

- `approved`: Structured creative and visual plans may enter Human Approval with preserved release gates.
- `needs_review`: Structured plans may enter Human Approval, but unresolved items must be explicitly reviewed by humans.
- `blocked`: Structured plans must return to Creative Agent, Image Prompt Skill, or upstream evidence collection before Human Approval.

`post_generation_check` through-pass does not mean public release is allowed. Human Approval remains required, and blocked release gates remain blocked unless future proof, authorization, and formal human approval explicitly release them.

## 4. Unified Compliance Record Fields

Both modes use the same field vocabulary so risks can be compared, routed, and audited across the workflow.

| Field | Meaning |
| --- | --- |
| `compliance_run_id` | Unique ID for one Brand Compliance Agent run, e.g. `brief_demo_action_camera_001::brand_compliance::pre_check::001`. |
| `mode` | `pre_check` or `post_generation_check`. |
| `trace_id` | Workflow trace identifier shared across related artifacts. |
| `risk_id` | Stable risk identifier. The same underlying risk keeps the same `risk_id` across both stages. |
| `risk_type` | Risk category, such as `brief_completeness`, `product_capability_claim`, `asset_authorization`, `forbidden_expression`, `data_source_type`, `visual_asset_risk`, or `business_result_claim`. |
| `source_artifact` | Artifact where the risk or claim is found. |
| `source_json_pointer` | JSON Pointer to the exact field when source is JSON; use a clear section pointer or `n/a_markdown_section` for Markdown-only sources. |
| `evidence_status` | Evidence state, e.g. `verified`, `requires_human_verification`, `missing`, `pending`, `derived_from_mock`, `estimated`, or `not_available`. |
| `severity` | Risk severity, e.g. `minor`, `major`, or `critical`. |
| `decision` | Unified decision: `approved`, `needs_review`, or `blocked`. |
| `revision_action` | Required correction, evidence collection, rewrite, or authorization action. |
| `release_gate_effect` | Effect on gates such as final marketing copy, final image Prompt, image generation, frontend page, and public release. |
| `human_review_required` | Boolean flag showing whether Human Approval must explicitly review this item. |

## 5. Unified Status Enum

The two modes use the same status enum:

- `approved`
- `needs_review`
- `blocked`

Interpretation:

- `approved` means the checked artifact may move to the next internal workflow stage under the recorded gate effects.
- `needs_review` means the workflow may continue only with explicit unresolved-risk visibility and human review requirements.
- `blocked` means the relevant workflow path must stop or return for revision before the next stage.

These statuses are workflow-control states. They do not prove factual truth, customer validation, production readiness, or public-release readiness.

## 6. Cross-stage `risk_id` Tracking

The same risk must use the same `risk_id` in both stages.

Example:

- `risk_performance_waterproof_stabilization_durability` may appear in `pre_check` when the Brief lacks waterproof, stabilization, or durability test conditions.
- The same `risk_id` must appear again in `post_generation_check` if Creative Copy or Image Prompt Skill structures include waterproof, stabilization, durability, outdoor scene, or performance wording that depends on the same missing proof.

This rule prevents downstream artifacts from hiding or renaming unresolved risks. Stage-specific fields such as `compliance_run_id`, `mode`, `source_artifact`, `source_json_pointer`, `decision`, and `revision_action` may differ, but `risk_id` stays stable for the underlying risk.

## 7. Mode-specific Inputs and Outputs

### 7.1 `pre_check` inputs

Expected inputs:

- Brief Parser Agent output.
- Original Brief fields.
- Product capability claims and proof fields.
- Brand and compliance constraints.
- Required asset list.
- Data source type indicators.
- Existing project boundaries and release gates.

Expected handoff:

- Risk register for Planner Agent.
- Planning constraints for Audience Insight, Selling Point, Platform Strategy, Creative Agent, and Image Prompt Skill.
- Explicit release gate effects.
- Human-review-required flags for downstream nodes.

### 7.2 `post_generation_check` inputs

Expected inputs:

- Creative Copy structured artifact.
- Single Image Prompt Skill structured visual plan.
- Claim source maps.
- Visual risk registers.
- Asset dependency maps.
- Forbidden elements.
- Risk register inherited from `pre_check`.

Expected handoff:

- Compliance decision for Human Approval Node.
- Cross-stage risk list with stable `risk_id` values.
- Required revision actions.
- Human review checklist.
- Release gate effects that preserve blocked gates.

## 8. Required Risk Coverage

The Brand Compliance Agent should preserve and track at least the following risk families across both modes when applicable:

- Brief field incompleteness.
- Product capability claims requiring proof, including image quality, waterproof, stabilization, durability, and AI-assisted editing.
- Brand, Logo, celebrity likeness, product image, App screenshot, and scene material authorization.
- Forbidden expressions, absolute superiority claims, and negative constraints.
- Business result claims involving CTR, CVR, GMV, traffic, conversion, sales, or viral performance.
- Data source type boundaries: mock, estimated, not_available, human_review_required, and artifact-derived data.
- Visual asset risks, unsafe scenes, exaggerated visual implications, and unauthorized elements.

## 9. Release Gate Policy

All existing blocked release gates remain unchanged.

The following remain blocked in the current Demo:

- Final marketing copy.
- Final image Prompt.
- Image generation.
- Frontend page.
- Public release.

Additional boundaries:

- `pre_check` approval does not allow final marketing copy, final image Prompt, image generation, frontend page, or public release.
- `post_generation_check` approval does not allow public release.
- Human Approval Node is still the formal approval checkpoint.
- Current Demo has no real customer validation and no production runtime data.
- Current Demo has no final marketing copy, final image Prompt, or generated images.
- Mock, estimated, and not_available data must not be presented as real performance or real customer evidence.

## 10. Product Naming and Claim Boundaries

- The product name must remain `运动相机`.
- Do not use brand names, model names, or resolution terms as product names.
- Do not restore or add unsupported 8K-style positioning.
- High-definition, panoramic, waterproof, stabilization, durability, AI editing, conversion, traffic, and GMV statements require evidence and human review before any final public-facing use.

## 11. Relationship to Existing Artifacts

This specification is forward-looking design documentation. It does not change historical outputs from Steps 1-15.

Existing artifact boundaries remain valid:

- Brand Compliance Agent remains a single Agent.
- Human Approval Node remains the formal approval node.
- Image Prompt Skill remains a single Skill.
- Claim Trace Matrix remains evidence tracing, not real-world proof.
- Portfolio Evidence Pack remains a evidence summary extension, not Step 16.
- The project status remains `needs_review`.

## 12. Non-goals

This optimization does not:

- Add a second Compliance Agent.
- Add a second Image Prompt Skill.
- Add a new mandatory Agent node.
- Define Step 16.
- Modify Steps 1-15 historical artifacts.
- Generate final marketing copy.
- Generate final image Prompts.
- Generate images.
- Generate frontend pages.
- Release any blocked gate.
- Claim customer validation, production readiness, or real production telemetry.
