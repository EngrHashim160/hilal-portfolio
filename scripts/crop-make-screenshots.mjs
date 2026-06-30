import sharp from "sharp";
import { join } from "node:path";

const SRC = "../make.com project screenshots";
const OUT = "public/work";

// filename → output name (mapped after identifying each screenshot)
const MAP = {
  "Screenshot 2026-06-30 232717.png": "make-aweber-engagement-tracking.png",
  "Screenshot 2026-06-30 232815.png": "make-pagefly-shopify-blog.png",
  "Screenshot 2026-06-30 233556.png": "make-suitedash-api-metadata.png",
  "Screenshot 2026-06-30 233630.png": "make-pet-profile-report.png",
  "Screenshot 2026-06-30 233837.png": "make-ppd-subscription.png",
  "Screenshot 2026-06-30 233919.png": "make-master-flow-stripe.png",
};

for (const [src, out] of Object.entries(MAP)) {
  const meta = await sharp(join(SRC, src)).metadata();
  const W = meta.width, H = meta.height;
  // Remove top header/tabs, right sidebar, and bottom usage graph.
  const left = 0;
  const top = Math.round(H * 0.13);          // below the tab bar
  const width = Math.round(W * 0.765);        // drop the right sidebar (~76.5%)
  const height = Math.round(H * 0.79) - top;  // drop the bottom graph (~79%)
  await sharp(join(SRC, src))
    .extract({ left, top, width, height })
    .png({ quality: 90 })
    .toFile(join(OUT, out));
  console.log(`${out}  (${width}x${height})`);
}
console.log("\nCropped 6 screenshots.");
