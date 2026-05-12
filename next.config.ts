import type { NextConfig } from 'next'

/**
 * Next.js config for hypermotion.app.
 *
 * Deployment target: Vercel or Cloudflare Pages. Both auto-detect Next.js
 * — no custom build command required. For Cloudflare Pages specifically,
 * the App Router + Server Components flow uses the `@cloudflare/next-on-pages`
 * adapter; add it before deploying there.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No image domains yet — switch on remotePatterns when we host preview
  // GIFs / screenshots on R2 or a CDN.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
