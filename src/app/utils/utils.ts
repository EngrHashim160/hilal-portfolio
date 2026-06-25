import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from 'next/navigation';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

// Read intrinsic dimensions of a public-folder image and return its "w / h"
// aspect ratio string. Reads JPEG/PNG/SVG headers directly (no extra deps).
// Returns undefined if it can't be determined, so callers can fall back.
export function getImageAspectRatio(publicSrc?: string): string | undefined {
  if (!publicSrc) return undefined;
  const filePath = path.join(process.cwd(), "public", publicSrc.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) return undefined;

  try {
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    // SVG: parse width/height or viewBox from the opening tag
    if (ext === ".svg") {
      const head = buf.toString("utf-8", 0, 1024);
      const w = head.match(/\bwidth="([\d.]+)/);
      const h = head.match(/\bheight="([\d.]+)/);
      if (w && h) return `${w[1]} / ${h[1]}`;
      const vb = head.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/);
      if (vb) return `${vb[1]} / ${vb[2]}`;
      return undefined;
    }

    // PNG: dimensions are big-endian at bytes 16-23
    if (buf[0] === 0x89 && buf[1] === 0x50) {
      const w = buf.readUInt32BE(16);
      const h = buf.readUInt32BE(20);
      if (w && h) return `${w} / ${h}`;
      return undefined;
    }

    // JPEG: scan for the SOF marker that carries the dimensions
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = buf[i + 1];
        if (marker >= 0xc0 && marker <= 0xc3) {
          const h = buf.readUInt16BE(i + 5);
          const w = buf.readUInt16BE(i + 7);
          if (w && h) return `${w} / ${h}`;
          return undefined;
        }
        const len = buf.readUInt16BE(i + 2);
        i += 2 + len;
      }
    }
  } catch {
    return undefined;
  }
  return undefined;
}
