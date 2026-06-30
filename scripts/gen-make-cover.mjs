import { writeFileSync } from "node:fs";

const W = 1200, H = 675;
const apps = ["Airtable", "Stripe", "SendGrid", "Klaviyo", "AWeber", "SuiteDash", "Shopify", "Cloudinary", "Tally", "Webhooks"];
const esc = (s) => s.replace(/&/g, "&amp;");

let chips = "";
let x = 80, y = 470;
const rowH = 56;
for (const a of apps) {
  const w = a.length * 13 + 44;
  if (x + w > W - 80) { x = 80; y += rowH; }
  chips += `<g transform="translate(${x},${y})"><rect width="${w}" height="40" rx="20" fill="#0f1830" stroke="#3b82f6" stroke-opacity="0.4" stroke-width="1.5"/><text x="${w / 2}" y="26" font-size="18" font-weight="600" fill="#cbd5e1" text-anchor="middle">${esc(a)}</text></g>`;
  x += w + 12;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Make.com Automations">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a0f1c"/><stop offset="55%" stop-color="#0d1b34"/><stop offset="100%" stop-color="#2a1145"/></linearGradient>
    <radialGradient id="g1" cx="15%" cy="20%" r="60%"><stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.45"/><stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="88%" cy="85%" r="55%"><stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/><stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#3b82f6" fill-opacity="0.10"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#dots)"/><rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
  <g font-family="Inter, Segoe UI, Arial, sans-serif">
    <rect x="80" y="80" width="190" height="40" rx="20" fill="#7c3aed" fill-opacity="0.16" stroke="#7c3aed" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="98" y="106" font-size="20" font-weight="600" fill="#c4b5fd">Make.com Expert</text>
    <text x="80" y="250" font-size="74" font-weight="800" fill="#f1f5f9" letter-spacing="-1">Make.com</text>
    <text x="80" y="330" font-size="74" font-weight="800" fill="#f1f5f9" letter-spacing="-1">Automations</text>
    <text x="80" y="392" font-size="24" font-weight="500" fill="#94a3b8">11 production workflows · CRM, email, billing &amp; e-commerce</text>
    ${chips}
  </g>
</svg>`;

writeFileSync("public/work/cover-make-automations.svg", svg, "utf8");
console.log("wrote public/work/cover-make-automations.svg");
