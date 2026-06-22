// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  eslint: {
    ignoreDuringBuilds: true, // disable ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // disable TypeScript errors during build
  },
  images: {
    unoptimized: true, // ⬅️ REQUIRED FOR STATIC EXPORT
  },
};

export default nextConfig; // ✅ Correct export for .mjs
