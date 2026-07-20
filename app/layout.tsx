// SPDX-License-Identifier: Apache-2.0
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const SITE_URL = 'https://hypermotion.app'
const TITLE = 'hyper-motion — Text animation, 3D motion, and camera effects'
const DESCRIPTION =
  'Open-source motion design for layout-minded designers. Animate text on ' +
  'editable curves, build in 3D, add camera effects, and export up to 4K with sound.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'hyper-motion',
  authors: [{ name: 'Siddharth Ponnapalli' }],
  keywords: [
    'motion design',
    'animation tool',
    'text animation',
    '3D motion',
    'camera effects',
    'figma',
    'jitter',
    'lottie',
    'auto layout',
    'design tool',
    'video export',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'hyper-motion',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@psiddharthdesign',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  // White address-bar tint on mobile to match the light theme.
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
