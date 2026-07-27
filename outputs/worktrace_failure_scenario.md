# Failure Scenario WorkTrace

- trace_id: null
- trace_id_status: not_available
- artifact_trace_key: failure_scenario_trace_80a52dcaa5997a67
- artifact_trace_key_note: artifact_trace_key is derived from the Failure Scenario report and is not a runtime trace_id.
- trace_type: deterministic_failure_scenario_trace
- execution_context: deterministic_test_execution
- workflow_status: pass
- duration_ms: 58
- duration_scope: Failure Scenario Test script total runtime only; not Planner runtime and not full Agent workflow runtime.
- retry_count: 1
- risk_id_count: 0
- claim_id_count: 0

## Release Gates

- final_marketing_copy: blocked
- final_image_prompt: blocked
- image_generation: blocked
- frontend_page: blocked
- public_release: blocked

## Nodes

| sequence | node_id | node_name | node_type | status | retry_count | next_node |
|---:|---|---|---|---|---:|---|
| 1 | failure_node_01_initial_validation | Initial Validation | validation | blocked | 0 | failure_node_02_revision_queue |
| 2 | failure_node_02_revision_queue | Revision Queue | revision | pass | null | failure_node_03_schema_rerun |
| 3 | failure_node_03_schema_rerun | Schema Rerun | validation | pass | 1 | null |
