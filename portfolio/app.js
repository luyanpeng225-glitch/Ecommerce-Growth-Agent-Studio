const workflowNodes = [
  {
    title: "Brief 解析器",
    titleEn: "Brief Parser",
    type: "智能体 Agent",
    nodeType: "agent",
    description: "标准化商品 Brief，标记缺失字段、风险字段和下游可用性。",
    input: "商品 Brief、JSON Schema",
    output: "标准化 Brief、字段完整度",
    gate: "结构不完整则停止"
  },
  {
    title: "合规预检",
    titleEn: "Compliance Pre",
    type: "治理 Governance",
    nodeType: "governance",
    description: "在规划前检查能力证明、素材授权、禁止表达和数据来源边界。",
    input: "标准化 Brief、证明与授权字段",
    output: "10 个稳定 risk_id、规划约束",
    gate: "Needs review，可受控进入 Planner",
    compliance: true
  },
  {
    title: "任务编排",
    titleEn: "Planner",
    type: "编排 Orchestration",
    nodeType: "orchestration",
    description: "拆解任务、路由 Skills、定义并行关系、预算、回退和人工确认点。",
    input: "Brief、pre-check 风险",
    output: "执行计划、任务路由、artifact 追踪约束",
    gate: "风险必须向下游传递"
  },
  {
    title: "洞察技能组",
    titleEn: "Insight Skills",
    type: "并行技能 Parallel Skills",
    nodeType: "parallel-skills",
    description: "Audience、Selling Point 与 Platform 三个能力由 Planner 路由后并行运行，形成可交接策略。",
    input: "Planner 计划、商品与渠道字段",
    output: "用户洞察、卖点矩阵、平台策略",
    gate: "来源不明的推断标记待验证",
    parallelSkills: ["用户洞察 / Audience Insight", "卖点分析 / Selling Point Analyst", "平台策略 / Platform Strategy"]
  },
  {
    title: "创意智能体",
    titleEn: "Creative Agent",
    type: "智能体 Agent",
    nodeType: "agent",
    description: "生成内容模块规格和 claim source map，不直接生成最终营销文案。",
    input: "洞察、卖点、平台策略",
    output: "结构化创意包、proof waitlist",
    gate: "最终文案仍 blocked"
  },
  {
    title: "视觉提示词技能",
    titleEn: "Image Prompt Skill",
    type: "技能 Skill",
    nodeType: "skill",
    description: "定义视觉素材结构、禁止元素和素材依赖，保持单一视觉 Skill。",
    input: "创意结构、视觉风格、授权约束",
    output: "结构化视觉方案、asset dependency map",
    gate: "最终图片 Prompt 与图片仍 blocked"
  },
  {
    title: "生成后合规",
    titleEn: "Compliance Post",
    type: "治理 Governance",
    nodeType: "governance",
    description: "检查下游声明与视觉风险，验证 10 个风险完整继承并识别追踪缺口。",
    input: "创意方案、视觉方案、pre-check 风险",
    output: "10 unresolved、1 newly detected",
    gate: "Needs review，可进入人工审批",
    compliance: true
  },
  {
    title: "人工审批",
    titleEn: "Human Approval",
    type: "人工 Human",
    nodeType: "human",
    description: "人工审阅证明、授权和修订队列，形成正式审批记录与发布闸口。",
    input: "合规报告、风险列表、修订建议",
    output: "审批记录、revision queue、release gates",
    gate: "无正式签核不放行"
  },
  {
    title: "增长测评",
    titleEn: "Growth Evaluation",
    type: "测评 Evaluation",
    nodeType: "evaluation",
    description: "评估工作流完成率、可追踪性、闸口正确率和问题归因，区分数据来源。",
    input: "全链路产物、审批状态、Mock 指标",
    output: "Rubric、指标分级、失败原因",
    gate: "Evaluation only"
  },
  {
    title: "最终报告",
    titleEn: "Final Report",
    type: "报告 Report",
    nodeType: "report",
    description: "汇总结构化产物、限制、证据和发布状态，不生成最终营销素材。",
    input: "治理与测评结果、Artifact Index",
    output: "V2 报告、Portfolio Evidence Pack",
    gate: "公开发布继续 blocked"
  }
];

const evidenceLabels = {
  measured: "实测 · Measured",
  deterministic_verified: "确定性验证 · Deterministic",
  artifact_derived: "产物派生 · Artifact derived",
  derived_from_mock: "Mock 派生 · Mock derived",
  estimated: "估算 · Estimated",
  human_review_required: "需人工审核 · Human review",
  not_available: "暂不可用 · Not available"
};


const evidenceDescriptions = {
  measured: "当前项目中可直接检查的文件、字段或构建结果，不代表真实业务增长效果。",
  deterministic_verified: "由验证脚本、JSON 解析或 Schema 规则得到的确定性结果。",
  artifact_derived: "根据已有历史产物汇总得到，不是真实运行时 telemetry。",
  derived_from_mock: "来自 Demo 或 Mock 数据，只用于展示流程，不能证明客户效果。",
  estimated: "来自 Demo 假设或估算，不能写成真实效率提升。",
  human_review_required: "仍需要正式证明、素材授权、人工判断或签核后才能成立。",
  not_available: "当前缺少可靠数据、真实日志或授权证明，系统没有补造。"
};

const statusDisplayMap = {
  pass: "结构验证通过",
  needs_review: "待审核",
  blocked: "未放行",
  false: "尚未达到生产可用"
};

function normalizeStatusValue(value) {
  return String(value || "").toLowerCase().replaceAll("-", "_");
}

function statusToneClass(value) {
  const normalized = normalizeStatusValue(value);
  if (/pass|passed|approved|verified|validation_status\s*=\s*pass|true/.test(normalized)) return "status-pass";
  if (/running|in_progress|pending|queued/.test(normalized)) return "status-running";
  if (/needs_review|needs_revision|human_review_required|governance_status\s*=\s*needs_review/.test(normalized)) return "status-review";
  if (/blocked|failed|rejected/.test(normalized)) return "status-blocked";
  if (/not_available|historical_not_available|not_used|n\/a|null|false/.test(normalized)) return "status-neutral";
  return "status-neutral";
}

function statusDisplay(label, field, statusValue = field) {
  return `<span>${label}</span><code class="${statusToneClass(statusValue)}">${field}</code>`;
}

const statusExplanationMap = {
  blocked: "流程已拦截",
  pass: "结构修复后测试通过",
  false: "未执行或条件不成立",
  true: "条件成立"
};

function explainStatus(value) {
  return statusExplanationMap[String(value)] || "";
}

function formatMachineValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "无";
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function renderMachineField({ label, value, tone }) {
  const machineValue = formatMachineValue(value);
  const explanation = explainStatus(value);
  const statusClassName = `repair-value ${tone ? `status-${tone}` : statusToneClass(value)}`;
  return `
    <div class="repair-field">
      <dt>${label}</dt>
      <dd>
        <code class="${statusClassName}">${machineValue}</code>
        ${explanation ? `<span class="repair-explanation">${explanation}</span>` : ""}
      </dd>
    </div>`;
}

function renderRepairFields(selector, fields) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.innerHTML = fields.map(renderMachineField).join("");
}

function setHidden(selector, hidden) {
  const element = document.querySelector(selector);
  if (element) element.hidden = hidden;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setStatusDisplay(selector, label, field, statusValue = field) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.innerHTML = statusDisplay(label, field, statusValue);
  element.classList.remove("status-pass", "status-running", "status-review", "status-blocked", "status-neutral", "gate-blocked", "gate-approved", "gate-eval");
  element.classList.add(statusToneClass(statusValue));
}

function boundaryToneClass(value) {
  const normalized = normalizeStatusValue(value);
  if (normalized === "pass" || normalized === "true" || normalized === "approved") return "status-pass";
  if (normalized === "needs_review" || normalized === "needs_revision" || normalized === "pending") return "status-review";
  if (normalized === "blocked") return "status-blocked";
  if (normalized === "null" || normalized === "false" || normalized === "not_available") return "status-neutral";
  return statusToneClass(value);
}

function formatBoundaryMachineValue(key, value) {
  if (value === null) return `${key} = null`;
  if (value === undefined) return `${key} = not_available`;
  return `${key} = ${String(value)}`;
}

function setBoundaryStatus(selector, label, key, value, toneValue = value) {
  const element = document.querySelector(selector);
  if (!element) return;
  const title = element.querySelector("strong");
  const field = element.querySelector("code");
  if (title) title.textContent = label;
  if (field) field.textContent = formatBoundaryMachineValue(key, value);
  element.classList.remove("status-pass", "status-running", "status-review", "status-blocked", "status-neutral");
  element.classList.add(boundaryToneClass(toneValue));
}
const track = document.querySelector("#workflow-track");
const playButton = document.querySelector("#play-demo");
const resetButton = document.querySelector("#reset-demo");
const primaryPlayLinks = document.querySelectorAll("[data-play-workflow]");
const progressBar = document.querySelector("#workflow-progress-bar");
const executionGraph = document.querySelector(".execution-graph");
const executionGraphAnchor = document.querySelector("#execution-graph");
const sampleIoDetail = document.querySelector("#sample-io-detail");
const sampleIoError = document.querySelector("#sample-io-error");
let activeNode = 0;
let demoTimer = null;
let playbackMode = false;
let isDemoStarting = false;
let demoStartToken = 0;
let sampleIoLoadStarted = false;
let sampleIoLoadSucceeded = false;

function isInsightNode(node) {
  return Boolean(node && node.titleEn === "Insight Skills");
}

function isBriefParserNode(node) {
  return Boolean(node && node.titleEn === "Brief Parser");
}

function setSampleText(selector, value) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = value === null || value === undefined || value === "" ? "N/A" : String(value);
}

function clearGraphPlayback() {
  if (!executionGraph) return;
  executionGraph.classList.remove("is-playback-mode");
  executionGraph.querySelectorAll(".execution-node").forEach((node) => {
    node.classList.remove("is-playback-active", "is-playback-complete");
    node.removeAttribute("aria-current");
  });
  executionGraph.querySelectorAll(".handoff-label").forEach((label) => {
    label.classList.remove("is-handoff-active", "is-merge-revealed");
  });
  executionGraph.querySelectorAll(".merge-label").forEach((label) => {
    label.classList.remove("is-merge-revealed");
  });
}

function setGraphPlaybackStage(stageIndex) {
  if (!executionGraph) return;
  executionGraph.classList.add("is-playback-mode");
  const stage = Number(stageIndex);
  executionGraph.querySelectorAll(".execution-node[data-playback-stage]").forEach((node) => {
    const nodeStage = Number(node.dataset.playbackStage);
    const isActive = nodeStage === stage;
    node.classList.toggle("is-playback-active", isActive);
    node.classList.toggle("is-playback-complete", nodeStage < stage);
    if (isActive) node.setAttribute("aria-current", "step");
    else node.removeAttribute("aria-current");
  });
  executionGraph.querySelectorAll(".handoff-label[data-handoff-stage]").forEach((label) => {
    const handoffStage = Number(label.dataset.handoffStage);
    label.classList.toggle("is-handoff-active", handoffStage === stage - 1 || (stage > 3 && handoffStage === 3));
    label.classList.toggle("is-merge-revealed", stage > 3 && handoffStage === 3);
  });
  executionGraph.querySelectorAll(".merge-label").forEach((label) => {
    label.classList.toggle("is-merge-revealed", stage > 3);
  });
}

async function loadBriefParserSampleIo() {
  if (sampleIoLoadStarted) return;
  sampleIoLoadStarted = true;
  try {
    const [briefResponse, summaryResponse, schemaResponse] = await Promise.all([
      fetch("../data/sample_brief.json"),
      fetch("../outputs/standardized_brief_summary.json"),
      fetch("../schemas/product_brief.schema.json")
    ]);
    if (!briefResponse.ok || !summaryResponse.ok || !schemaResponse.ok) throw new Error("Sample I/O fetch failed");
    const [brief, summary] = await Promise.all([briefResponse.json(), summaryResponse.json(), schemaResponse.json()]);
    const completeness = summary.data && summary.data.field_completeness ? summary.data.field_completeness : {};
    const riskFields = Array.isArray(summary.data && summary.data.risk_fields) ? summary.data.risk_fields.length : 0;

    setSampleText("#sample-input-product-name", brief.product_name);
    setSampleText("#sample-input-product-category", brief.product_category);
    setSampleText("#sample-input-scenario-type", brief.scenario_type);
    setSampleText("#sample-input-launch-stage", brief.launch_stage);
    setSampleText("#sample-input-review-mode", brief.review_mode);
    setSampleText("#sample-output-status", summary.status);
    setSampleText("#sample-output-confidence", summary.confidence);
    setSampleText("#sample-output-required-fields", `${completeness.required_fields_present} / ${completeness.required_fields_total}`);
    setSampleText("#sample-output-schema-fields", `${completeness.schema_fields_present} / ${completeness.schema_fields_total}`);
    setSampleText("#sample-output-missing-fields", completeness.required_fields_missing);
    setSampleText("#sample-output-risk-fields", riskFields);
    sampleIoLoadSucceeded = true;
    if (sampleIoError) sampleIoError.hidden = true;
  } catch (error) {
    sampleIoLoadSucceeded = false;
    if (sampleIoError) sampleIoError.hidden = false;
  }
}

function renderWorkflow() {
  track.innerHTML = workflowNodes
    .map(
      (node, index) => `
        <button class="workflow-node node-type-${node.nodeType}${node.compliance ? " compliance" : ""}${index === activeNode ? " active" : ""}"
          type="button" role="listitem" data-index="${index}" aria-pressed="${index === activeNode}" aria-expanded="${isInsightNode(node) && index === activeNode}"${index === activeNode ? ' aria-current="step"' : ""}>
          <span class="node-step">${String(index + 1).padStart(2, "0")}</span>
          <span class="node-type-label">${node.type}</span>
          <span class="node-name"><span>${node.title}</span><small>${node.titleEn}</small></span>
        </button>`
    )
    .join("");

  track.querySelectorAll(".workflow-node").forEach((button) => {
    button.addEventListener("click", () => {
      stopDemo();
      selectNode(Number(button.dataset.index));
    });
  });
}

function selectNode(index, options = {}) {
  const { syncGraph = false } = options;
  activeNode = index;
  const node = workflowNodes[index];
  document.querySelector("#detail-index").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#detail-type").textContent = node.type;
  document.querySelector("#detail-title").innerHTML = `<span>${node.title}</span><small>${node.titleEn}</small>`;
  document.querySelector("#detail-description").textContent = node.description;
  document.querySelector("#detail-input").textContent = node.input;
  document.querySelector("#detail-output").textContent = node.output;
  document.querySelector("#detail-gate").textContent = node.gate;
  const parallelDetail = document.querySelector("#parallel-skills-detail");
  if (parallelDetail) parallelDetail.hidden = !isInsightNode(node);
  if (sampleIoDetail) sampleIoDetail.hidden = !isBriefParserNode(node);
  if (isBriefParserNode(node) && !sampleIoLoadSucceeded) loadBriefParserSampleIo();
  progressBar.style.width = `${((index + 1) / workflowNodes.length) * 100}%`;
  renderWorkflow();
  if (syncGraph) setGraphPlaybackStage(index);
}

function stopDemo({ clearPlayback = false } = {}) {
  demoStartToken += 1;
  isDemoStarting = false;
  if (demoTimer) window.clearInterval(demoTimer);
  demoTimer = null;
  if (clearPlayback) {
    playbackMode = false;
    clearGraphPlayback();
  }
  playButton.textContent = "▶ 播放演示";
  playButton.setAttribute("aria-pressed", "false");
}

function waitForScrollComplete(timeout = 900) {
  return new Promise((resolve) => {
    let settled = false;
    let lastX = window.scrollX;
    let lastY = window.scrollY;
    let stableFrames = 0;
    let canSettle = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", finish);
      resolve();
    };
    const check = () => {
      if (settled) return;
      const currentX = window.scrollX;
      const currentY = window.scrollY;
      if (Math.abs(currentX - lastX) < 1 && Math.abs(currentY - lastY) < 1) stableFrames += 1;
      else stableFrames = 0;
      lastX = currentX;
      lastY = currentY;
      if (canSettle && stableFrames >= 6) finish();
      else window.requestAnimationFrame(check);
    };
    window.addEventListener("scrollend", finish, { once: true });
    window.setTimeout(() => {
      canSettle = true;
    }, 180);
    window.setTimeout(finish, timeout);
    window.requestAnimationFrame(check);
  });
}

async function scrollToExecutionGraph() {
  if (window.location.hash !== "#execution-graph") history.replaceState(null, "", "#execution-graph");
  if (!executionGraphAnchor) return;
  executionGraphAnchor.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  await waitForScrollComplete();
}

function runDemoPlayback() {
  if (!playbackMode || activeNode >= workflowNodes.length - 1) {
    playbackMode = true;
    activeNode = 0;
  }
  selectNode(activeNode, { syncGraph: true });
  playButton.textContent = "Ⅱ 暂停演示";
  playButton.setAttribute("aria-pressed", "true");
  demoTimer = window.setInterval(() => {
    if (activeNode >= workflowNodes.length - 1) {
      stopDemo();
      return;
    }
    selectNode(activeNode + 1, { syncGraph: true });
  }, 1650);
}

async function startDemo(event) {
  if (event) event.preventDefault();
  if (demoTimer || isDemoStarting) {
    stopDemo();
    return;
  }
  const startToken = demoStartToken + 1;
  demoStartToken = startToken;
  isDemoStarting = true;
  playButton.textContent = "定位执行图…";
  playButton.setAttribute("aria-pressed", "true");
  await scrollToExecutionGraph();
  if (isDemoStarting && demoStartToken === startToken && !demoTimer) runDemoPlayback();
  isDemoStarting = false;
}

function renderEvidenceBars(counts) {
  const container = document.querySelector("#evidence-bars");
  if (!container) return;
  const values = Object.values(counts || {}).map(Number).filter(Number.isFinite);
  const max = values.length ? Math.max(...values) : 0;
  container.innerHTML = Object.entries(evidenceLabels)
    .map(([key, label]) => {
      const value = Number(counts && counts[key]);
      const safeValue = Number.isFinite(value) ? value : 0;
      const width = max === 0 || safeValue === 0 ? 0 : Math.max(4, Math.round((safeValue / max) * 100));
      const evidenceStatusClass = key === "human_review_required" ? "status-review" : key === "not_available" ? "status-neutral" : key === "measured" || key === "deterministic_verified" ? "status-pass" : "status-neutral";
      return `
        <div class="evidence-row evidence-type-${key} ${evidenceStatusClass}" title="${evidenceDescriptions[key]}" aria-label="${label}：${evidenceDescriptions[key]}">
          <span class="evidence-label">${label}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
          <span class="evidence-count">${safeValue}</span>
        </div>`;
    })
    .join("");
}

function renderEvidenceUnavailable() {
  const container = document.querySelector("#evidence-bars");
  if (container) container.innerHTML = '<p class="evidence-source-empty">数据加载失败</p>';
}

function countRuntimeEvidenceItems(pack) {
  return flattenEvidenceItems(pack).filter((item) => String(item.evidence_id || "").startsWith("ev_runtime_")).length;
}

function flattenEvidenceItems(pack) {
  return Object.values(pack)
    .filter(Array.isArray)
    .flat()
    .filter((item) => item && item.source_path);
}

function renderEvidenceSourceLinks(pack) {
  const container = document.querySelector("#evidence-source-links");
  if (!container) return;
  clearElement(container);
  const seen = new Set();
  const items = flattenEvidenceItems(pack)
    .filter((item) => {
      if (seen.has(item.source_path)) return false;
      seen.add(item.source_path);
      return true;
    })
    .slice(0, 8);

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "evidence-source-empty";
    empty.textContent = "暂无可打开来源";
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "evidence-source-item";

    const meta = document.createElement("span");
    meta.textContent = item.evidence_title || item.statement || "证据条目";

    const link = document.createElement("a");
    link.href = `../${item.source_path}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = item.source_path;

    row.append(meta, link);
    container.appendChild(row);
  });
}

async function loadEvidence() {
  try {
    const [packResponse, validationResponse] = await Promise.all([
      fetch("../outputs/portfolio_evidence_pack.json"),
      fetch("../outputs/artifact_validation_report.json")
    ]);
    if (!packResponse.ok || !validationResponse.ok) throw new Error("Evidence fetch failed");
    const pack = await packResponse.json();
    const validation = await validationResponse.json();
    const evidenceTotal = pack.evidence_summary && pack.evidence_summary.evidence_total;
    const runtimeEvidenceCount = countRuntimeEvidenceItems(pack);
    const jsonPassed = validation.parse_validation && validation.parse_validation.passed;
    const jsonTotal = validation.parse_validation && validation.parse_validation.total_json_files;
    const schemaPassed = validation.schema_validation && validation.schema_validation.passed;
    const schemaTotal = validation.schema_validation && validation.schema_validation.mapped_artifacts;

    setText("#metric-evidence", evidenceTotal);
    setText("#metric-json", `${jsonPassed}/${jsonTotal}`);
    setText("#metric-schema", `${schemaPassed}/${schemaTotal}`);
    setText("#metric-json-description", `${jsonPassed}/${jsonTotal} 个公开仓库 JSON 文件解析通过`);
    setText("#metric-schema-description", `${schemaPassed}/${schemaTotal} 个关键产物通过 Schema 验证`);
    setText("#highlight-validation-counts", `${jsonPassed}/${jsonTotal} · ${schemaPassed}/${schemaTotal}`);
    setText("#highlight-evidence-count", `${evidenceTotal} · 15/3`);
    setText("#highlight-evidence-copy", `${evidenceTotal} 条证据，Historical / Failure WorkTrace 可追踪`);
    setText("#evidence-pack-total", `Evidence：${evidenceTotal}`);
    setText("#evidence-runtime-count", `Runtime Evidence：${runtimeEvidenceCount}`);
    setText("#runtime-evidence-count", `${runtimeEvidenceCount}`);
    setText("#snapshot-evidence-total", `${evidenceTotal}｜可追溯证据条目`);
    renderEvidenceBars(pack.evidence_summary.evidence_type_counts);
    renderEvidenceSourceLinks(pack);
  } catch (error) {
    setText("#metric-evidence", "N/A");
    setText("#metric-json", "N/A");
    setText("#metric-schema", "N/A");
    setText("#metric-json-description", "数据加载失败");
    setText("#metric-schema-description", "数据加载失败");
    setText("#highlight-validation-counts", "N/A · N/A");
    setText("#highlight-evidence-count", "N/A · 15/3");
    setText("#highlight-evidence-copy", "数据加载失败，Historical / Failure WorkTrace 可追踪");
    setText("#evidence-pack-total", "数据加载失败");
    setText("#evidence-runtime-count", "N/A");
    setText("#runtime-evidence-count", "N/A");
    setText("#snapshot-evidence-total", "N/A｜可追溯证据条目");
    renderEvidenceUnavailable();
    document.querySelector("#header-status")?.setAttribute("title", "证据数据加载失败");
  }
}

async function loadFailureScenario() {
  try {
    const response = await fetch("../outputs/failure_scenario_test_report.json");
    if (!response.ok) throw new Error("Failure scenario fetch failed");
    const report = await response.json();
    const passedAssertions = report.assertions.filter((item) => item.status === "pass").length;
    const releaseGatesBlocked = Object.values(report.release_gates).every((status) => status === "blocked");
    const initial = report.initial_run || {};
    const revision = report.revision || {};
    const rerun = report.rerun || {};
    const scenario = report.scenario || {};
    const durationMs = report.execution && report.execution.duration_ms;

    setHidden("#failure-evidence-error", true);
    const initialStatusElement = document.querySelector("#failure-initial-status");
    if (initialStatusElement) {
      initialStatusElement.textContent = String(initial.workflow_status || "N/A").toUpperCase();
      initialStatusElement.className = statusToneClass(initial.workflow_status);
      initialStatusElement.title = "来自 outputs/failure_scenario_test_report.json 的 initial_run.workflow_status";
    }
    const rerunStatusElement = document.querySelector("#failure-rerun-status");
    if (rerunStatusElement) {
      rerunStatusElement.textContent = String(rerun.workflow_status || "N/A").toUpperCase();
      rerunStatusElement.className = statusToneClass(rerun.workflow_status);
      rerunStatusElement.title = "来自 outputs/failure_scenario_test_report.json 的 rerun.workflow_status";
    }
    document.querySelector("#failure-assertions").textContent = `${passedAssertions}/${report.assertions.length} PASS`;
    document.querySelector("#failure-release-gates").textContent = releaseGatesBlocked ? "仍然 BLOCKED" : "需要检查";

    renderRepairFields("#failure-before-fields", [
      { label: "campaign_goal", value: scenario.fault_operation === "remove" ? "字段缺失" : formatMachineValue(scenario.missing_field) },
      { label: "schema_valid", value: initial.schema_valid, tone: initial.schema_valid ? "pass" : "blocked" },
      { label: "workflow_status", value: initial.workflow_status, tone: initial.workflow_status },
      { label: "planner_executed", value: initial.planner_executed, tone: initial.planner_executed ? "pass" : "blocked" },
      { label: "missing_required_fields", value: initial.missing_required_fields }
    ]);

    renderRepairFields("#failure-after-fields", [
      { label: "repair_action", value: revision.repair_action },
      { label: "schema_valid", value: rerun.schema_valid, tone: rerun.schema_valid ? "pass" : "blocked" },
      { label: "workflow_status", value: rerun.workflow_status, tone: rerun.workflow_status },
      { label: "planner_eligible", value: rerun.planner_eligible, tone: rerun.planner_eligible ? "pass" : "blocked" },
      { label: "next_gate", value: rerun.next_gate }
    ]);

    setText(
      "#failure-repair-boundary",
      `本次仅在测试副本中恢复缺失字段，原始 Brief 未被修改；${formatMachineValue(durationMs)} ms 为本地确定性失败测试耗时，不是模型、Agent 或完整工作流运行耗时。`
    );
  } catch (error) {
    setHidden("#failure-evidence-error", false);
    setText("#failure-initial-status", "BLOCKED");
    setText("#failure-rerun-status", "PASS");
    setText("#failure-assertions", "7/7 PASS");
    setText("#failure-release-gates", "仍然 BLOCKED");
    renderRepairFields("#failure-before-fields", [
      { label: "campaign_goal", value: "字段缺失", tone: "blocked" },
      { label: "schema_valid", value: false, tone: "blocked" },
      { label: "workflow_status", value: "blocked", tone: "blocked" },
      { label: "planner_executed", value: false, tone: "blocked" },
      { label: "missing_required_fields", value: ["campaign_goal"] }
    ]);
    renderRepairFields("#failure-after-fields", [
      { label: "repair_action", value: "restore_from_source" },
      { label: "schema_valid", value: true, tone: "pass" },
      { label: "workflow_status", value: "pass", tone: "pass" },
      { label: "planner_eligible", value: true, tone: "pass" },
      { label: "next_gate", value: "brand_compliance_pre_check" }
    ]);
    setText("#failure-repair-boundary", "失败测试证据JSON加载失败；当前仅显示页面内置的已验证回退数据，不代表重新运行测试。");
    document.querySelector("#failure-assertions").title = "失败测试证据JSON加载失败；当前使用页面展示回退数据";
  }
}

async function loadBoundaryStatus() {
  try {
    const [humanResponse, complianceResponse, validationResponse, evidenceResponse, failureResponse] = await Promise.all([
      fetch("../outputs/human_approval_record.json"),
      fetch("../outputs/two_stage_compliance_validation_report.json"),
      fetch("../outputs/artifact_validation_report.json"),
      fetch("../outputs/portfolio_evidence_pack.json"),
      fetch("../outputs/failure_scenario_test_report.json")
    ]);
    if (!humanResponse.ok || !complianceResponse.ok || !validationResponse.ok || !evidenceResponse.ok || !failureResponse.ok) throw new Error("Boundary status fetch failed");
    const [human, compliance, validation, evidence, failure] = await Promise.all([
      humanResponse.json(),
      complianceResponse.json(),
      validationResponse.json(),
      evidenceResponse.json(),
      failureResponse.json()
    ]);
    const reviewer = human.reviewer_record || {};
    const approval = human.approval_summary || {};
    const evidenceMeta = evidence.meta || {};
    const validationStatus = compliance.validation_status || (validation.meta && validation.meta.status) || "pass";
    const governanceStatus = compliance.governance_status || "needs_review";
    const gates = evidence.release_gates || failure.release_gates || {};

    setBoundaryStatus("#boundary-validation-status", "结构验证通过", "validation_status", validationStatus, validationStatus);
    setBoundaryStatus("#boundary-governance-status", "治理状态待审核", "governance_status", governanceStatus, governanceStatus);
    setBoundaryStatus("#boundary-overall-decision", "人工审批需修改", "overall_decision", approval.overall_decision, approval.overall_decision);
    setBoundaryStatus("#boundary-human-signature", "真实人工签核待完成", "human_signature", reviewer.human_signature, reviewer.human_signature);
    setBoundaryStatus("#boundary-reviewer-name", "审核人未记录", "reviewer_name", reviewer.reviewer_name, reviewer.reviewer_name === null ? "null" : reviewer.reviewer_name);
    setBoundaryStatus("#boundary-reviewed-at", "审核时间未记录", "reviewed_at", reviewer.reviewed_at, reviewer.reviewed_at === null ? "null" : reviewer.reviewed_at);
    setBoundaryStatus("#boundary-production-ready", "尚未达到生产可用", "production_ready", evidenceMeta.production_ready, evidenceMeta.production_ready);
    setBoundaryStatus("#boundary-customer-validated", "尚未进行真实客户验证", "customer_validated", evidenceMeta.customer_validated, evidenceMeta.customer_validated);

    setBoundaryStatus("#gate-final-marketing-copy", "最终营销文案", "final_marketing_copy", gates.final_marketing_copy, gates.final_marketing_copy);
    setBoundaryStatus("#gate-final-image-prompt", "最终图片 Prompt", "final_image_prompt", gates.final_image_prompt, gates.final_image_prompt);
    setBoundaryStatus("#gate-image-generation", "图片生成", "image_generation", gates.image_generation, gates.image_generation);
    setBoundaryStatus("#gate-frontend-page", "面向真实业务发布的前端页面", "frontend_page", gates.frontend_page, gates.frontend_page);
    setBoundaryStatus("#gate-public-release", "公开发布", "public_release", gates.public_release, gates.public_release);
  } catch (error) {
    document.querySelector("#boundary")?.setAttribute("data-boundary-source", "fallback-static-values");
  }
}

async function loadWorkflowMetrics() {
  try {
    const [metricsResponse, failureResponse] = await Promise.all([
      fetch("../outputs/workflow_metrics_report.json"),
      fetch("../outputs/failure_scenario_test_report.json")
    ]);
    if (!metricsResponse.ok || !failureResponse.ok) throw new Error("Workflow metrics fetch failed");
    const [report, failureReport] = await Promise.all([metricsResponse.json(), failureResponse.json()]);
    const planner = report.runtime_metrics.planner_runtime;
    const schema = report.quality_metrics.schema_match_rate;
    const risks = report.governance_metrics.risk_tracking;
    const failureDurationMs = failureReport.execution && failureReport.execution.duration_ms;

    document.querySelector("#workflow-planner-time").textContent = planner.status || "historical_not_available";
    document.querySelector("#workflow-planner-time").className = statusToneClass(planner.status || "historical_not_available");
    document.querySelector("#workflow-planner-note").textContent = "历史产物未采集运行时间，不代表功能缺失。";
    document.querySelector("#workflow-failure-time").textContent = `${formatMachineValue(failureDurationMs)} ms`;
    document.querySelector("#workflow-failure-time").className = "status-neutral";
    document.querySelector("#workflow-failure-note").textContent = "58 ms 为本地确定性失败测试耗时，不是模型、Agent 或完整工作流运行耗时。";
    document.querySelector("#workflow-retry").textContent = report.runtime_metrics.workflow_retry_count.value;
    document.querySelector("#workflow-schema-match").textContent = `${schema.passed}/${schema.total}`;
    document.querySelector("#workflow-schema-rate").textContent = `${schema.passed}/${schema.total} passed`;
    setText("#snapshot-json-parse", `${report.quality_metrics.json_parse_rate.passed}/${report.quality_metrics.json_parse_rate.total}｜公开仓库 JSON 文件解析通过`);
    setText("#snapshot-schema-match", `${schema.passed}/${schema.total}｜关键产物 Schema 验证通过`);
    setStatusDisplay("#workflow-compliance", "结构验证通过", `validation_status = ${report.governance_metrics.compliance.validation_status}`, report.governance_metrics.compliance.validation_status);
    setStatusDisplay("#workflow-governance", "治理状态待审核", `governance_status = ${report.governance_metrics.compliance.governance_status}`, report.governance_metrics.compliance.governance_status);
    setStatusDisplay("#workflow-human-review", "需要修改", report.governance_metrics.human_review.status, report.governance_metrics.human_review.status);
    document.querySelector("#workflow-risk").textContent = `${risks.unresolved} + ${risks.newly_detected}｜${risks.unresolved} 项继承风险，${risks.newly_detected} 项新发现`;
    document.querySelector("#workflow-risk").className = "status-review";
    document.querySelector("#workflow-final-score").textContent = report.overall.final_score.availability.replaceAll("_", " ").toUpperCase();
    document.querySelector("#workflow-final-score").className = statusToneClass(report.overall.final_score.availability);
  } catch (error) {
    document.querySelector("#workflow-planner-note").title = "当前使用页面内置的已验证回退数据";
  }
}

function setGovernanceTab(mode, shouldScroll = false) {
  const normalizedMode = mode === "failure" ? "failure" : "compliance";
  const activePanelId = normalizedMode === "failure" ? "failure-test" : "compliance";
  const activeTabId = normalizedMode === "failure" ? "governance-tab-failure" : "governance-tab-compliance";
  document.querySelectorAll(".governance-tab").forEach((button) => {
    const selected = button.id === activeTabId;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  ["compliance", "failure-test"].forEach((panelId) => {
    const panel = document.querySelector(`#${panelId}`);
    if (panel) panel.hidden = panelId !== activePanelId;
  });
  if (shouldScroll) {
    const target = document.querySelector(`#${activePanelId}`) || document.querySelector("#governance");
    if (target) target.scrollIntoView();
  }
}

function syncGovernanceTabFromHash(shouldScroll = false) {
  if (window.location.hash === "#failure-test") {
    setGovernanceTab("failure", shouldScroll);
  } else if (window.location.hash === "#compliance" || window.location.hash === "#governance") {
    setGovernanceTab("compliance", shouldScroll);
  }
}

const proofTabs = Array.from(document.querySelectorAll(".proof-tab"));
const proofPanels = Array.from(document.querySelectorAll(".proof-panel"));
const proofPanelIds = ["evidence", "metrics", "worktrace", "runtime"];

function setProofTab(panelId = "evidence", shouldScroll = false) {
  const normalizedPanelId = proofPanelIds.includes(panelId) ? panelId : "evidence";
  proofTabs.forEach((tab) => {
    const selected = tab.dataset.proofTab === normalizedPanelId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  proofPanels.forEach((panel) => {
    panel.hidden = panel.id !== normalizedPanelId;
  });
  if (shouldScroll) {
    const target = document.querySelector(`#${normalizedPanelId}`) || document.querySelector("#proof");
    if (target) target.scrollIntoView();
  }
}

function syncProofTabFromHash(shouldScroll = false) {
  const hash = window.location.hash.replace("#", "");
  if (hash === "proof") {
    setProofTab("evidence", shouldScroll);
  } else if (proofPanelIds.includes(hash)) {
    setProofTab(hash, shouldScroll);
  }
}

function moveProofTabFocus(currentIndex, direction) {
  if (proofTabs.length === 0) return;
  const nextIndex = (currentIndex + direction + proofTabs.length) % proofTabs.length;
  proofTabs[nextIndex].focus();
  setProofTab(proofTabs[nextIndex].dataset.proofTab);
}

function runtimeNodeLabel(node) {
  const labels = {
    brief_parser: "Brief 解析器",
    compliance_pre: "合规预检",
    planner: "任务编排",
    audience_insight: "用户洞察",
    selling_point_analyst: "卖点分析",
    platform_strategy: "平台策略",
    creative_agent: "创意智能体",
    image_prompt_skill: "视觉提示词技能",
    compliance_post: "生成后合规",
    human_approval: "人工审批",
    growth_evaluation: "增长测评",
    final_report: "最终报告"
  };
  return labels[node.node_id] || node.node_name || node.node_id;
}

function refsText(refs) {
  const values = Array.isArray(refs) ? refs.map((ref) => ref && ref.file_path).filter(Boolean) : [];
  return values.length ? values.join("\n") : "N/A";
}

function allTokenAndCostNull(nodes, summary) {
  const nodeValuesNull = nodes.every((node) => {
    const usage = node.model_usage || {};
    return usage.prompt_tokens === null && usage.completion_tokens === null && usage.total_tokens === null && usage.estimated_cost === null;
  });
  return nodeValuesNull
    && summary.total_input_tokens === null
    && summary.total_output_tokens === null
    && summary.estimated_cost === null;
}

function countBusinessStages(runtime) {
  const parallel = (runtime.parallel_groups || [])[0];
  const parallelCount = parallel && Array.isArray(parallel.parallel_node_ids) ? parallel.parallel_node_ids.length : 0;
  return parallelCount > 0 ? runtime.nodes.length - parallelCount + 1 : runtime.nodes.length;
}

function renderRuntimeKvList(selector, entries) {
  const container = document.querySelector(selector);
  if (!container) return;
  clearElement(container);
  entries.forEach(([key, value]) => {
    const term = document.createElement("dt");
    term.textContent = key;
    const desc = document.createElement("dd");
    desc.textContent = displayValue(value, "null");
    desc.className = statusToneClass(value);
    container.append(term, desc);
  });
}

function renderRuntimeNodes(runtime) {
  const body = document.querySelector("#runtime-node-rows");
  if (!body) return;
  clearElement(body);
  const parallel = (runtime.parallel_groups || [])[0];
  const parallelIds = new Set(parallel ? parallel.parallel_node_ids : []);
  let parallelGroupOpen = false;

  runtime.nodes.forEach((node) => {
    if (parallelIds.has(node.node_id) && !parallelGroupOpen) {
      const groupRow = document.createElement("tr");
      groupRow.className = "runtime-parallel-group-row";
      const groupCell = document.createElement("td");
      groupCell.colSpan = 7;
      groupCell.innerHTML = `<strong>并行组 / Parallel Group</strong><span>Planner → fan-out → Audience Insight / Selling Point Analyst / Platform Strategy → fan-in → Creative Agent</span>`;
      groupRow.appendChild(groupCell);
      body.appendChild(groupRow);
      parallelGroupOpen = true;
    }

    const row = document.createElement("tr");
    if (parallelIds.has(node.node_id)) row.className = "runtime-parallel-node";

    const title = document.createElement("td");
    title.innerHTML = `<strong>${runtimeNodeLabel(node)}</strong><small>${node.node_id}</small>`;

    const status = document.createElement("td");
    status.innerHTML = `<code class="${statusToneClass(node.status)}">${displayValue(node.status)}</code>`;

    const started = document.createElement("td");
    started.textContent = displayValue(node.started_at);

    const ended = document.createElement("td");
    ended.textContent = displayValue(node.ended_at);

    const duration = document.createElement("td");
    duration.textContent = `${displayValue(node.duration_ms)} ms`;

    const group = document.createElement("td");
    group.textContent = displayValue(node.execution_group);

    const refs = document.createElement("td");
    refs.innerHTML = `<details><summary>查看 I/O</summary><div><b>input_refs</b><pre>${refsText(node.input_refs)}</pre><b>output_refs</b><pre>${refsText(node.output_refs)}</pre></div></details>`;

    row.append(title, status, started, ended, duration, group, refs);
    body.appendChild(row);
  });
}

function renderRuntimeFlow(runtime) {
  const flow = document.querySelector("#runtime-flow");
  const parallel = (runtime.parallel_groups || [])[0];
  if (!flow || !parallel) return;
  flow.innerHTML = `
    <span>${parallel.fan_out_from}</span>
    <b>→ fan-out →</b>
    <span>${parallel.parallel_node_ids.join(" / ")}</span>
    <b>→ fan-in →</b>
    <span>${parallel.fan_in_to}</span>
  `;
}

async function loadRuntime() {
  const error = document.querySelector("#runtime-error");
  try {
    const response = await fetch("../outputs/runtime_execution.json");
    if (!response.ok) throw new Error("Runtime fetch failed");
    const runtime = await response.json();
    const nodes = Array.isArray(runtime.nodes) ? runtime.nodes : [];
    const measuredCount = nodes.filter((node) => node.timing_status === "measured" && typeof node.duration_ms === "number").length;
    const usageStatuses = [...new Set(nodes.map((node) => node.model_usage && node.model_usage.usage_status).filter(Boolean))];
    const tokenCostNull = allTokenAndCostNull(nodes, runtime.runtime_summary || {});
    const businessStageCount = countBusinessStages({ ...runtime, nodes });

    if (error) error.hidden = true;
    setText("#runtime-run-id", runtime.run_id);
    setText("#runtime-started-at", runtime.started_at);
    setText("#runtime-ended-at", runtime.ended_at);
    setText("#runtime-duration-ms", `${runtime.duration_ms} ms`);
    setText("#local-runtime-comparison-duration", `${runtime.duration_ms} ms`);
    setText("#runtime-measured-count", `${measuredCount}/${nodes.length}`);
    setText("#runtime-business-stage-count", `${businessStageCount}`);
    setText("#runtime-comparison-nodes", `${nodes.length}`);
    setText("#runtime-boundary-note", `本次 ${runtime.duration_ms} ms 是本地插桩脚本对已有结构化产物进行读取、检查和编排的实测耗时；没有调用模型、网络服务或真实人工审批，不代表生产环境 Agent 推理耗时或业务处理时延。`);

    const modelElement = document.querySelector("#runtime-model-usage");
    if (modelElement) {
      modelElement.textContent = usageStatuses.join(", ") || "not_available";
      modelElement.className = statusToneClass(usageStatuses[0] || "not_available");
    }
    const tokenCostElement = document.querySelector("#runtime-token-cost");
    if (tokenCostElement) {
      tokenCostElement.textContent = tokenCostNull ? "Token = null，成本 = null" : "需要检查";
      tokenCostElement.className = tokenCostNull ? "status-neutral" : "status-blocked";
    }

    const approval = runtime.human_approval || {};
    renderRuntimeKvList("#runtime-human-approval", [
      ["overall_decision", approval.overall_decision],
      ["human_signature", approval.human_signature],
      ["reviewer_name", approval.reviewer_name],
      ["reviewed_at", approval.reviewed_at]
    ]);
    renderRuntimeKvList("#runtime-release-gates", Object.entries(runtime.release_gates || {}));
    renderRuntimeFlow(runtime);
    renderRuntimeNodes(runtime);
  } catch (runtimeError) {
    if (error) error.hidden = false;
  }
}

async function loadRealRuntime() {
  const error = document.querySelector("#real-runtime-error");
  try {
    const response = await fetch("../outputs/real_agent_brief_parser_runtime.json");
    if (!response.ok) throw new Error("Real Runtime fetch failed");
    const runtime = await response.json();
    const usage = runtime.usage || {};
    const parsedOutput = runtime.parsed_output || {};

    if (error) error.hidden = true;
    setText("#real-runtime-node-id", runtime.node_id);
    setText("#real-runtime-run-id", runtime.run_id);
    setText("#real-runtime-session-id", runtime.session_id);
    setText("#real-runtime-provider", runtime.provider);
    setText("#real-runtime-model", runtime.model);
    setText("#real-runtime-duration-ms", `${displayValue(runtime.duration_ms)} ms`);
    setText("#real-runtime-usage-input", usage.input);
    setText("#real-runtime-usage-output", usage.output);
    setText("#real-runtime-usage-total", usage.total);
    setText("#real-runtime-stop-reason", runtime.stop_reason);
    setText("#real-runtime-fallback-used", runtime.fallback_used);
    setText("#real-runtime-parsed-status", parsedOutput.status);
    setText("#real-runtime-cost-status", "成本数据暂不可用 / Cost not available");
    setText("#real-runtime-comparison-duration", `${displayValue(runtime.duration_ms)} ms`);
  } catch (realRuntimeError) {
    if (error) error.hidden = false;
  }
}

async function loadRealAgentTrace() {
  const response = await fetch("../outputs/real_agent_trace.json");
  if (!response.ok) throw new Error("Real Agent Trace fetch failed");
  const trace = await response.json();
  setText("#real-trace-id", trace.trace_id === null ? "N/A" : trace.trace_id);
  setText("#real-trace-artifact-key", trace.artifact_trace_key);
  setText("#real-trace-id-status", trace.trace_id_status);
  setText("#real-trace-event-count", Array.isArray(trace.events) ? trace.events.length : "N/A");
  setText("#real-trace-tool-call-count", trace.tool_call_count);
  setText("#real-trace-error-count", trace.error_count);
  setText("#real-trace-retry-count", trace.retry_count);
  setText("#real-trace-status", trace.status);
}


const workTraceSources = {
  history: "../outputs/worktrace.json",
  failure: "../outputs/worktrace_failure_scenario.json"
};

let workTraceData = { history: null, failure: null };
let activeWorkTraceMode = "history";
let activeWorkTraceNode = 0;

function displayValue(value, fallback = "N/A") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function statusClass(status) {
  const normalized = normalizeStatusValue(status);
  if (normalized === "") return "status-neutral";
  return `status-${normalized}`;
}

function formatTraceStatus(status) {
  return displayValue(status).replaceAll("_", " ").toUpperCase();
}

function formatSummaryDuration(summary, mode) {
  if (mode === "history") return "historical_not_available";
  return summary.duration_ms === null || summary.duration_ms === undefined ? "N/A" : `${summary.duration_ms} ms`;
}

function formatSummaryRetry(summary, mode) {
  if (mode === "history") return "N/A";
  return displayValue(summary.retry_count);
}

function clearElement(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

function appendTextList(container, items) {
  clearElement(container);
  const values = Array.isArray(items) ? items : [];
  if (values.length === 0) {
    container.textContent = "N/A";
    return;
  }
  const list = document.createElement("span");
  list.className = "worktrace-id-list";
  values.forEach((value) => {
    const item = document.createElement("span");
    item.textContent = String(value);
    list.appendChild(item);
  });
  container.appendChild(list);
}

function appendFileList(container, refs) {
  clearElement(container);
  const values = Array.isArray(refs) ? refs : [];
  if (values.length === 0) {
    container.textContent = "N/A";
    return;
  }
  const list = document.createElement("span");
  list.className = "worktrace-file-list";
  values.forEach((ref) => {
    if (!ref || !ref.path) return;
    const link = document.createElement("a");
    link.href = `../${ref.path}`;
    link.textContent = ref.path;
    list.appendChild(link);
  });
  if (list.childElementCount === 0) {
    container.textContent = "N/A";
  } else {
    container.appendChild(list);
  }
}

function renderWorkTraceSummary(data, mode) {
  const summary = data.trace_summary || {};
  setText("#worktrace-trace-type", displayValue(summary.trace_type));
  setText("#worktrace-trace-id", "N/A");
  setText("#worktrace-artifact-key", displayValue(summary.artifact_trace_key));
  setText("#worktrace-context", displayValue(summary.execution_context));
  setText("#worktrace-status", formatTraceStatus(mode === "failure" ? "pass" : summary.workflow_status));
  setText("#worktrace-node-count", String((data.nodes || []).length));
  setText("#worktrace-duration", formatSummaryDuration(summary, mode));
  setText("#worktrace-retry", formatSummaryRetry(summary, mode));
  const note = mode === "failure"
    ? `artifact_trace_key 不是运行时 trace_id；duration_ms = ${displayValue(summary.duration_ms)}、retry_count = ${displayValue(summary.retry_count)}，${formatSummaryDuration(summary, mode)} 为本地确定性失败测试耗时，不是模型、Agent 或完整工作流运行耗时，release gates 仍然 blocked。`
    : "artifact_trace_key 不是运行时 trace_id；历史工作流没有真实时间，retry 显示 N/A。";
  setText("#worktrace-summary-note", note);
  const failurePath = document.querySelector("#worktrace-failure-path");
  if (failurePath) failurePath.hidden = mode !== "failure";
}

function renderWorkTraceNodes(data) {
  const container = document.querySelector("#worktrace-node-list");
  if (!container) return;
  clearElement(container);
  const nodes = data.nodes || [];
  nodes.forEach((node, index) => {
    const button = document.createElement("button");
    button.className = "worktrace-node";
    button.type = "button";
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-pressed", String(index === activeWorkTraceNode));
    button.dataset.index = String(index);

    const step = document.createElement("span");
    step.className = "node-step";
    step.textContent = String(node.sequence).padStart(2, "0");
    button.appendChild(step);

    const title = document.createElement("strong");
    title.textContent = displayValue(node.node_name);
    button.appendChild(title);

    const meta = document.createElement("span");
    meta.className = "worktrace-node-meta";
    [
      ["node_type", node.node_type],
      ["status", node.status],
      ["time_status", node.time_status],
      ["risk_id", `${(node.risk_ids || []).length}`],
      ["claim_id", `${(node.claim_ids || []).length}`]
    ].forEach(([label, value]) => {
      const cell = document.createElement("span");
      const labelEl = document.createElement("span");
      labelEl.textContent = label;
      const valueEl = document.createElement("b");
      valueEl.textContent = displayValue(value);
      if (label === "status" || label === "time_status") valueEl.className = statusClass(value);
      cell.append(labelEl, valueEl);
      meta.appendChild(cell);
    });
    button.appendChild(meta);

    button.addEventListener("click", () => {
      activeWorkTraceNode = index;
      renderWorkTraceNodes(data);
      renderWorkTraceDetail(nodes[index]);
    });
    container.appendChild(button);
  });
}

function renderWorkTraceDetail(node) {
  if (!node) return;
  setText("#worktrace-detail-type", `节点详情 / NODE DETAIL · ${displayValue(node.node_type).toUpperCase()} · ${formatTraceStatus(node.status)}`);
  setText("#worktrace-detail-title", `${String(node.sequence).padStart(2, "0")} · ${displayValue(node.node_name)}`);
  appendFileList(document.querySelector("#worktrace-detail-inputs"), node.input_refs);
  appendFileList(document.querySelector("#worktrace-detail-outputs"), node.output_refs);
  appendTextList(document.querySelector("#worktrace-detail-risks"), node.risk_ids);
  appendTextList(document.querySelector("#worktrace-detail-claims"), node.claim_ids);

  const errorText = node.error
    ? `error_code=${displayValue(node.error.error_code)} · ${displayValue(node.error.reason)}${node.error.reason && node.error.reason.includes("campaign_goal") ? "" : " · 缺少 campaign_goal"}`
    : "N/A";
  setText("#worktrace-detail-error", errorText);
  setText("#worktrace-detail-revision", displayValue(node.revision_action || (node.error && node.error.revision_action)));
  setText("#worktrace-detail-human", displayValue(node.human_approval));
  setText("#worktrace-detail-next", displayValue(node.next_node));
}

function renderWorkTrace(mode) {
  const error = document.querySelector("#worktrace-error");
  const data = workTraceData[mode];
  if (!data) {
    if (error) error.hidden = false;
    return;
  }
  if (error) error.hidden = true;
  activeWorkTraceMode = mode;
  activeWorkTraceNode = 0;
  document.querySelectorAll(".worktrace-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.worktraceMode === mode));
  });
  renderWorkTraceSummary(data, mode);
  renderWorkTraceNodes(data);
  renderWorkTraceDetail((data.nodes || [])[0]);
}

async function loadWorkTrace() {
  const error = document.querySelector("#worktrace-error");
  try {
    const [historyResponse, failureResponse] = await Promise.all([
      fetch(workTraceSources.history),
      fetch(workTraceSources.failure)
    ]);
    if (!historyResponse.ok || !failureResponse.ok) throw new Error("WorkTrace fetch failed");
    const [history, failure] = await Promise.all([historyResponse.json(), failureResponse.json()]);
    if (!Array.isArray(history.nodes) || history.nodes.length !== 15) throw new Error("Historical WorkTrace node count mismatch");
    if (!Array.isArray(failure.nodes) || failure.nodes.length !== 3) throw new Error("Failure WorkTrace node count mismatch");
    workTraceData = { history, failure };
    renderWorkTrace(activeWorkTraceMode);
  } catch (errorObject) {
    if (error) error.hidden = false;
  }
}

document.querySelectorAll(".worktrace-toggle").forEach((button) => {
  button.addEventListener("click", () => renderWorkTrace(button.dataset.worktraceMode));
});

document.querySelectorAll(".governance-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.id === "governance-tab-failure" ? "failure" : "compliance";
    setGovernanceTab(mode);
    const hash = mode === "failure" ? "#failure-test" : "#compliance";
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  });
});

proofTabs.forEach((button, index) => {
  button.addEventListener("click", () => {
    setProofTab(button.dataset.proofTab);
    const hash = `#${button.dataset.proofTab}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  });
  button.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveProofTabFocus(index, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveProofTabFocus(index, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      proofTabs[0].focus();
      setProofTab(proofTabs[0].dataset.proofTab);
    } else if (event.key === "End") {
      event.preventDefault();
      proofTabs[proofTabs.length - 1].focus();
      setProofTab(proofTabs[proofTabs.length - 1].dataset.proofTab);
    }
  });
});

window.addEventListener("hashchange", () => {
  syncProofTabFromHash(true);
  syncGovernanceTabFromHash(true);
});

primaryPlayLinks.forEach((link) => link.addEventListener("click", startDemo));
playButton.addEventListener("click", startDemo);
resetButton.addEventListener("click", () => {
  stopDemo({ clearPlayback: true });
  selectNode(0);
});

renderWorkflow();
selectNode(0);
loadEvidence();
loadFailureScenario();
loadBoundaryStatus();
loadWorkflowMetrics();
loadRuntime();
loadRealRuntime();
loadRealAgentTrace();
loadWorkTrace();
syncProofTabFromHash(["#proof", "#evidence", "#metrics", "#worktrace", "#runtime"].includes(window.location.hash));
syncGovernanceTabFromHash(window.location.hash === "#failure-test" || window.location.hash === "#compliance" || window.location.hash === "#governance");

if (new URLSearchParams(window.location.search).get("demo") === "1") {
  window.setTimeout(startDemo, 250);
}
