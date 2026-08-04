# Overseas Beauty Visual Content Case

This case uses the E-commerce Growth Agent Studio workflow to translate overseas audience and platform-content hypotheses into an executable visual system, image-prompt drafts, review gates, and an evaluation report.

[Open the interactive demo](../../../beauty/)

## Case

- Product: generic **Barrier Support Serum** concept
- Markets: United States and United Kingdom
- Platforms: TikTok, Instagram, Pinterest, and Amazon
- Output language: English
- Status: `needs_review`

The product is intentionally generic. The case does not use a real brand, claim completed customer research, or report campaign performance.

## Workflow output

```text
Structured Brief
  -> Audience & Platform Insight
  -> Visual Effect Plan
  -> Executable Image Prompt Drafts
  -> Compliance Pre/Post Review
  -> Human Approval Gate
  -> Evaluation & Test Plan
```

| Artifact | Purpose |
|---|---|
| [`brief.json`](../../../data/cases/overseas_beauty_serum/brief.json) | Structured market, product, audience, channel, claim, and governance input |
| [`audience_platform_insights.json`](audience_platform_insights.json) | Brief-derived audience hypotheses and platform adaptation rules |
| [`visual_effect_plan.json`](visual_effect_plan.json) | Four modular, production-oriented visual specifications |
| [`image_prompt_pack.json`](image_prompt_pack.json) | Four executable prompt drafts with negative prompts and review criteria |
| [`review_and_evaluation.json`](review_and_evaluation.json) | Compliance checks, human gate, rubric, and experiment plan |

## What can run now

Neutral concept generation is allowed using placeholder packaging. Each output must retain prompt/model metadata and pass post-generation review.

## What remains blocked

- real brand or package assets;
- final efficacy claims;
- paid-media use;
- public campaign release.

These uses require claim substantiation, asset rights, current platform-policy review, US/UK localization, and a recorded human approval.

## Evaluation result

The weighted artifact score is `0.86`, excluding business performance, customer validation, and production reliability. No images or campaign results were generated in this run, so commercial impact remains `not_available`.
