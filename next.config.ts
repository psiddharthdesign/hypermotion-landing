import type { NextConfig } from 'next'

/**
 * Next.js config for hypermotion.app.
 *
 * The landing site is emitted as static HTML/CSS/JS. Server Components and
 * their GitHub requests run only during `next build`; production traffic is
 * served directly from the CDN without a Node.js function.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export has no image optimization server. Keep future next/image
  // usage compatible with the no-runtime deployment model.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
