// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link'

/**
 * Landing page for hypermotion.app — light-mode minimal.
 *
 * Reference patterns pulled from Mobbin:
 *  - Apollo:   center-aligned bold sans headline on pure white, single
 *              accent only on the primary CTA, clean product block below.
 *  - AutoSend: "Email for Developers, Marketers, & AI Agents" style of
 *              headline; filled + ghost CTA pair.
 *  - Base44:   subtle warm gradient at the top, fading to flat white;
 *              generous whitespace; near-zero chrome.
 *
 * Sections:
 *  1. Nav (slim — logo + GitHub + Download)
 *  2. Hero — bold headline, sub-copy, CTA pair, platform line
 *  3. Features — 2-col grid of what actually ships today
 *  4. CLI snippet
 *  5. Footer
 */
export default function Page() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <Cli />
      <Footer />
    </main>
  )
}

function Nav() {
  return (
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-[15px] font-semibold tracking-tight text-text">
          hyper-motion
        </span>
      </Link>
      <div className="flex items-center gap-2 text-[13px]">
        <Link
          href="https://github.com/psiddharthdesign/hypermotion"
          className="px-3 py-1.5 text-text-muted hover:text-text"
        >
          GitHub
        </Link>
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/releases"
          className="rounded-full bg-accent px-4 py-1.5 font-medium text-white hover:brightness-110"
        >
          Download
        </Link>
      </div>
    </nav>
  )
}

function Logo() {
  // Solid black mark — light-mode friendly, no gradient.
  return (
    <span
      aria-hidden
      className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-[13px] font-bold text-white"
    >
      M
    </span>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-16 text-center sm:pt-24">
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-text-subtle">
        Open source · v0.1.0
      </p>
      <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-6xl">
        A motion tool for designers
        <br className="hidden sm:block" />
        who think in layouts.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-[1.55] text-text-muted sm:text-[18px]">
        Auto-layout, 3D camera, multi-chapter timeline, pixel-correct
        MP4 / WebM / GIF. Open source, free forever.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/releases"
          className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-white hover:brightness-110"
        >
          Download for Mac
        </Link>
        <Link
          href="https://github.com/psiddharthdesign/hypermotion"
          className="rounded-full border border-border-strong bg-white px-5 py-2.5 text-[14px] font-medium text-text hover:border-text-muted"
        >
          Source on GitHub
        </Link>
      </div>
      <p className="mt-5 text-[12.5px] text-text-subtle">Windows build coming soon</p>
    </section>
  )
}

function Features() {
  // Only ship features that actually work in v0.1.0.
  const items = [
    {
      title: 'Semantic keyframes',
      body:
        'Animate variant, opacity, scale, rotation, gap, padding — not raw ' +
        'x / y. Layouts can shift without breaking timing.',
    },
    {
      title: 'Auto layout',
      body:
        'Flex containers with gap, padding, alignment. The same layout model ' +
        'designers already think in from Figma.',
    },
    {
      title: '3D camera',
      body:
        'X / Y / Z position, three-axis rotation, real depth-of-field with ' +
        'aperture and focus distance. Keyframe it like any other property.',
    },
    {
      title: 'Timeline with chapters',
      body:
        'Named sections you can isolate, loop, and export. Pick any ' +
        'combination of chapters and ship them as one concatenated file.',
    },
    {
      title: 'Pixel-correct export',
      body:
        'MP4 (H.264 via WebCodecs) up to 4K. WebM via tab capture. GIF via ' +
        'gifenc. Captured directly from the renderer — no screen recording.',
    },
    {
      title: 'Figma import',
      body:
        'Plugin that brings frames, text, layout sizing, per-corner radii, ' +
        'individual stroke weights, and layout grids onto the canvas.',
    },
    {
      title: 'Open source',
      body:
        'Apache 2.0, full source on GitHub. Yjs-backed data model from day ' +
        'one — real-time collab arrives without a rewrite.',
    },
    {
      title: 'AI-driveable',
      body:
        'CLI + Model Context Protocol server included. Claude Code, Codex, ' +
        'and any MCP-compatible agent can render scenes from the terminal.',
    },
  ]
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="mb-12 text-balance text-center text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        What ships today.
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <div className="mb-2 text-[14px] font-semibold tracking-tight text-text">
              {f.title}
            </div>
            <div className="text-[13.5px] leading-[1.55] text-text-muted">
              {f.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cli() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        Render from the terminal.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-[1.55] text-text-muted">
        Optional companion package. Drive renders from a script, a CI job,
        or an AI coding agent.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="border-b border-border bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-subtle">
          Terminal
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-text">
{`# install globally
$ pnpm add -g @psiddharthdesign/hypermotion

# render the current scene
$ hypermotion render -o demo.mp4 -q 4k

# wire it into Claude Code
$ claude mcp add hypermotion -- hypermotion-mcp`}
        </pre>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span>hyper-motion · Apache 2.0 · v0.1.0 research preview</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="https://github.com/psiddharthdesign/hypermotion"
            className="hover:text-text"
          >
            Source
          </Link>
          <Link
            href="https://github.com/psiddharthdesign/hypermotion/releases"
            className="hover:text-text"
          >
            Releases
          </Link>
          <Link
            href="https://github.com/psiddharthdesign/hypermotion/issues"
            className="hover:text-text"
          >
            Issues
          </Link>
        </div>
      </div>
    </footer>
  )
}
