import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

// ── Config ──────────────────────────────────────────────────────────────
const SRC_DIR = process.argv[2] || "../make.com_projects_json";
const OUT_DIR = "public/work";
const COL_W = 210;   // horizontal spacing per column
const ROW_H = 96;    // vertical spacing per row
const NODE_W = 176;
const NODE_H = 72;
const PAD = 48;

// ── App + action labelling ──────────────────────────────────────────────
const APP_LABEL = {
  gateway: "Webhook",
  builtin: "Flow",
  http: "HTTP",
  airtable: "Airtable",
  suitedash: "SuiteDash",
  aweber: "AWeber",
  klaviyo: "Klaviyo",
  sendgrid: "SendGrid",
  shopify: "Shopify",
  tally: "Tally",
  cloudinary: "Cloudinary",
  stripe: "Stripe",
  regexp: "Regex",
  util: "Tools",
  json: "JSON",
};

const APP_COLOR = {
  gateway: "#7c3aed",
  builtin: "#475569",
  http: "#0ea5e9",
  airtable: "#f59e0b",
  suitedash: "#2563eb",
  aweber: "#16a34a",
  klaviyo: "#111827",
  sendgrid: "#1d4ed8",
  shopify: "#22c55e",
  tally: "#14b8a6",
  cloudinary: "#3b82f6",
  stripe: "#635bff",
  regexp: "#64748b",
  util: "#64748b",
  json: "#64748b",
};

const ACTION_MAP = {
  CustomWebHook: "Webhook",
  BasicRouter: "Router",
  BasicAggregator: "Aggregator",
  BasicFeeder: "Iterator",
  MakeRequest: "HTTP Request",
  ActionSearchRecords: "Search Records",
  ActionGetRecord: "Get Record",
  ActionCreateRecord: "Create Record",
  ActionUpdateRecords: "Update Records",
  upsertRecord: "Upsert Record",
  ActionGetFile: "Get File",
  ActionSendData: "Send Data",
  DownloadFile: "Download File",
  UploadResource: "Upload Image",
  sendMail: "Send Email",
  createArticle: "Create Article",
  watchNewResponse: "New Response",
  getContact: "Get Contact",
  listContacts: "List Contacts",
  makeAnApiCall: "API Call",
  Parser: "Parse",
  SetVariable2: "Set Variable",
  createSubscrProfileToList: "Add To List",
  FindSubscribersForAccount: "Find Subscribers",
  GetSubscriberActivity: "Get Activity",
  UpdateSubscriber: "Update Subscriber",
  CreateSubscriber: "Create Subscriber",
};

function humanize(s) {
  return s
    .replace(/^Action/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function labelFor(moduleStr, routeCount) {
  if (!moduleStr) return { app: "Router", action: `${routeCount || ""} routes`.trim(), color: "#7c3aed" };
  const [appRaw, actionRaw = ""] = moduleStr.split(":");
  // Built-in Make modules read better with the action as the title.
  if (appRaw === "builtin" || appRaw === "util") {
    const title = ACTION_MAP[actionRaw] || humanize(actionRaw);
    const sub = { Router: `${routeCount || ""} routes`.trim(), Aggregator: "Combine", Iterator: "Loop", "Set Variable": "Store" };
    return { app: title, action: sub[title] || "Make", color: title === "Router" ? "#7c3aed" : "#64748b" };
  }
  const app = APP_LABEL[appRaw] || humanize(appRaw);
  const action = ACTION_MAP[actionRaw] || humanize(actionRaw) || app;
  const color = APP_COLOR[appRaw] || "#64748b";
  return { app, action, color };
}

// ── Layout (recursive: sequence left→right, router branches stack down) ──
let idc = 0;
function layout(flow, col, rowTop, nodes, edges) {
  let c = col;
  let prev = null;
  let rows = 1;
  for (const m of flow || []) {
    const isRouter = !!m.routes;
    const id = idc++;
    if (isRouter) {
      // place routes first to know vertical span
      let r = rowTop;
      let branchRows = 0;
      const firstIds = [];
      for (const route of m.routes) {
        const sub = layout(route.flow, c + 1, r, nodes, edges);
        if (sub.firstId != null) firstIds.push(sub.firstId);
        r += sub.rows;
        branchRows += sub.rows;
      }
      branchRows = Math.max(branchRows, 1);
      const routerRow = rowTop + (branchRows - 1) / 2;
      nodes.push({ id, col: c, row: routerRow, ...labelFor(m.module, m.routes.length), router: true });
      if (prev != null) edges.push([prev, id]);
      firstIds.forEach((fid) => edges.push([id, fid]));
      rows = Math.max(rows, branchRows);
      prev = null; // router is terminal in its sequence
    } else {
      nodes.push({ id, col: c, row: rowTop, ...labelFor(m.module) });
      if (prev != null) edges.push([prev, id]);
      prev = id;
      c++;
    }
  }
  return { rows, firstId: nodes.find((n) => n.col === col && n.row >= rowTop)?.id ?? null };
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(name, nodes, edges) {
  const maxCol = Math.max(...nodes.map((n) => n.col), 0);
  const maxRow = Math.max(...nodes.map((n) => n.row), 0);
  const W = PAD * 2 + (maxCol + 1) * COL_W;
  const H = PAD * 2 + (maxRow + 1) * ROW_H + 40; // +40 for title

  const cx = (n) => PAD + n.col * COL_W;
  const cy = (n) => PAD + 40 + n.row * ROW_H;

  // edges as smooth curves from right-middle of source to left-middle of target
  const edgeSvg = edges
    .map(([a, b]) => {
      const s = nodes.find((n) => n.id === a);
      const t = nodes.find((n) => n.id === b);
      if (!s || !t) return "";
      const x1 = cx(s) + NODE_W, y1 = cy(s) + NODE_H / 2;
      const x2 = cx(t), y2 = cy(t) + NODE_H / 2;
      const mx = (x1 + x2) / 2;
      return `<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" fill="none" stroke="#3b82f6" stroke-opacity="0.45" stroke-width="2"/>`;
    })
    .join("\n");

  const nodeSvg = nodes
    .map((n) => {
      const x = cx(n), y = cy(n);
      return `<g transform="translate(${x},${y})">
        <rect width="${NODE_W}" height="${NODE_H}" rx="12" fill="#0f1830" stroke="${n.color}" stroke-opacity="0.85" stroke-width="2"/>
        <rect width="6" height="${NODE_H}" rx="3" fill="${n.color}"/>
        <text x="20" y="30" font-size="16" font-weight="700" fill="#e2e8f0">${esc(n.app)}</text>
        <text x="20" y="52" font-size="13" font-weight="500" fill="#94a3b8">${esc(n.action)}</text>
      </g>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(name)} Make.com workflow">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0f1c"/>
      <stop offset="100%" stop-color="#0b1424"/>
    </linearGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#3b82f6" fill-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <text x="${PAD}" y="${PAD - 6}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#f1f5f9">${esc(name)}</text>
  <g font-family="Inter, Segoe UI, Arial, sans-serif">
    ${edgeSvg}
    ${nodeSvg}
  </g>
</svg>
`;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ── Run ─────────────────────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });
const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".json"));
const manifest = [];
for (const f of files) {
  const j = JSON.parse(readFileSync(join(SRC_DIR, f), "utf8"));
  idc = 0;
  const nodes = [];
  const edges = [];
  layout(j.flow, 0, 0, nodes, edges);
  const name = (j.name || basename(f, ".blueprint.json")).trim();
  const svg = render(name, nodes, edges);
  const slug = slugify(name.replace(/\s*\(.*?\)\s*/g, " "));
  const file = `make-${slug}.svg`;
  writeFileSync(join(OUT_DIR, file), svg, "utf8");
  const apps = [...new Set(nodes.map((n) => n.app).filter((a) => a !== "Flow"))];
  manifest.push({ name, file, modules: nodes.length, apps });
  console.log(`${file}  (${nodes.length} modules)  apps: ${apps.join(", ")}`);
}
writeFileSync(join(OUT_DIR, "_make-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nGenerated ${manifest.length} diagrams.`);
