#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const ROOT = process.cwd();
const SCHEMA_PATH = 'schemas/artifacts/two_stage_compliance_report.schema.json';
const PRE_PATH = 'outputs/brand_compliance_pre_check.json';
const POST_PATH = 'outputs/brand_compliance_post_generation_check.json';
const REPORT_JSON_PATH = 'outputs/two_stage_compliance_validation_report.json';
const REPORT_MD_PATH = 'outputs/two_stage_compliance_validation_report.md';
const PRODUCT_NAME = '运动相机';
const PRODUCER = 'Brand Compliance Agent';
const EXECUTION_CONTEXT = 'retrospective_design_validation';
const BLOCKED_GATES = [
  'final_marketing_copy',
  'final_image_prompt',
  'image_generation',
  'frontend_page',
  'public_release'
];

function readJson(filePath, errors) {
  try {
    const raw = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    return { ok: true, data: JSON.parse(raw), error: null };
  } catch (error) {
    errors.push({ check: 'json_parse', file: filePath, message: error.message });
    return { ok: false, data: null, error: error.message };
  }
}

function uniqueValues(values) {
  return [...new Set(values)];
}

function duplicates(values) {
  const seen = new Set();
  const dupes = new Set();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

function sameSet(a, b) {
  return a.length === b.length && a.every((value) => b.includes(value));
}

function setDifference(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function pushError(errors, check, message, details = {}) {
  errors.push({ check, message, ...details });
}

function checkIdentity(pre, post, errors) {
  const checks = {
    brief_id_same: pre?.meta?.brief_id === post?.meta?.brief_id,
    product_name_same: pre?.meta?.product_name === post?.meta?.product_name,
    product_name_is_action_camera_cn: pre?.meta?.product_name === PRODUCT_NAME && post?.meta?.product_name === PRODUCT_NAME,
    producer_pre: pre?.meta?.producer === PRODUCER,
    producer_post: post?.meta?.producer === PRODUCER,
    trace_id_same: pre?.meta?.trace_id === post?.meta?.trace_id,
    execution_context_pre: pre?.meta?.execution_context === EXECUTION_CONTEXT,
    execution_context_post: post?.meta?.execution_context === EXECUTION_CONTEXT,
    historical_execution_claimed_pre_false: pre?.meta?.historical_execution_claimed === false,
    historical_execution_claimed_post_false: post?.meta?.historical_execution_claimed === false,
    compliance_run_id_different: pre?.meta?.compliance_run_id !== post?.meta?.compliance_run_id,
    pre_compliance_run_id_contains_mode: typeof pre?.meta?.compliance_run_id === 'string' && pre.meta.compliance_run_id.includes('pre_check'),
    post_compliance_run_id_contains_mode: typeof post?.meta?.compliance_run_id === 'string' && post.meta.compliance_run_id.includes('post_generation_check'),
    pre_mode_artifact_name: pre?.meta?.mode === 'pre_check' && pre?.meta?.artifact_name === 'brand_compliance_pre_check',
    post_mode_artifact_name: post?.meta?.mode === 'post_generation_check' && post?.meta?.artifact_name === 'brand_compliance_post_generation_check'
  };

  for (const [name, passed] of Object.entries(checks)) {
    if (!passed) pushError(errors, 'identity_checks', `Identity check failed: ${name}`, { name });
  }

  return {
    ...checks,
    all_passed: Object.values(checks).every(Boolean)
  };
}

function checkRiskTracking(pre, post, errors) {
  const preDetected = asArray(pre?.cross_stage_risk_tracking?.detected_risk_ids);
  const postInherited = asArray(post?.cross_stage_risk_tracking?.inherited_risk_ids);
  const postResolved = asArray(post?.cross_stage_risk_tracking?.resolved_risk_ids);
  const postUnresolved = asArray(post?.cross_stage_risk_tracking?.unresolved_risk_ids);
  const postNewlyDetected = asArray(post?.cross_stage_risk_tracking?.newly_detected_risk_ids);
  const preRiskRecordIds = asArray(pre?.risk_records).map((record) => record.risk_id);
  const postRiskRecordIds = asArray(post?.risk_records).map((record) => record.risk_id);
  const postRiskRecordNewIds = postRiskRecordIds.filter((riskId) => !postInherited.includes(riskId));

  const arrayDuplicateChecks = {
    pre_detected: duplicates(preDetected),
    post_inherited: duplicates(postInherited),
    post_resolved: duplicates(postResolved),
    post_unresolved: duplicates(postUnresolved),
    post_newly_detected: duplicates(postNewlyDetected)
  };

  const preRiskRecordDuplicateIds = duplicates(preRiskRecordIds);
  const postRiskRecordDuplicateIds = duplicates(postRiskRecordIds);
  const resolvedUnresolvedOverlap = intersection(postResolved, postUnresolved);
  const resolvedUnresolvedUnion = uniqueValues([...postResolved, ...postUnresolved]);
  const newlyInInherited = intersection(postNewlyDetected, postInherited);

  const missing = {
    pre_detected_missing_from_pre_records: setDifference(preDetected, preRiskRecordIds),
    post_inherited_missing_from_post_records: setDifference(postInherited, postRiskRecordIds),
    post_resolved_missing_from_post_records: setDifference(postResolved, postRiskRecordIds),
    post_unresolved_missing_from_post_records: setDifference(postUnresolved, postRiskRecordIds),
    post_newly_detected_missing_from_post_records: setDifference(postNewlyDetected, postRiskRecordIds)
  };

  const checks = {
    pre_detected_equals_post_inherited: sameSet(preDetected, postInherited),
    resolved_unresolved_disjoint: resolvedUnresolvedOverlap.length === 0,
    resolved_unresolved_union_equals_inherited: sameSet(resolvedUnresolvedUnion, postInherited),
    newly_detected_not_in_inherited: newlyInInherited.length === 0,
    newly_detected_equals_post_record_ids_not_in_inherited: sameSet(postNewlyDetected, postRiskRecordNewIds),
    arrays_have_no_duplicate_ids: Object.values(arrayDuplicateChecks).every((list) => list.length === 0),
    pre_risk_records_have_no_duplicate_ids: preRiskRecordDuplicateIds.length === 0,
    post_risk_records_have_no_duplicate_ids: postRiskRecordDuplicateIds.length === 0,
    risk_tracking_ids_exist_in_records: Object.values(missing).every((list) => list.length === 0)
  };

  for (const [name, passed] of Object.entries(checks)) {
    if (!passed) {
      pushError(errors, 'risk_tracking_checks', `Risk tracking check failed: ${name}`, {
        name,
        preDetected,
        postInherited,
        postResolved,
        postUnresolved,
        postNewlyDetected,
        postRiskRecordNewIds,
        arrayDuplicateChecks,
        preRiskRecordDuplicateIds,
        postRiskRecordDuplicateIds,
        resolvedUnresolvedOverlap,
        newlyInInherited,
        missing
      });
    }
  }

  return {
    sets: {
      pre_detected: preDetected,
      post_inherited: postInherited,
      post_resolved: postResolved,
      post_unresolved: postUnresolved,
      post_newly_detected: postNewlyDetected,
      post_risk_record_ids: postRiskRecordIds
    },
    checks,
    diagnostics: {
      array_duplicate_ids: arrayDuplicateChecks,
      pre_risk_record_duplicate_ids: preRiskRecordDuplicateIds,
      post_risk_record_duplicate_ids: postRiskRecordDuplicateIds,
      resolved_unresolved_overlap: resolvedUnresolvedOverlap,
      newly_detected_in_inherited: newlyInInherited,
      post_risk_record_ids_not_in_inherited: postRiskRecordNewIds,
      missing_ids: missing
    },
    all_passed: Object.values(checks).every(Boolean)
  };
}

function checkReleaseGates(pre, post, errors) {
  function inspectArtifact(label, artifact) {
    const failures = [];
    for (const gate of BLOCKED_GATES) {
      if (artifact?.release_gates?.[gate] !== 'blocked') {
        failures.push({ scope: 'top_level', gate, actual: artifact?.release_gates?.[gate] });
      }
    }
    for (const record of asArray(artifact?.risk_records)) {
      for (const gate of BLOCKED_GATES) {
        if (record?.release_gate_effect?.[gate] !== 'blocked') {
          failures.push({ scope: 'risk_record', risk_id: record?.risk_id, gate, actual: record?.release_gate_effect?.[gate] });
        }
      }
    }
    if (failures.length > 0) {
      pushError(errors, 'release_gate_checks', `${label} has unblocked critical release gates`, { label, failures });
    }
    return {
      artifact: label,
      checked_gates: BLOCKED_GATES,
      all_blocked: failures.length === 0,
      failures
    };
  }

  const preResult = inspectArtifact('pre_check', pre);
  const postResult = inspectArtifact('post_generation_check', post);
  return {
    checked_gates: BLOCKED_GATES,
    pre_check: preResult,
    post_generation_check: postResult,
    all_passed: preResult.all_blocked && postResult.all_blocked
  };
}

function governanceFindings(pre, post, riskTracking) {
  const postRecords = asArray(post?.risk_records);
  const preRecords = asArray(pre?.risk_records);
  const allRecords = [...preRecords, ...postRecords];
  const traceabilityGap = postRecords.find((record) => record.risk_id === 'risk_traceability_gap');
  const proofGapRecords = postRecords.filter((record) => record.evidence_status === 'requires_human_verification');
  const assetGapRecords = postRecords.filter((record) => record.risk_type === 'asset_authorization' && ['pending', 'missing', 'requires_human_verification'].includes(record.evidence_status));
  const evidenceStatusCounts = {};
  for (const record of allRecords) {
    evidenceStatusCounts[record.evidence_status] = (evidenceStatusCounts[record.evidence_status] || 0) + 1;
  }

  return {
    inherited_risk_count: riskTracking.sets.post_inherited.length,
    resolved_risk_count: riskTracking.sets.post_resolved.length,
    unresolved_risk_count: riskTracking.sets.post_unresolved.length,
    newly_detected_risk_count: riskTracking.sets.post_newly_detected.length,
    risk_traceability_gap_present: Boolean(traceabilityGap),
    risk_traceability_gap: traceabilityGap ? {
      risk_id: traceabilityGap.risk_id,
      source_artifact: traceabilityGap.source_artifact,
      source_json_pointer: traceabilityGap.source_json_pointer,
      explanation: traceabilityGap.revision_action
    } : null,
    formal_proof_gap_present: proofGapRecords.length > 0,
    formal_proof_gap_risk_ids: proofGapRecords.map((record) => record.risk_id),
    asset_authorization_gap_present: assetGapRecords.length > 0,
    asset_authorization_gap_risk_ids: assetGapRecords.map((record) => record.risk_id),
    human_approval_required: post?.decision_summary?.human_review_required === true || postRecords.some((record) => record.human_review_required === true),
    post_generation_check_scope: 'structured_creative_and_visual_plans_only',
    final_generation_or_public_release_allowed: false,
    evidence_status_counts_across_both_artifacts: evidenceStatusCounts
  };
}

function writeReports(report) {
  fs.writeFileSync(path.join(ROOT, REPORT_JSON_PATH), JSON.stringify(report, null, 2) + '\n');

  const md = `# Two-stage Compliance Validation Report\n\n` +
`## Summary\n\n` +
`- validation_status: \`${report.validation_status}\`\n` +
`- governance_status: \`${report.governance_status}\`\n` +
`- pre_check artifact: \`${PRE_PATH}\`\n` +
`- post_generation_check artifact: \`${POST_PATH}\`\n` +
`- schema: \`${SCHEMA_PATH}\`\n\n` +
`双阶段合规是同一个 Brand Compliance Agent 的两次运行：先以 \`pre_check\` 检查 Brief 和上游约束，再以 \`post_generation_check\` 检查结构化创意方案和结构化视觉方案。它不是两个 Compliance Agent，也不是 Step 16。\n\n` +
`本次验证是 \`retrospective_design_validation\`。报告只验证现有两个模式化合规产物的结构、身份、跨阶段风险集合关系和 release gate 约束，不声称这些检查在历史 Steps 1-15 或历史 Human Approval 前真实运行过。\n\n` +
`## Schema and Identity\n\n` +
`- Schema compiled: \`${report.schema_validation.schema_compiled}\`\n` +
`- pre_check JSON parsed: \`${report.schema_validation.pre_check.json_parse_ok}\`\n` +
`- post_generation_check JSON parsed: \`${report.schema_validation.post_generation_check.json_parse_ok}\`\n` +
`- pre_check Schema validation: \`${report.schema_validation.pre_check.schema_valid}\`\n` +
`- post_generation_check Schema validation: \`${report.schema_validation.post_generation_check.schema_valid}\`\n` +
`- identity checks all passed: \`${report.identity_checks.all_passed}\`\n\n` +
`## Risk Tracking\n\n` +
`- inherited risks: ${report.risk_counts.inherited}\n` +
`- resolved risks: ${report.risk_counts.resolved}\n` +
`- unresolved risks: ${report.risk_counts.unresolved}\n` +
`- newly detected risks: ${report.risk_counts.newly_detected}\n` +
`- risk_traceability_gap present: \`${report.governance_findings.risk_traceability_gap_present}\`\n\n` +
`出现 \`risk_traceability_gap\` 的原因：pre_check 是本次 Two-stage Compliance Optimization 中新增的回溯式设计验证；历史结构化创意方案和视觉方案继承了风险主题、proof waitlist 与 forbidden elements，但没有逐条使用新增 pre_check 的稳定 risk_id。该问题属于治理发现，不是 Schema 或集合关系失败。\n\n` +
`结构验证通过不代表风险已解决。当前 10 个 inherited 风险全部仍为 unresolved，因为没有看到正式证明材料、有效素材授权，且相关声明或视觉元素未从下游结构化方案中明确删除。\n\n` +
`## Governance Findings\n\n` +
`- formal proof gap present: \`${report.governance_findings.formal_proof_gap_present}\`\n` +
`- asset authorization gap present: \`${report.governance_findings.asset_authorization_gap_present}\`\n` +
`- human approval required: \`${report.governance_findings.human_approval_required}\`\n\n` +
`post_generation_check 只审核结构化创意方案和结构化视觉方案，不审核最终营销文案、最终图片 Prompt 或生成图片。最终生成与公开发布仍被阻断。\n\n` +
`## Release Gates\n\n` +
`五个关键 release gates 在两个产物及其风险记录中均必须保持 \`blocked\`：\n\n` +
BLOCKED_GATES.map((gate) => `- ${gate}`).join('\n') +
`\n\n` +
`release gate checks all passed: \`${report.release_gate_checks.all_passed}\`\n\n` +
`## Errors\n\n` +
(report.errors.length === 0 ? `No hard validation errors.\n` : report.errors.map((error) => `- ${error.check}: ${error.message}`).join('\n') + '\n');

  fs.writeFileSync(path.join(ROOT, REPORT_MD_PATH), md);
}

const errors = [];
const schemaRead = readJson(SCHEMA_PATH, errors);
const preRead = readJson(PRE_PATH, errors);
const postRead = readJson(POST_PATH, errors);

let schemaCompiled = false;
let preSchemaValid = false;
let postSchemaValid = false;
let schemaCompileErrors = [];
let preSchemaErrors = [];
let postSchemaErrors = [];

if (schemaRead.ok) {
  try {
    const ajv = new Ajv2020({ strict: false, allErrors: true });
    const validate = ajv.compile(schemaRead.data);
    schemaCompiled = true;
    if (preRead.ok) {
      preSchemaValid = validate(preRead.data);
      if (!preSchemaValid) {
        preSchemaErrors = validate.errors || [];
        pushError(errors, 'schema_validation', 'pre_check artifact failed Schema validation', { file: PRE_PATH, schema_errors: preSchemaErrors });
      }
    }
    if (postRead.ok) {
      postSchemaValid = validate(postRead.data);
      if (!postSchemaValid) {
        postSchemaErrors = validate.errors || [];
        pushError(errors, 'schema_validation', 'post_generation_check artifact failed Schema validation', { file: POST_PATH, schema_errors: postSchemaErrors });
      }
    }
  } catch (error) {
    schemaCompileErrors = [{ message: error.message }];
    pushError(errors, 'schema_validation', 'Schema failed to compile', { file: SCHEMA_PATH, schema_errors: schemaCompileErrors });
  }
}

const pre = preRead.data;
const post = postRead.data;
const identityChecks = pre && post ? checkIdentity(pre, post, errors) : { all_passed: false };
const riskTrackingChecks = pre && post ? checkRiskTracking(pre, post, errors) : { all_passed: false, sets: { pre_detected: [], post_inherited: [], post_resolved: [], post_unresolved: [], post_newly_detected: [], post_risk_record_ids: [] }, checks: {}, diagnostics: {} };
const releaseGateChecks = pre && post ? checkReleaseGates(pre, post, errors) : { all_passed: false };
const findings = pre && post ? governanceFindings(pre, post, riskTrackingChecks) : {};

if (pre?.meta?.mode !== 'pre_check' || pre?.meta?.artifact_name !== 'brand_compliance_pre_check') {
  pushError(errors, 'schema_validation', 'pre_check mode and artifact_name do not correspond', { file: PRE_PATH });
}
if (post?.meta?.mode !== 'post_generation_check' || post?.meta?.artifact_name !== 'brand_compliance_post_generation_check') {
  pushError(errors, 'schema_validation', 'post_generation_check mode and artifact_name do not correspond', { file: POST_PATH });
}

const validationStatus = errors.length === 0 ? 'pass' : 'fail';
const governanceStatus = post?.decision_summary?.decision || post?.meta?.status || 'needs_review';

const report = {
  meta: {
    artifact_name: 'two_stage_compliance_validation_report',
    artifact_version: '0.1.0',
    producer: 'validate_two_stage_compliance.mjs',
    validation_status: validationStatus,
    governance_status: governanceStatus,
    execution_context: EXECUTION_CONTEXT,
    model_used: false,
    modifies_input_files: false
  },
  validation_status: validationStatus,
  governance_status: governanceStatus,
  input_artifacts: {
    schema: SCHEMA_PATH,
    pre_check: PRE_PATH,
    post_generation_check: POST_PATH
  },
  schema_validation: {
    schema_json_parse_ok: schemaRead.ok,
    schema_compiled: schemaCompiled,
    schema_compile_errors: schemaCompileErrors,
    pre_check: {
      file: PRE_PATH,
      json_parse_ok: preRead.ok,
      schema_valid: preSchemaValid,
      schema_errors: preSchemaErrors,
      mode_artifact_name_match: pre?.meta?.mode === 'pre_check' && pre?.meta?.artifact_name === 'brand_compliance_pre_check'
    },
    post_generation_check: {
      file: POST_PATH,
      json_parse_ok: postRead.ok,
      schema_valid: postSchemaValid,
      schema_errors: postSchemaErrors,
      mode_artifact_name_match: post?.meta?.mode === 'post_generation_check' && post?.meta?.artifact_name === 'brand_compliance_post_generation_check'
    }
  },
  identity_checks: identityChecks,
  risk_tracking_checks: riskTrackingChecks,
  risk_counts: {
    inherited: riskTrackingChecks.sets.post_inherited.length,
    resolved: riskTrackingChecks.sets.post_resolved.length,
    unresolved: riskTrackingChecks.sets.post_unresolved.length,
    newly_detected: riskTrackingChecks.sets.post_newly_detected.length
  },
  governance_findings: findings,
  release_gate_checks: releaseGateChecks,
  errors,
  limitations: [
    'This script performs deterministic structural and relationship checks only; it does not call a large language model.',
    'Schema validation does not prove product facts, legal authorization, production readiness, customer validation, or public-release eligibility.',
    'Unresolved risks and risk_traceability_gap are governance findings, not hard validation failures when Schema and set relationships pass.',
    'post_generation_check currently reviews structured creative and visual plans only, not final marketing copy, final image prompts, generated images, frontend pages, or public-release material.'
  ]
};

writeReports(report);

if (validationStatus !== 'pass') {
  console.error(`Two-stage compliance validation failed with ${errors.length} hard error(s).`);
  process.exit(1);
}

console.log('Two-stage compliance validation passed.');
process.exit(0);
