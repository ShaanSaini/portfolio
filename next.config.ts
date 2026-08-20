import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pins the project root so Turbopack doesn't walk up to an unrelated
  // lockfile in a parent directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // The placeholder artwork in public/images is SVG. Swap in real
    // JPG/PNG/WebP photos and this can be removed if you'd rather not
    // serve SVG through the image optimizer.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        // Every Vercel Blob store gets its own subdomain of this form.
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
