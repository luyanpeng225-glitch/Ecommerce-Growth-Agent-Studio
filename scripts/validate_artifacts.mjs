import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import Ajv2020 from 'ajv/dist/2020.js';

const require = createRequire(import.meta.url);
const ajvPackage = require('ajv/package.json');

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');

const toPosix = (p) => p.split(path.sep).join('/');
const rel = (p) => toPosix(path.relative(projectRoot, p));
const abs = (p) => path.resolve(projectRoot, p);

const reportJsonPath = abs('outputs/artifact_validation_report.json');
const reportMdPath = abs('outputs/artifact_validation_report.md');

const artifactSchemaMap = {
  'data/sample_brief.json': 'schemas/product_brief.schema.json',
  'outputs/planner_execution_plan.json': 'schemas/artifacts/planner_execution_plan.schema.json',
  'outputs/human_approval_record.json': 'schemas/artifacts/human_approval_record.schema.json',
  'outputs/growth_evaluation_report.json': 'schemas/artifacts/growth_evaluation_report.schema.json',
  'outputs/v2_final_report.json': 'schemas/artifacts/v2_final_report.schema.json',
  'outputs/workflow_execution_log.json': 'schemas/artifacts/workflow_execution_log.schema.json',
  'outputs/claim_trace_matrix.json': 'schemas/artifacts/claim_trace_matrix.schema.json',
  'outputs/portfolio_evidence_pack.json': 'schemas/artifacts/portfolio_evidence_pack.schema.json',
  'outputs/brand_compliance_pre_check.json': 'schemas/artifacts/two_stage_compliance_report.schema.json',
  'outputs/brand_compliance_post_generation_check.json': 'schemas/artifacts/two_stage_compliance_report.schema.json',
  'outputs/two_stage_compliance_validation_report.json': 'schemas/artifacts/two_stage_compliance_validation_report.schema.json',
  'outputs/failure_scenario_test_report.json': 'schemas/artifacts/failure_scenario_test_report.schema.json',
  'outputs/workflow_metrics_report.json': 'schemas/artifacts/workflow_metrics_report.schema.json',
  'outputs/runtime_execution.json': 'schemas/artifacts/runtime_execution.schema.json',
  'outputs/worktrace.json': 'schemas/artifacts/worktrace.schema.json',
  'outputs/worktrace_failure_scenario.json': 'schemas/artifacts/worktrace.schema.json',
  'outputs/real_agent_brief_parser_runtime.json': 'schemas/artifacts/real_agent_brief_parser_runtime.schema.json',
  'outputs/real_agent_trace.json': 'schemas/artifacts/real_agent_trace.schema.json'
};

const schemaFiles = [
  'schemas/artifacts/common.schema.json',
  'schemas/product_brief.schema.json',
  'schemas/artifacts/planner_execution_plan.schema.json',
  'schemas/artifacts/human_approval_record.schema.json',
  'schemas/artifacts/growth_evaluation_report.schema.json',
  'schemas/artifacts/v2_final_report.schema.json',
  'schemas/artifacts/workflow_execution_log.schema.json',
  'schemas/artifacts/claim_trace_matrix.schema.json',
  'schemas/artifacts/portfolio_evidence_pack.schema.json',
  'schemas/artifacts/two_stage_compliance_report.schema.json',
  'schemas/artifacts/two_stage_compliance_validation_report.schema.json',
  'schemas/artifacts/failure_scenario_test_report.schema.json',
  'schemas/artifacts/workflow_metrics_report.schema.json',
  'schemas/artifacts/runtime_execution.schema.json',
  'schemas/artifacts/worktrace.schema.json',
  'schemas/artifacts/real_agent_brief_parser_runtime.schema.json',
  'schemas/artifacts/real_agent_trace.schema.json'
];

function shouldSkipDir(name) {
  return name === 'node_modules' || name.startsWith('.');
}

function walkJsonFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) files.push(...walkJsonFiles(path.join(dir, entry.name)));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files.sort((a, b) => rel(a).localeCompare(rel(b)));
}

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function ajvErrorToRecord(error, artifactPath, schemaPath) {
  return {
    artifact_path: artifactPath,
    schema_path: schemaPath,
    instance_path: error.instancePath || '',
    keyword: error.keyword || '',
    message: error.message || ''
  };
}

function buildMarkdownReport(report, schemaValidatedPaths, parseOnlyPaths, exitCode) {
  const schemaRows = report.results
    .filter((r) => r.validation === 'schema')
    .map((r) => `- ${r.artifact_path} -> ${r.schema_path}: ${r.status}`)
    .join('\n') || '- 无';
  const parseRows = parseOnlyPaths.map((p) => `- ${p}`).join('\n') || '- 无';
  const errorRows = report.errors.map((e) => {
    if (e.validation === 'json_parse') {
      return `- ${e.artifact_path}: JSON parse failed (${e.message})`;
    }
    return `- ${e.artifact_path} -> ${e.schema_path}: ${e.instance_path || '/'} [${e.keyword}] ${e.message}`;
  }).join('\n') || '- 无';

  return `# Artifact Validation Report\n\n` +
    `Validation Extension A / B / C、Failure Scenario Test 与 Workflow Metrics：JSON Schema 自动验证总验证报告。\n\n` +
    `## Meta\n\n` +
    `- validation_type: ${report.meta.validation_type}\n` +
    `- schema_draft: ${report.meta.schema_draft}\n` +
    `- validator: ${report.meta.validator} ${report.meta.validator_version}\n` +
    `- dependency_status: ${report.meta.dependency_status}\n` +
    `- status: ${report.meta.status}\n` +
    `- script_exit_code: ${exitCode}\n\n` +
    `## JSON 解析验证\n\n` +
    `- total_json_files: ${report.parse_validation.total_json_files}\n` +
    `- passed: ${report.parse_validation.passed}\n` +
    `- failed: ${report.parse_validation.failed}\n\n` +
    `以下文件只完成 JSON 解析验证，没有纳入第一版关键 Schema 映射：\n\n${parseRows}\n\n` +
    `## 完整 Schema 验证\n\n` +
    `- mapped_artifacts: ${report.schema_validation.mapped_artifacts}\n` +
    `- passed: ${report.schema_validation.passed}\n` +
    `- failed: ${report.schema_validation.failed}\n\n` +
    `完成完整 Schema 验证的文件：\n\n${schemaRows}\n\n` +
    `## 失败原因\n\n${errorRows}\n\n` +
    `## 覆盖范围与边界\n\n` +
    `- Schema 通过不代表内容事实正确。\n` +
    `- Schema 只验证结构、类型、关键状态约束、证据类型、workflow status 和 artifact path 等机器可校验条件。\n` +
    `- JSON parse pass 只代表文件可被解析为 JSON，不代表通过 Schema。\n` +
    `- Claim Trace Matrix 中的 source_found 只代表来源字段存在，不代表现实事实已经证明。\n` +
    `- mock 数据不能证明真实业务效果。\n` +
    `- 当前没有覆盖全部历史产物，不能写成 100% Schema coverage。\n` +
    `- Validation Extension A / B / C 不是新的 Agent 节点；Steps 1-15 状态不变。\n` +
    `- Workflow Execution Log 是 retrospective artifact-derived log，不是真实生产 telemetry。\n`;
}

let parsePassed = 0;
let parseFailed = 0;
const parsedFiles = new Map();
const results = [];
const errors = [];

const jsonFiles = walkJsonFiles(projectRoot);
for (const file of jsonFiles) {
  const artifactPath = rel(file);
  try {
    const json = readJsonFile(file);
    parsePassed += 1;
    parsedFiles.set(artifactPath, json);
    results.push({ artifact_path: artifactPath, validation: 'json_parse', status: 'pass' });
  } catch (error) {
    parseFailed += 1;
    const record = {
      artifact_path: artifactPath,
      validation: 'json_parse',
      status: 'failed',
      message: error.message
    };
    results.push(record);
    errors.push(record);
  }
}

let schemaPassed = 0;
let schemaFailed = 0;
const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });

for (const schemaPath of schemaFiles) {
  const fullPath = abs(schemaPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Schema file missing: ${schemaPath}`);
  }
  const schema = readJsonFile(fullPath);
  ajv.addSchema(schema, schemaPath);
}

for (const [artifactPath, schemaPath] of Object.entries(artifactSchemaMap)) {
  const artifactFullPath = abs(artifactPath);
  const resultBase = { artifact_path: artifactPath, schema_path: schemaPath, validation: 'schema' };

  if (!fs.existsSync(artifactFullPath)) {
    schemaFailed += 1;
    const record = { ...resultBase, status: 'failed', instance_path: '', keyword: 'file_exists', message: 'artifact file does not exist' };
    results.push(record);
    errors.push(record);
    continue;
  }

  if (!parsedFiles.has(artifactPath)) {
    schemaFailed += 1;
    const record = { ...resultBase, status: 'failed', instance_path: '', keyword: 'json_parse', message: 'artifact JSON could not be parsed' };
    results.push(record);
    errors.push(record);
    continue;
  }

  const validate = ajv.getSchema(schemaPath);
  if (!validate) {
    schemaFailed += 1;
    const record = { ...resultBase, status: 'failed', instance_path: '', keyword: 'schema_loaded', message: 'schema was not loaded' };
    results.push(record);
    errors.push(record);
    continue;
  }

  const valid = validate(parsedFiles.get(artifactPath));
  if (valid) {
    schemaPassed += 1;
    results.push({ ...resultBase, status: 'pass' });
  } else {
    schemaFailed += 1;
    const validationErrors = (validate.errors || []).map((error) => ajvErrorToRecord(error, artifactPath, schemaPath));
    results.push({ ...resultBase, status: 'failed', error_count: validationErrors.length });
    errors.push(...validationErrors.map((e) => ({ ...e, validation: 'schema', status: 'failed' })));
  }
}

const coveredArtifacts = Object.keys(artifactSchemaMap).sort();
const notYetCoveredArtifacts = [...parsedFiles.keys()]
  .filter((p) => !coveredArtifacts.includes(p))
  .sort();
const parseOnlyPaths = notYetCoveredArtifacts;
const exitCode = parseFailed > 0 || schemaFailed > 0 ? 1 : 0;

const report = {
  meta: {
    artifact_name: 'artifact_validation_report',
    validation_type: 'deterministic_json_schema',
    schema_draft: '2020-12',
    validator: 'Ajv',
    validator_version: ajvPackage.version,
    dependency_status: 'available',
    status: exitCode === 0 ? 'pass' : 'failed',
    generated_at: new Date().toISOString(),
    script_path: 'scripts/validate_artifacts.mjs',
    script_exit_code: exitCode
  },
  parse_validation: {
    total_json_files: jsonFiles.length,
    passed: parsePassed,
    failed: parseFailed
  },
  schema_validation: {
    mapped_artifacts: Object.keys(artifactSchemaMap).length,
    passed: schemaPassed,
    failed: schemaFailed
  },
  schema_coverage: {
    covered_artifacts: coveredArtifacts,
    not_yet_covered_artifacts: notYetCoveredArtifacts
  },
  results,
  errors,
  limitations: [
    'Schema validation checks structure and key governance states; it does not prove business factual correctness.',
    'JSON parse validation is not the same as Schema validation.',
    'Only mapped critical governance artifacts receive full Schema validation in this extension set.',
    'Workflow Execution Log is a retrospective artifact-derived log, not real production telemetry.',
    'Source authenticity and field-level claim evidence will be validated later in an Automatic Claim Trace Matrix.',
    'Current coverage is partial and must not be represented as 100% project Schema coverage.'
  ]
};

fs.mkdirSync(path.dirname(reportJsonPath), { recursive: true });
fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(reportMdPath, buildMarkdownReport(report, coveredArtifacts, parseOnlyPaths, exitCode), 'utf8');

console.log(JSON.stringify({
  dependency_status: 'available',
  ajv_version: ajvPackage.version,
  parse_validation: report.parse_validation,
  schema_validation: report.schema_validation,
  report_json: rel(reportJsonPath),
  report_md: rel(reportMdPath),
  exit_code: exitCode
}, null, 2));

process.exit(exitCode);
