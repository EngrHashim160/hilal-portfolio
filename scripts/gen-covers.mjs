import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// Themed SVG cover generator for projects without real screenshots.
// Matches the portfolio dark theme (blue brand / green accent).

const OUT_DIR = "public/work";

// Wrap a title into up to 3 lines that fit the canvas width.
function wrapTitle(title, maxChars = 22) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cover({ file, title, tag, tech }) {
  const W = 1200;
  const H = 675; // 16:9
  const titleLines = wrapTitle(title);
  const lineHeight = 70;
  const titleBlockHeight = titleLines.length * lineHeight;
  const startY = H / 2 - titleBlockHeight / 2 + 40;

  const titleTspans = titleLines
    .map(
      (t, i) =>
        `<tspan x="80" y="${startY + i * lineHeight}">${escapeXml(t)}</tspan>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0f1c"/>
      <stop offset="55%" stop-color="#0d1b34"/>
      <stop offset="100%" stop-color="#071a14"/>
    </linearGradient>
    <radialGradient id="glow" cx="18%" cy="22%" r="60%">
      <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="90%" cy="92%" r="55%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="#3b82f6" fill-opacity="0.10"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>

  <!-- accent tag -->
  <g font-family="Inter, Segoe UI, Arial, sans-serif">
    <rect x="80" y="80" width="${tag.length * 13 + 36}" height="40" rx="20" fill="#10b981" fill-opacity="0.14" stroke="#10b981" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="${80 + 18}" y="${80 + 26}" font-size="20" font-weight="600" fill="#5eead4" letter-spacing="0.5">${escapeXml(tag)}</text>

    <!-- title -->
    <text font-size="58" font-weight="800" fill="#f1f5f9" letter-spacing="-0.5">${titleTspans}</text>

    <!-- tech stack -->
    <text x="80" y="${H - 70}" font-size="24" font-weight="500" fill="#94a3b8" letter-spacing="0.3">${escapeXml(tech)}</text>
  </g>
</svg>
`;

  const path = `${OUT_DIR}/${file}`;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg, "utf8");
  console.log("wrote", path);
}

const covers = [
  {
    file: "cover-smart-agriculture.svg",
    title: "AI-Integrated Smart Agriculture App",
    tag: "Computer Vision",
    tech: "ML · Flutter · REST APIs · Disease Detection",
  },
  {
    file: "cover-intake-voice-agent.svg",
    title: "Intake Voice Agent",
    tag: "Voice AI",
    tech: "LiveKit · Deepgram · Groq · FastAPI · Cloud Run",
  },
  {
    file: "cover-hermes-infrastructure.svg",
    title: "Hermes AI Agent Infrastructure",
    tag: "Infra / DevOps",
    tech: "Docker · Cloudflare · Honcho · PostgreSQL · Redis",
  },
  {
    file: "cover-langgraph-chatbot.svg",
    title: "LangGraph Agentic Chatbot",
    tag: "Agentic AI",
    tech: "LangGraph · LangChain · Groq · Tavily · Streamlit",
  },
  {
    file: "cover-crm-copilot.svg",
    title: "AI CRM Copilot",
    tag: "MCP / Agents",
    tech: "GoHighLevel · HubSpot · Claude · MCP · WhatsApp",
  },
  {
    file: "cover-travel-agent.svg",
    title: "AI Travel Agent Automation",
    tag: "Automation",
    tech: "OpenClaw · Notion · Tavily · Telegram · n8n",
  },
  {
    file: "cover-marketing-intelligence.svg",
    title: "Marketing Intelligence Platform",
    tag: "AI Orchestration",
    tech: "n8n · Airtable · Google Ads · OpenRouter · GPT",
  },
  {
    file: "cover-youtube-agents.svg",
    title: "YouTube Automation Agents",
    tag: "Multi-Agent",
    tech: "OpenClaw · Insight · SEO · Thumbnail Agents",
  },
  {
    file: "cover-career-blog-engine.svg",
    title: "Automated Career Blog Engine",
    tag: "Content AI",
    tech: "n8n · LLM · Image Gen · WordPress · SEO",
  },
];

for (const c of covers) cover(c);
console.log(`\nGenerated ${covers.length} cover images.`);
