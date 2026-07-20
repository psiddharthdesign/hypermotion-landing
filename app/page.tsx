// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link'
import { CopyableCodeBlock } from './components/CopyableCodeBlock'
import { formatVersionLabel, getLatestRelease } from './lib/github'

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
 *
 * Version: the hero kicker, features section heading, and footer line
 * all derive from the latest GitHub release of psiddharthdesign/hypermotion,
 * fetched at build-time via Next.js fetch with 1-hour revalidate. New
 * releases land on the landing site within an hour — no manual bump.
 * Falls back to "Research preview" if the API is unreachable.
 */
export default async function Page() {
  const release = await getLatestRelease()
  const version = formatVersionLabel(release)
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero version={version} />
      <Features version={version} />
      <Cli />
      <Footer version={version} />
    </main>
  )
}

function Nav() {
  return (
    <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-[15px] font-semibold tracking-tight text-text">
          hyper-motion
        </span>
      </Link>
      <div className="flex items-center gap-2 text-[13px]">
        <Link
          href="/docs"
          className="px-3 py-1.5 text-text-muted hover:text-text"
        >
          Docs
        </Link>
        <Link
          href="/changelog"
          className="px-3 py-1.5 text-text-muted hover:text-text"
        >
          Changelog
        </Link>
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

function Hero({ version }: { version: string }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-28 pt-24 sm:pt-40">
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
        Open source · {version}
      </p>
      <h1 className="max-w-3xl text-balance text-[44px] font-semibold leading-[1.05] tracking-tight text-text sm:text-[68px]">
        A motion tool for designers who think in layouts.
      </h1>
      <p className="mt-8 max-w-xl text-[17px] leading-[1.55] text-text-muted sm:text-[18px]">
        Animate text by letter, word, or line, shape its stagger on a curve,
        and finish 3D scenes with focus blur, Bloom, and Chromatic Aberration.
        Export up to 4K with sound.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
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
      <p className="mt-5 text-[12.5px] text-text-subtle">
        macOS only for now ·{' '}
        <Link
          href="/docs#install"
          className="underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
        >
          first-time install needs a one-line setup
        </Link>
      </p>
    </section>
  )
}

function Features({ version }: { version: string }) {
  // Feature list reflects what's shipped in the latest tagged release.
  const items = [
    {
      title: 'Curve-driven text',
      body:
        'Animate letters, words, or lines with XYZ motion, typewriter, and ' +
        'scramble. Draw a Bézier path and shape how the sequence enters.',
    },
    {
      title: 'Stagger you can direct',
      body:
        'Choose forward or reverse order for layers, letters, words, and lines. ' +
        'Duplicate a stagger or create an exact return without rebuilding keyframes.',
    },
    {
      title: 'Camera effects',
      body:
        'Add Bloom and Chromatic Aberration to the active camera, keyframe their ' +
        'controls, and keep the same look in preview and final export.',
    },
    {
      title: 'Focus with depth',
      body:
        'Move an animated focus point through the scene and tune aperture, blur, ' +
        'falloff, and bokeh for progressive depth of field.',
    },
    {
      title: 'Smoother playback',
      body:
        'Text-heavy scenes and camera effects use bounded preview rendering, ' +
        'while final exports retain full quality.',
    },
    {
      title: 'Timeline + media',
      body:
        'Combine animation, video, and waveform-backed audio on one timeline, ' +
        'then preview or export the exact work area you choose.',
    },
    {
      title: 'Figma import',
      body:
        'Plugin that brings frames, text, layout sizing, per-corner radii, ' +
        'individual stroke weights, and layout grids onto the canvas.',
    },
    {
      title: 'CLI + MCP',
      body:
        'Create, inspect, validate, patch, open, and render .hype scenes from ' +
        'scripts or any MCP-compatible AI agent.',
    },
  ]
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
        {version}
      </p>
      <h2 className="mb-12 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl">
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
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
        CLI &amp; MCP · source preview
      </p>
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        Create and render from code.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-[1.55] text-text-muted">
        Create, inspect, patch, validate, open, and render saved .hype scenes
        from the repository today. The MCP server connects the same workflow
        to Claude Code, Codex, and other compatible clients.
      </p>
      <div className="mt-7 max-w-2xl overflow-hidden rounded-2xl border border-dashed border-border bg-surface opacity-80">
        <div className="border-b border-border bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-subtle">
          Terminal · preview
        </div>
        <CopyableCodeBlock
          className="rounded-none border-0 bg-surface"
          preClassName="p-5 text-text-muted"
          code={`$ git clone https://github.com/psiddharthdesign/hypermotion.git
$ cd hypermotion && pnpm install
$ pnpm --dir cli build
$ node cli/bin/hypermotion.mjs --help`}
        />
      </div>
      <p className="mt-4 text-[12.5px] text-text-subtle">
        CLI source and MCP setup ·{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/blob/main/AGENTS.md"
          className="underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
        >
          read the guide
        </Link>
      </p>
    </section>
  )
}

function Footer({ version }: { version: string }) {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-8 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span>hyper-motion · Apache 2.0 · {version} research preview</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/changelog" className="hover:text-text">
            Changelog
          </Link>
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
