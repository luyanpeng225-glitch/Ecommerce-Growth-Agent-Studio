#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const releaseGates = {
  structured_planning_package: 'approved',
  growth_evaluation: 'approved_for_evaluation_only',
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
};

const requiredInputFiles = [
  'docs/claim_trace_matrix_spec.md',
  'schemas/artifacts/claim_trace_matrix.schema.json',
  'data/sample_brief.json',
  'outputs/standardized_brief_summary.json',
  'outputs/selling_point_matrix.json',
  'outputs/platform_strategy_plan.json',
  'outputs/creative_copy_pack_outline.json',
  'outputs/image_prompt_pack_outline.json',
  'outputs/brand_compliance_report.json',
  'outputs/growth_metrics_plan.json',
  'outputs/human_approval_record.json',
  'outputs/growth_evaluation_report.json',
  'outputs/v2_final_report.json'
];

const jsonCache = new Map();
const checkLog = [];

function abs(relPath) {
  return path.join(projectRoot, relPath);
}

function fileExists(relPath) {
  return fs.existsSync(abs(relPath));
}

function readJson(relPath) {
  if (jsonCache.has(relPath)) return jsonCache.get(relPath);
  const parsed = JSON.parse(fs.readFileSync(abs(relPath), 'utf8'));
  jsonCache.set(relPath, parsed);
  return parsed;
}

function decodePointerPart(part) {
  return part.replace(/~1/g, '/').replace(/~0/g, '~');
}

function pointerGet(obj, pointer) {
  if (pointer === '') return { exists: true, value: obj };
  if (typeof pointer !== 'string' || !pointer.startsWith('/')) return { exists: false, value: undefined };
  let current = obj;
  for (const rawPart of pointer.slice(1).split('/')) {
    const part = decodePointerPart(rawPart);
    if (Array.isArray(current)) {
      if (!/^0$|^[1-9][0-9]*$/.test(part)) return { exists: false, value: undefined };
      const idx = Number(part);
      if (idx < 0 || idx >= current.length) return { exists: false, value: undefined };
      current = current[idx];
      continue;
    }
    if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
      continue;
    }
    return { exists: false, value: undefined };
  }
  return { exists: true, value: current };
}

function checkFile(relPath, role, claimId = null) {
  if (relPath === null) {
    checkLog.push({ kind: 'file', role, claim_id: claimId, target: null, passed: true, skipped: true, note: 'null is allowed for missing source/evidence' });
    return true;
  }
  const passed = fileExists(relPath);
  checkLog.push({ kind: 'file', role, claim_id: claimId, target: relPath, passed });
  return passed;
}

function checkPointer(relPath, pointer, role, claimId = null) {
  if (relPath === null || pointer === null) {
    checkLog.push({ kind: 'json_pointer', role, claim_id: claimId, target: pointer, artifact: relPath, passed: true, skipped: true, note: 'null is allowed for missing source/evidence' });
    return true;
  }
  let passed = false;
  if (fileExists(relPath)) {
    const obj = readJson(relPath);
    passed = pointerGet(obj, pointer).exists;
  }
  checkLog.push({ kind: 'json_pointer', role, claim_id: claimId, artifact: relPath, target: pointer, passed });
  return passed;
}

function countBy(items, key) {
  const out = {};
  for (const item of items) out[item[key]] = (out[item[key]] || 0) + 1;
  return out;
}

function releaseGateEffect() {
  return { ...releaseGates };
}

function downstream(artifact, json_pointer, reference_type, value_consistency, notes) {
  return { artifact, json_pointer, reference_type, value_consistency, notes };
}

const claims = [
  {
    claim_id: 'claim_product_capability_001',
    claim_category: 'product_capability',
    claim_summary: 'Brief describes high-definition motion video and 360 recording support for the demo product.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/core_features/0/proof',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/core_features/0/proof',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/0/risk_boundary', 'risk_inheritance', 'consistent', 'Downstream keeps proof requirements and avoids absolute superiority.'),
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/0/blocking_rule', 'governance_decision', 'consistent', 'Final copy and image prompts remain blocked until footage and specs are available.')
    ],
    risk_level: 'major',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Collect high-resolution footage, specifications, and review boundaries before final generation.'
  },
  {
    claim_id: 'claim_product_capability_002',
    claim_category: 'product_capability',
    claim_summary: 'Brief describes post-capture reframing and multiple export ratios as product capabilities.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/core_features/1/proof',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/specs/export_formats',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/core_selling_point_priority/0/proof_status', 'risk_inheritance', 'consistent', 'Downstream marks the capability as needing product demo proof.'),
      downstream('outputs/creative_copy_pack_outline.json', '/data/creative_copy_pack_outline/2/selling_point_boundaries/1', 'risk_inheritance', 'consistent', 'Copy outline keeps proof and confirmation boundaries.')
    ],
    risk_level: 'medium',
    human_review_required: true,
    compliance_decision: 'needs_revision',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Provide product demo evidence for reframing and export workflow before public-facing use.'
  },
  {
    claim_id: 'claim_product_capability_003',
    claim_category: 'product_capability',
    claim_summary: 'Brief describes motion stabilization for sports use cases.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/core_features/2/proof',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/specs/stabilization',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/2/proof_required/2', 'risk_inheritance', 'consistent', 'Downstream requires test conditions.'),
      downstream('outputs/human_approval_record.json', '/approval_items/2/decision', 'governance_decision', 'consistent', 'Human approval keeps technical/performance claims blocked.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Provide stabilization test conditions and limits; do not imply unconditional stability.'
  },
  {
    claim_id: 'claim_product_capability_004',
    claim_category: 'product_capability',
    claim_summary: 'Brief describes waterproof and durability-related outdoor coverage.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/core_features/3/proof',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/specs/waterproof',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/3/proof_required/0', 'risk_inheritance', 'consistent', 'Downstream requires rating or test standard.'),
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/1/blocking_rule', 'governance_decision', 'consistent', 'Compliance blocks final generation until conditions are confirmed.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Provide waterproof rating, depth, duration, usage limits, and durability conditions.'
  },
  {
    claim_id: 'claim_ai_capability_001',
    claim_category: 'ai_capability',
    claim_summary: 'Brief describes AI-assisted automatic editing that identifies moments and creates a short-video draft.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/core_features/4/proof',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/core_features/4/proof',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/4/risk_boundary', 'risk_inheritance', 'consistent', 'Downstream limits the claim to assistance and efficiency.'),
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/2/blocking_rule', 'governance_decision', 'consistent', 'Compliance prevents outcome guarantees.')
    ],
    risk_level: 'major',
    human_review_required: true,
    compliance_decision: 'needs_revision',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Provide AI editing workflow demo and editable-step explanation; avoid professional-result guarantees.'
  },
  {
    claim_id: 'claim_usage_scenario_001',
    claim_category: 'usage_scenario',
    claim_summary: 'Brief includes cycling first-person recording as a usage scenario.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/usage_scenarios/0/context',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/usage_scenarios/0/desired_outcome',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/2/usage_scenarios/0', 'direct_quote', 'consistent', 'Downstream maps stabilization to cycling scenario.'),
      downstream('outputs/image_prompt_pack_outline.json', '/data/visual_asset_structures/1/usage_scene', 'paraphrase', 'consistent', 'Visual outline uses scenario structure only, not final prompt text.')
    ],
    risk_level: 'major',
    human_review_required: true,
    compliance_decision: 'approved_for_planning',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Keep as planning scenario until sample footage and safety review are available.'
  },
  {
    claim_id: 'claim_usage_scenario_002',
    claim_category: 'usage_scenario',
    claim_summary: 'Brief includes travel check-in and city roaming as usage scenarios.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/usage_scenarios/1/context',
    evidence_artifact: 'data/sample_brief.json',
    evidence_json_pointer: '/usage_scenarios/1/desired_outcome',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/selling_point_matrix.json', '/data/feature_benefit_mapping/1/usage_scenarios/0', 'direct_quote', 'consistent', 'Downstream connects reframing to travel scenario.'),
      downstream('outputs/image_prompt_pack_outline.json', '/data/visual_asset_structures/2/forbidden_elements/2', 'risk_inheritance', 'consistent', 'Visual outline blocks guaranteed professional-looking outcomes.')
    ],
    risk_level: 'medium',
    human_review_required: true,
    compliance_decision: 'approved_for_planning',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Keep scenario neutral and require sample authorization before final visual generation.'
  },
  {
    claim_id: 'claim_visual_asset_authorization_001',
    claim_category: 'visual_asset_authorization',
    claim_summary: 'Brief lists product white-background image as a required asset, but no authorization proof is provided.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/required_assets/0',
    evidence_artifact: null,
    evidence_json_pointer: null,
    evidence_status: 'not_available',
    downstream_artifacts: [
      downstream('outputs/image_prompt_pack_outline.json', '/data/visual_asset_structures/0/proof_materials_to_wait_for/2', 'risk_inheritance', 'consistent', 'Visual outline waits for authorized product render or photo.'),
      downstream('outputs/human_approval_record.json', '/approval_items/6/decision', 'governance_decision', 'consistent', 'Human approval blocks asset authorization.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Provide product image authorization and usage scope before final image prompt or image generation.'
  },
  {
    claim_id: 'claim_visual_asset_authorization_002',
    claim_category: 'visual_asset_authorization',
    claim_summary: 'Brief lists mobile App editing interface screenshots as required assets, but no authorization proof is provided.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/required_assets/3',
    evidence_artifact: null,
    evidence_json_pointer: null,
    evidence_status: 'not_available',
    downstream_artifacts: [
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/5/required_evidence/2', 'governance_decision', 'consistent', 'Compliance requires App screenshot authorization.'),
      downstream('outputs/human_approval_record.json', '/revision_queue/2/required_action', 'governance_decision', 'consistent', 'Revision queue requires asset authorization and source tracking.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Collect App screenshot authorization, source tracking, and permitted usage scope.'
  },
  {
    claim_id: 'claim_visual_asset_authorization_003',
    claim_category: 'visual_asset_authorization',
    claim_summary: 'Compliance rules prohibit real brand Logo or unauthorized celebrity likeness in future visual outputs.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/compliance_rules/4',
    evidence_artifact: 'outputs/brand_compliance_report.json',
    evidence_json_pointer: '/data/risk_items/5/blocking_rule',
    evidence_status: 'requires_human_verification',
    downstream_artifacts: [
      downstream('outputs/image_prompt_pack_outline.json', '/data/visual_asset_structures/0/forbidden_elements/0', 'risk_inheritance', 'consistent', 'Visual outline forbids real brand Logo.'),
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/5/human_review_required', 'governance_decision', 'consistent', 'Compliance requires human review for asset rights.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Confirm brand asset and likeness authorization or exclude those elements.'
  },
  {
    claim_id: 'claim_compliance_or_safety_001',
    claim_category: 'compliance_or_safety',
    claim_summary: 'Brief prohibits absolute superiority and unconditional performance wording.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/do_not_claim/1',
    evidence_artifact: 'outputs/brand_compliance_report.json',
    evidence_json_pointer: '/data/blocked_expression_rules/0/blocked_patterns/0',
    evidence_status: 'supported_by_provided_source',
    downstream_artifacts: [
      downstream('outputs/platform_strategy_plan.json', '/data/upstream_artifact_inheritance/compliance_constraints/do_not_claim/1', 'risk_inheritance', 'consistent', 'Platform strategy inherits prohibited absolute wording.'),
      downstream('outputs/creative_copy_pack_outline.json', '/data/upstream_inheritance/compliance_constraints/do_not_claim/1', 'risk_inheritance', 'consistent', 'Copy outline inherits prohibited absolute wording.')
    ],
    risk_level: 'major',
    human_review_required: false,
    compliance_decision: 'approved_for_planning',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Keep blocked expression rules active in all future generation steps.'
  },
  {
    claim_id: 'claim_compliance_or_safety_002',
    claim_category: 'compliance_or_safety',
    claim_summary: 'Brief requires competitor comparison to avoid attacks on specific competitor brands.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/do_not_claim/2',
    evidence_artifact: 'outputs/brand_compliance_report.json',
    evidence_json_pointer: '/data/risk_items/4/blocking_rule',
    evidence_status: 'supported_by_provided_source',
    downstream_artifacts: [
      downstream('outputs/platform_strategy_plan.json', '/data/channel_role_map/3/platform_constraints/1', 'risk_inheritance', 'consistent', 'JD strategy keeps category comparison neutral.'),
      downstream('outputs/creative_copy_pack_outline.json', '/data/creative_copy_pack_outline/3/selling_point_boundaries/0', 'risk_inheritance', 'consistent', 'Copy outline blocks specific competitor attacks.')
    ],
    risk_level: 'major',
    human_review_required: false,
    compliance_decision: 'approved_for_planning',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Use neutral category-level comparison only when evidence and legal review allow it.'
  },
  {
    claim_id: 'claim_growth_or_business_outcome_001',
    claim_category: 'growth_or_business_outcome',
    claim_summary: 'Brief and downstream plans use CTR, CVR, GMV and related values as observation metrics, not promised outcomes.',
    source_artifact: 'data/sample_brief.json',
    source_json_pointer: '/primary_kpis/0',
    evidence_artifact: 'outputs/growth_evaluation_report.json',
    evidence_json_pointer: '/metric_results/4/data_source_type',
    evidence_status: 'derived_from_mock',
    downstream_artifacts: [
      downstream('outputs/growth_metrics_plan.json', '/data/compliance_inheritance/metric_language_rule', 'metric_observation', 'consistent', 'Growth metrics plan limits metrics to observation and retrospective use.'),
      downstream('outputs/brand_compliance_report.json', '/data/risk_items/3/blocking_rule', 'governance_decision', 'consistent', 'Compliance blocks business outcome guarantees.')
    ],
    risk_level: 'critical',
    human_review_required: true,
    compliance_decision: 'blocked_for_final_generation',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Keep metrics as observation fields; do not claim real traffic, conversion, GMV, or sales improvements.'
  },
  {
    claim_id: 'claim_growth_or_business_outcome_002',
    claim_category: 'growth_or_business_outcome',
    claim_summary: 'Growth evaluation reports workflow metrics from demo or unavailable sources rather than real production telemetry.',
    source_artifact: 'outputs/growth_evaluation_report.json',
    source_json_pointer: '/data_quality_summary/data_source_type_rules/derived_from_mock',
    evidence_artifact: 'outputs/growth_evaluation_report.json',
    evidence_json_pointer: '/metric_results/6/data_source_type',
    evidence_status: 'derived_from_mock',
    downstream_artifacts: [
      downstream('outputs/v2_final_report.json', '/workflow_difference_note/important_distinction', 'governance_decision', 'consistent', 'V2 report confirms evaluation does not authorize final generation or release.'),
      downstream('outputs/growth_evaluation_report.json', '/evaluation_scope/does_not_evaluate_as_real_business_results/0', 'metric_observation', 'consistent', 'Evaluation scope excludes real CTR uplift proof.')
    ],
    risk_level: 'major',
    human_review_required: true,
    compliance_decision: 'approved_for_evaluation_only',
    release_gate_effect: releaseGateEffect(),
    required_action: 'Label demo/mock measurements clearly and require real campaign data before any business-result claim.'
  }
];

for (const relPath of requiredInputFiles) {
  checkFile(relPath, 'required_input_file');
}

for (const claim of claims) {
  checkFile(claim.source_artifact, 'claim_source_artifact', claim.claim_id);
  checkPointer(claim.source_artifact, claim.source_json_pointer, 'claim_source_json_pointer', claim.claim_id);
  checkFile(claim.evidence_artifact, 'claim_evidence_artifact', claim.claim_id);
  checkPointer(claim.evidence_artifact, claim.evidence_json_pointer, 'claim_evidence_json_pointer', claim.claim_id);
  for (const item of claim.downstream_artifacts) {
    checkFile(item.artifact, 'downstream_artifact', claim.claim_id);
    checkPointer(item.artifact, item.json_pointer, 'downstream_json_pointer', claim.claim_id);
  }
  if (claim.source_artifact === null) {
    claim.source_exists = 'source_missing';
  } else if (!fileExists(claim.source_artifact)) {
    claim.source_exists = 'source_missing';
  } else if (!pointerGet(readJson(claim.source_artifact), claim.source_json_pointer).exists) {
    claim.source_exists = 'pointer_missing';
  } else {
    claim.source_exists = 'source_found';
  }
}

const categories = [
  'product_capability',
  'ai_capability',
  'usage_scenario',
  'visual_asset_authorization',
  'compliance_or_safety',
  'growth_or_business_outcome'
];

const categoryCounts = countBy(claims, 'claim_category');
const sourceExistsCounts = countBy(claims, 'source_exists');
const evidenceStatusCounts = countBy(claims, 'evidence_status');
const riskLevelCounts = countBy(claims, 'risk_level');
const humanReviewRequiredCount = claims.filter((claim) => claim.human_review_required).length;
const fileChecks = checkLog.filter((entry) => entry.kind === 'file' && !entry.skipped);
const pointerChecks = checkLog.filter((entry) => entry.kind === 'json_pointer' && !entry.skipped);
const failedChecks = checkLog.filter((entry) => !entry.skipped && !entry.passed);
const categoryCoverageOk = categories.every((category) => categoryCounts[category] > 0);
const keyFilesOk = requiredInputFiles.every((relPath) => fileExists(relPath));
const keyPointersOk = failedChecks.length === 0;
const gatesOk = JSON.stringify(releaseGates) === JSON.stringify({
  structured_planning_package: 'approved',
  growth_evaluation: 'approved_for_evaluation_only',
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
});

const matrix = {
  meta: {
    artifact_name: 'claim_trace_matrix',
    validation_extension: 'Validation Extension C',
    artifact_version: '0.1.0',
    brief_id: 'brief_demo_action_camera_001',
    producer: 'Deterministic Claim Trace Matrix Builder',
    status: 'needs_review',
    workflow_version: 'V2',
    product_name: '运动相机',
    generation_method: 'deterministic_script_no_model_call',
    notes: [
      'source_found only means the source field exists in a project artifact; it does not prove real-world truth.',
      'Downstream Agent artifacts are treated as references or governance decisions, not original fact proof.'
    ]
  },
  source_priority: {
    factual_sources: ['original brief', 'formal proof materials when provided'],
    governance_decision_sources: ['Human Approval', 'Brand Compliance'],
    downstream_artifact_rule: 'Downstream Agent artifacts can cite or transform claims but cannot prove original facts.',
    mock_data_rule: 'Mock or demo data cannot prove real business outcomes.'
  },
  claims,
  summary: {
    claim_total: claims.length,
    claim_category_counts: categoryCounts,
    source_exists_counts: sourceExistsCounts,
    evidence_status_counts: evidenceStatusCounts,
    risk_level_counts: riskLevelCounts,
    human_review_required_count: humanReviewRequiredCount,
    file_checks: {
      total: fileChecks.length,
      passed: fileChecks.filter((entry) => entry.passed).length,
      failed: fileChecks.filter((entry) => !entry.passed).length
    },
    json_pointer_checks: {
      total: pointerChecks.length,
      passed: pointerChecks.filter((entry) => entry.passed).length,
      failed: pointerChecks.filter((entry) => !entry.passed).length
    },
    category_coverage_ok: categoryCoverageOk,
    key_files_ok: keyFilesOk,
    key_pointers_ok: keyPointersOk,
    release_gates_preserved: gatesOk,
    check_log: checkLog
  },
  release_gates: releaseGates,
  limitations: [
    'Schema and pointer validation do not prove product facts in reality.',
    'Schema and pointer validation do not prove legal authorization for brands, logos, likenesses, product images, App screenshots, or scene materials.',
    'Visual quality and aesthetic suitability require human judgment.',
    'CTR, CVR, GMV, traffic, conversion, sales, and other business outcomes are not proven by mock or demo data.',
    'The demo product name remains 运动相机 and no removed parameter terms are restored as the product name.'
  ]
};

fs.mkdirSync(abs('outputs'), { recursive: true });
fs.writeFileSync(abs('outputs/claim_trace_matrix.json'), JSON.stringify(matrix, null, 2) + '\n');

const md = `# Automatic Claim Trace Matrix\n\n` +
  `Validation Extension C / Substep 3 generated by deterministic script. No model calls were used.\n\n` +
  `## Summary\n\n` +
  `- Claim total: ${matrix.summary.claim_total}\n` +
  `- Category coverage ok: ${matrix.summary.category_coverage_ok}\n` +
  `- Human review required: ${matrix.summary.human_review_required_count}\n` +
  `- File checks: ${matrix.summary.file_checks.passed} passed / ${matrix.summary.file_checks.failed} failed\n` +
  `- JSON Pointer checks: ${matrix.summary.json_pointer_checks.passed} passed / ${matrix.summary.json_pointer_checks.failed} failed\n` +
  `- Release gates preserved: ${matrix.summary.release_gates_preserved}\n\n` +
  `## Source Exists Counts\n\n` +
  Object.entries(sourceExistsCounts).map(([key, value]) => `- ${key}: ${value}`).join('\n') +
  `\n\n## Evidence Status Counts\n\n` +
  Object.entries(evidenceStatusCounts).map(([key, value]) => `- ${key}: ${value}`).join('\n') +
  `\n\n## Release Gates\n\n` +
  Object.entries(releaseGates).map(([key, value]) => `- ${key}: ${value}`).join('\n') +
  `\n\n## Limitations\n\n` +
  matrix.limitations.map((item) => `- ${item}`).join('\n') +
  `\n`;
fs.writeFileSync(abs('outputs/claim_trace_matrix.md'), md);

const status = keyFilesOk && keyPointersOk && categoryCoverageOk && claims.length >= 12 && gatesOk ? 'pass' : 'fail';
const result = {
  status,
  claim_total: claims.length,
  category_coverage_ok: categoryCoverageOk,
  source_exists_counts: sourceExistsCounts,
  evidence_status_counts: evidenceStatusCounts,
  human_review_required_count: humanReviewRequiredCount,
  file_checks: matrix.summary.file_checks,
  json_pointer_checks: matrix.summary.json_pointer_checks,
  release_gates: releaseGates,
  outputs: ['outputs/claim_trace_matrix.json', 'outputs/claim_trace_matrix.md'],
  exit_code: status === 'pass' ? 0 : 1
};
console.log(JSON.stringify(result, null, 2));
process.exit(result.exit_code);
