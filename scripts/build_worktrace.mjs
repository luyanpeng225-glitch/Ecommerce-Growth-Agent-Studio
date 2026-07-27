#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Ajv = require('ajv/dist/2020');

const ROOT = process.cwd();
const SCHEMA_PATH = 'schemas/artifacts/worktrace.schema.json';
const OUTPUT_JSON = 'outputs/worktrace.json';
const OUTPUT_MD = 'outputs/worktrace.md';

const SOURCE_PATHS = [
  'docs/worktrace_spec.md',
  SCHEMA_PATH,
  'outputs/workflow_execution_log.json',
  'outputs/claim_trace_matrix.json',
  'outputs/human_approval_record.json',
  'outputs/two_stage_compliance_validation_report.json',
  'outputs/workflow_metrics_report.json'
];

const RELEASE_GATES = {
  final_marketing_copy: 'blocked',
  final_image_prompt: 'blocked',
  image_generation: 'blocked',
  frontend_page: 'blocked',
  public_release: 'blocked'
};

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function artifactType(relPath) {
  if (relPath.endsWith('.json')) return 'json';
  if (relPath.endsWith('.md')) return 'markdown';
  if (relPath.endsWith('.schema.json')) return 'schema';
  if (relPath.endsWith('.csv')) return 'csv';
  return null;
}

function fileRef(relPath, role, notes = null, jsonPointer = null, sourceStatus = null) {
  return {
    path: relPath,
    exists: exists(relPath),
    evidence_type: 'artifact_derived',
    artifact_type: artifactType(relPath),
    required: true,
    json_pointer: jsonPointer,
    section_hint: null,
    role,
    source_status: sourceStatus,
    notes
  };
}

function stableArtifactTraceKey(sourcePaths) {
  const canonical = sourcePaths.slice().sort().join('\n');
  const digest = crypto.createHash('sha256').update(canonical).digest('hex').slice(0, 16);
  return `historical_artifact_trace_${digest}`;
}

function normalizeStatus(node) {
  if (node.node_type === 'approval_node' || node.node_name === 'Human Approval Node') return 'needs_revision';
  if (node.governance_status === 'needs_review') return 'needs_review';
  if (node.governance_status === 'needs_revision') return 'needs_revision';
  if (node.execution_status === 'blocked') return 'blocked';
  if (node.execution_status === 'failed') return 'failed';
  if (node.execution_status === 'skipped') return 'skipped';
  if (['completed', 'completed_revised', 'historical_completed'].includes(node.execution_status) && node.governance_status === 'not_applicable') return 'pass';
  if (['completed', 'completed_revised'].includes(node.execution_status) && !['needs_review', 'needs_revision'].includes(node.governance_status)) return 'pass';
  return 'historical_not_available';
}

function claimIdsForNode(node, claims) {
  const outputRefs = new Set((node.output_files || []).map((f) => f.path));
  const claimIds = new Set();
  for (const claim of claims) {
    const directArtifacts = [
      claim.source_artifact,
      claim.evidence_artifact,
      ...(claim.downstream_artifacts || []).map((downstream) => downstream.artifact)
    ].filter((artifact) => typeof artifact === 'string');
    if (directArtifacts.some((artifact) => outputRefs.has(artifact))) {
      claimIds.add(claim.claim_id);
    }
  }
  return [...claimIds];
}

function collectRiskRecords(compliance) {
  const records = [];
  for (const relPath of Object.values(compliance?.input_artifacts || {})) {
    if (typeof relPath !== 'string' || !relPath.startsWith('outputs/') || !exists(relPath)) continue;
    const artifact = readJson(relPath);
    for (const riskRecord of artifact.risk_records || []) {
      if (riskRecord?.risk_id && riskRecord?.source_artifact) {
        records.push({ ...riskRecord, record_artifact: relPath });
      }
    }
  }
  const traceGap = compliance?.governance_findings?.risk_traceability_gap;
  if (traceGap?.risk_id && traceGap?.source_artifact) {
    records.push({ ...traceGap, record_artifact: 'outputs/two_stage_compliance_validation_report.json' });
  }
  return records;
}

function riskIdsForNode(node, riskRecords) {
  const outputRefs = new Set((node.output_files || []).map((f) => f.path));
  const riskIds = new Set();
  for (const riskRecord of riskRecords) {
    if (outputRefs.has(riskRecord.source_artifact)) {
      riskIds.add(riskRecord.risk_id);
    }
  }
  return [...riskIds];
}

function buildWorkTrace() {
  const schema = readJson(SCHEMA_PATH);
  const workflowLog = readJson('outputs/workflow_execution_log.json');
  const claimMatrix = readJson('outputs/claim_trace_matrix.json');
  const humanApproval = readJson('outputs/human_approval_record.json');
  const compliance = readJson('outputs/two_stage_compliance_validation_report.json');
  const metrics = readJson('outputs/workflow_metrics_report.json');
  const riskRecords = collectRiskRecords(compliance);

  const missingSources = SOURCE_PATHS.filter((p) => !exists(p));
  if (missingSources.length) {
    throw new Error(`Missing required source artifacts: ${missingSources.join(', ')}`);
  }

  const artifact_trace_key = stableArtifactTraceKey(SOURCE_PATHS);

  const nodes = workflowLog.nodes.map((node, index) => {
    const input_refs = (node.input_files || []).map((f) => fileRef(f.path, 'input', 'File existence checked; existence does not prove business approval.', null, null));
    const output_refs = (node.output_files || []).map((f) => fileRef(f.path, 'output', 'File existence checked; existence does not prove business approval.', null, null));
    const status = normalizeStatus(node);
    const isHumanApproval = node.node_type === 'approval_node' || node.node_name === 'Human Approval Node';

    return {
      node_id: node.node_id,
      sequence: node.step,
      node_name: node.node_name,
      node_type: node.node_type,
      status,
      time_status: 'historical_not_available',
      started_at: null,
      completed_at: null,
      duration_ms: null,
      input_refs,
      output_refs,
      risk_ids: riskIdsForNode(node, riskRecords),
      claim_ids: claimIdsForNode(node, claimMatrix.claims || []),
      retry_count: null,
      retry_count_status: 'historical_not_available',
      error: null,
      human_approval: isHumanApproval ? {
        required: true,
        status: humanApproval.approval_summary?.overall_decision || humanApproval.meta?.status || 'needs_revision',
        source_refs: [fileRef('outputs/human_approval_record.json', 'approval_source', 'Human signature remains pending; no reviewer name or reviewed_at is fabricated.', '/approval_summary/overall_decision', 'needs_revision')],
        notes: [
          `overall_decision=${humanApproval.approval_summary?.overall_decision}`,
          `human_signature=${humanApproval.reviewer_record?.human_signature}`,
          'final_generation_allowed=false and public_release_allowed=false are preserved.'
        ]
      } : null,
      next_node: index < workflowLog.nodes.length - 1 ? workflowLog.nodes[index + 1].node_id : null
    };
  });

  const linkedRiskIds = new Set(nodes.flatMap((node) => node.risk_ids));
  const allRiskIds = new Set(riskRecords.map((record) => record.risk_id));
  const unlinkedRiskCount = [...allRiskIds].filter((riskId) => !linkedRiskIds.has(riskId)).length;

  const worktrace = {
    meta: {
      worktrace_version: '0.1.0',
      schema_version: schema.title || 'WorkTrace Artifact Schema',
      project_name: workflowLog.meta?.project_name || 'E-commerce Growth Agent Studio',
      product_name: claimMatrix.meta?.product_name || '运动相机',
      workflow_version: workflowLog.meta?.workflow_version || 'V2'
    },
    trace_summary: {
      trace_id: null,
      trace_id_status: 'historical_not_available',
      artifact_trace_key,
      trace_type: 'historical_artifact_trace',
      execution_context: 'retrospective_artifact_reconstruction',
      workflow_status: 'needs_review',
      time_status: 'historical_not_available',
      started_at: null,
      completed_at: null,
      duration_ms: null,
      retry_count: null,
      retry_count_status: 'historical_not_available',
      source_artifacts: SOURCE_PATHS.map((p) => fileRef(p, 'evidence', p === SCHEMA_PATH ? 'Schema used for Ajv validation.' : 'Source artifact for retrospective WorkTrace reconstruction.'))
    },
    nodes,
    release_gates: { ...RELEASE_GATES },
    boundaries: {
      historical_execution_claimed: false,
      production_ready: false,
      customer_validated: false,
      fabricated_runtime_allowed: false
    },
    limitations: [
      'artifact_trace_key is a stable retrospective artifact key derived from source artifact paths; it is not a runtime trace_id.',
      'trace_id is null because no historical runtime trace id is available.',
      'All Steps 1-15 keep historical_not_available timing and null started_at, completed_at, duration_ms.',
      'All Steps 1-15 keep retry_count=null and retry_count_status=historical_not_available.',
      'File existence checks prove references exist only; they do not prove governance, human approval, production readiness, or release permission.',
      `${unlinkedRiskCount} unique risk_id values are not directly assigned to historical nodes because no node output_refs.path equals their risk_record.source_artifact; this is an evidence boundary between historical artifacts and retrospective two-stage compliance reconstruction, not permission to infer lineage.`,
      'Final marketing copy, final image prompt, image generation, frontend page, and public release remain blocked.',
      `Workflow metrics source says historical nodes: ${metrics.runtime_metrics?.historical_node_timing_coverage?.historical_not_available_nodes ?? 'unknown'} historical_not_available / ${metrics.runtime_metrics?.historical_node_timing_coverage?.measured_nodes ?? 'unknown'} measured.`
    ]
  };

  const ajv = new Ajv({ strict: false, allErrors: true, validateFormats: false });
  const validate = ajv.compile(schema);
  const valid = validate(worktrace);
  if (!valid) {
    const conflicts = validate.errors.map((err) => ({
      json_pointer: err.instancePath || '/',
      schema_pointer: err.schemaPath,
      actual_value: err.instancePath ? getByJsonPointer(worktrace, err.instancePath) : worktrace,
      allowed: err.params?.allowedValues || err.params?.allowedValue || err.params?.type || err.params?.const || err.keyword,
      message: err.message
    }));
    const error = new Error('Schema conflict: WorkTrace object failed Ajv validation before write.');
    error.conflicts = conflicts;
    throw error;
  }

  const refChecks = [];
  for (const ref of worktrace.trace_summary.source_artifacts) refChecks.push(ref);
  for (const n of worktrace.nodes) refChecks.push(...n.input_refs, ...n.output_refs);
  const failedRefs = refChecks.filter((r) => !r.exists);
  if (failedRefs.length) {
    const error = new Error('File reference check failed before write.');
    error.conflicts = failedRefs.map((r) => ({ json_pointer: '/file_refs', actual_value: r.path, allowed: 'existing file', message: 'Referenced file does not exist.' }));
    throw error;
  }

  return worktrace;
}

function getByJsonPointer(obj, pointer) {
  if (!pointer || pointer === '/') return obj;
  return pointer.slice(1).split('/').reduce((acc, token) => {
    const key = token.replace(/~1/g, '/').replace(/~0/g, '~');
    return acc == null ? undefined : acc[key];
  }, obj);
}

function buildMarkdown(worktrace) {
  const historical = worktrace.nodes.filter((n) => n.time_status === 'historical_not_available').length;
  const measured = worktrace.nodes.filter((n) => n.time_status === 'measured').length;
  const retryNull = worktrace.nodes.filter((n) => n.retry_count === null).length;
  const riskCount = worktrace.nodes.reduce((sum, n) => sum + n.risk_ids.length, 0);
  const claimCount = worktrace.nodes.reduce((sum, n) => sum + n.claim_ids.length, 0);
  return `# WorkTrace\n\n` +
    `- trace_id: ${worktrace.trace_summary.trace_id}\n` +
    `- trace_id_status: ${worktrace.trace_summary.trace_id_status}\n` +
    `- artifact_trace_key: ${worktrace.trace_summary.artifact_trace_key}\n` +
    `- artifact_trace_key_note: artifact_trace_key is derived from source artifact paths and is not a runtime trace_id.\n` +
    `- trace_type: ${worktrace.trace_summary.trace_type}\n` +
    `- execution_context: ${worktrace.trace_summary.execution_context}\n` +
    `- workflow_status: ${worktrace.trace_summary.workflow_status}\n` +
    `- historical_not_available_nodes: ${historical}\n` +
    `- measured_nodes: ${measured}\n` +
    `- retry_count_null_nodes: ${retryNull}\n` +
    `- risk_id_associations: ${riskCount}\n` +
    `- claim_id_associations: ${claimCount}\n\n` +
    `## Release Gates\n\n` +
    Object.entries(worktrace.release_gates).map(([k, v]) => `- ${k}: ${v}`).join('\n') +
    `\n\n## Nodes\n\n` +
    worktrace.nodes.map((n) => `| ${n.sequence} | ${n.node_id} | ${n.node_name} | ${n.node_type} | ${n.status} | ${n.time_status} |`).join('\n') +
    `\n`;
}

try {
  const worktrace = buildWorkTrace();
  fs.writeFileSync(path.join(ROOT, OUTPUT_JSON), `${JSON.stringify(worktrace, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUTPUT_MD), buildMarkdown(worktrace));
  console.log(JSON.stringify({
    status: 'pass',
    outputs: [OUTPUT_JSON, OUTPUT_MD],
    node_count: worktrace.nodes.length,
    trace_id: worktrace.trace_summary.trace_id,
    artifact_trace_key: worktrace.trace_summary.artifact_trace_key
  }, null, 2));
} catch (err) {
  console.error(JSON.stringify({
    status: 'failed',
    message: err.message,
    conflicts: err.conflicts || []
  }, null, 2));
  process.exitCode = 1;
}
