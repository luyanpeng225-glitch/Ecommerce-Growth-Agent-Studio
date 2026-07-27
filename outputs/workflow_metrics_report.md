# Workflow Metrics Report

## Dashboard

| Metric | Value | Evidence |
| --- | --- | --- |
| Planner Time | not available | historical_not_available |
| Failure Scenario Test Time | 58 ms | measured |
| Workflow Retry | 1 | deterministic_verified, failure test only |
| JSON Parse | 49/49 (100%) | deterministic_verified |
| Schema Match | 18/18 (100%) | deterministic_verified |
| Failure Assertions | 7/7 | deterministic_verified |
| Compliance Validation | pass | artifact_derived |
| Compliance Governance | needs_review | artifact_derived |
| Human Review | needs_revision | artifact_derived |
| Risk | 10 unresolved + 1 newly detected | artifact_derived |
| Final Score | not available | no calibrated weighting |

## Overall

- workflow_status: needs_review
- final_score: null
- final_score_availability: not_available
- production_ready: false
- customer_validated: false

Deterministic structure and gate checks pass, while governance, human approval, runtime coverage, and customer validation remain incomplete.

## Metric Integrity Checks

| check_id | status | source |
| --- | --- | --- |
| historical_node_count_is_15 | pass | outputs/workflow_execution_log.json |
| historical_runtime_not_fabricated | pass | outputs/workflow_execution_log.json |
| failure_scenario_passed | pass | outputs/failure_scenario_test_report.json |
| failure_retry_observed_once | pass | outputs/failure_scenario_test_report.json |
| json_parse_all_passed | pass | outputs/artifact_validation_report.json |
| schema_mapping_all_passed | pass | outputs/artifact_validation_report.json |
| compliance_structure_passed | pass | outputs/two_stage_compliance_validation_report.json |
| governance_needs_review_preserved | pass | outputs/two_stage_compliance_validation_report.json |
| human_review_needs_revision_preserved | pass | outputs/human_approval_record.json |
| release_gates_remain_blocked | pass | outputs/failure_scenario_test_report.json |

## Release Gates

- final_marketing_copy: blocked
- final_image_prompt: blocked
- image_generation: blocked
- frontend_page: blocked
- public_release: blocked

## Limitations

- Planner and all 15 historical node runtimes remain historical_not_available; no time value is fabricated.
- The measured Failure Scenario Test runtime is not Planner time and not full workflow latency.
- Compliance validation pass describes deterministic structure checks; governance remains needs_review.
- Workflow retry count applies only to the single Failure Scenario Test.
- Final score is intentionally unavailable until weighting and multi-case baselines are calibrated.
- All final generation and release gates remain blocked.
