# Artifact Validation Report

Validation Extension A / B / C、Failure Scenario Test 与 Workflow Metrics：JSON Schema 自动验证总验证报告。

## Meta

- validation_type: deterministic_json_schema
- schema_draft: 2020-12
- validator: Ajv 8.20.0
- dependency_status: available
- status: pass
- script_exit_code: 0

## JSON 解析验证

- total_json_files: 58
- passed: 58
- failed: 0

以下文件只完成 JSON 解析验证，没有纳入第一版关键 Schema 映射：

- data/audit_log_sample.json
- data/cases/overseas_beauty_serum/brief.json
- data/cases/parallel_self/effect_brief.json
- data/failure_scenarios/brief_missing_campaign_goal.scenario.json
- outputs/artifact_validation_report.json
- outputs/audience_insight.json
- outputs/brand_compliance_report.json
- outputs/cases/overseas_beauty_serum/audience_platform_insights.json
- outputs/cases/overseas_beauty_serum/image_prompt_pack.json
- outputs/cases/overseas_beauty_serum/review_and_evaluation.json
- outputs/cases/overseas_beauty_serum/visual_effect_plan.json
- outputs/cases/parallel_self/motion_prompt_plan.json
- outputs/cases/parallel_self/safety_and_quality_review.json
- outputs/cases/parallel_self/trend_and_effect_concept.json
- outputs/creative_copy_pack_outline.json
- outputs/final_creative_package_report.json
- outputs/growth_metrics_plan.json
- outputs/image_prompt_pack_outline.json
- outputs/platform_strategy_plan.json
- outputs/selling_point_matrix.json
- outputs/standardized_brief_summary.json
- package-lock.json
- package.json
- schemas/artifacts/claim_trace_matrix.schema.json
- schemas/artifacts/common.schema.json
- schemas/artifacts/failure_scenario_test_report.schema.json
- schemas/artifacts/growth_evaluation_report.schema.json
- schemas/artifacts/human_approval_record.schema.json
- schemas/artifacts/planner_execution_plan.schema.json
- schemas/artifacts/portfolio_evidence_pack.schema.json
- schemas/artifacts/real_agent_brief_parser_runtime.schema.json
- schemas/artifacts/real_agent_trace.schema.json
- schemas/artifacts/runtime_execution.schema.json
- schemas/artifacts/two_stage_compliance_report.schema.json
- schemas/artifacts/two_stage_compliance_validation_report.schema.json
- schemas/artifacts/v2_final_report.schema.json
- schemas/artifacts/workflow_execution_log.schema.json
- schemas/artifacts/workflow_metrics_report.schema.json
- schemas/artifacts/worktrace.schema.json
- schemas/product_brief.schema.json

## 完整 Schema 验证

- mapped_artifacts: 18
- passed: 18
- failed: 0

完成完整 Schema 验证的文件：

- data/sample_brief.json -> schemas/product_brief.schema.json: pass
- outputs/planner_execution_plan.json -> schemas/artifacts/planner_execution_plan.schema.json: pass
- outputs/human_approval_record.json -> schemas/artifacts/human_approval_record.schema.json: pass
- outputs/growth_evaluation_report.json -> schemas/artifacts/growth_evaluation_report.schema.json: pass
- outputs/v2_final_report.json -> schemas/artifacts/v2_final_report.schema.json: pass
- outputs/workflow_execution_log.json -> schemas/artifacts/workflow_execution_log.schema.json: pass
- outputs/claim_trace_matrix.json -> schemas/artifacts/claim_trace_matrix.schema.json: pass
- outputs/portfolio_evidence_pack.json -> schemas/artifacts/portfolio_evidence_pack.schema.json: pass
- outputs/brand_compliance_pre_check.json -> schemas/artifacts/two_stage_compliance_report.schema.json: pass
- outputs/brand_compliance_post_generation_check.json -> schemas/artifacts/two_stage_compliance_report.schema.json: pass
- outputs/two_stage_compliance_validation_report.json -> schemas/artifacts/two_stage_compliance_validation_report.schema.json: pass
- outputs/failure_scenario_test_report.json -> schemas/artifacts/failure_scenario_test_report.schema.json: pass
- outputs/workflow_metrics_report.json -> schemas/artifacts/workflow_metrics_report.schema.json: pass
- outputs/runtime_execution.json -> schemas/artifacts/runtime_execution.schema.json: pass
- outputs/worktrace.json -> schemas/artifacts/worktrace.schema.json: pass
- outputs/worktrace_failure_scenario.json -> schemas/artifacts/worktrace.schema.json: pass
- outputs/real_agent_brief_parser_runtime.json -> schemas/artifacts/real_agent_brief_parser_runtime.schema.json: pass
- outputs/real_agent_trace.json -> schemas/artifacts/real_agent_trace.schema.json: pass

## 失败原因

- 无

## 覆盖范围与边界

- Schema 通过不代表内容事实正确。
- Schema 只验证结构、类型、关键状态约束、证据类型、workflow status 和 artifact path 等机器可校验条件。
- JSON parse pass 只代表文件可被解析为 JSON，不代表通过 Schema。
- Claim Trace Matrix 中的 source_found 只代表来源字段存在，不代表现实事实已经证明。
- mock 数据不能证明真实业务效果。
- 当前没有覆盖全部历史产物，不能写成 100% Schema coverage。
- Validation Extension A / B / C 不是新的 Agent 节点；Steps 1-15 状态不变。
- Workflow Execution Log 是 retrospective artifact-derived log，不是真实生产 telemetry。
