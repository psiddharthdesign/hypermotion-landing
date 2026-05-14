// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs — hyper-motion',
  description:
    'How to install and run hyper-motion. First-time setup on macOS, CLI usage, and AI agent integration.',
}

/**
 * Documentation hub.
 *
 * v0.1.0 has one finished doc (the macOS install guide) and stubs for
 * everything else. The hub format is forward-compatible — when CLI,
 * MCP, features, and FAQ docs are written, they get added as their own
 * sections without restructuring.
 */
export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <InstallSection />
      <ComingSoon />
      <Footer />
    </main>
  )
}

function Nav() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-[15px] font-semibold tracking-tight text-text">
          hyper-motion
        </span>
      </Link>
      <div className="flex items-center gap-2 text-[13px]">
        <Link
          href="/docs"
          className="px-3 py-1.5 font-medium text-text"
        >
          Docs
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
    <section className="mx-auto max-w-3xl px-6 pb-10 pt-16">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-text-subtle">
        Documentation
      </p>
      <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl">
        Get started with hyper-motion.
      </h1>
      <p className="mt-4 max-w-xl text-[16px] leading-[1.55] text-text-muted">
        The full install guide for the v0.1.0 research preview. More docs
        — CLI flags, MCP integration, feature walkthroughs — are on the
        way.
      </p>
    </section>
  )
}

function InstallSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2
        id="install"
        className="scroll-mt-20 text-2xl font-semibold tracking-tight text-text"
      >
        First-time install on macOS
      </h2>
      <p className="mt-3 text-[15px] leading-[1.6] text-text-muted">
        The v0.1.x series ships unsigned, so macOS will block the first
        open with a &ldquo;damaged&rdquo; dialog. Two-step setup, then it
        opens normally forever.
      </p>

      <ol className="mt-8 space-y-8">
        <Step
          n={1}
          title={
            <>
              Drag <span className="font-mono">hyper-motion</span> to{' '}
              <span className="font-mono">/Applications</span>
            </>
          }
          body={
            <p className="text-[14px] leading-[1.6] text-text-muted">
              Download the{' '}
              <Link
                href="https://github.com/psiddharthdesign/hypermotion/releases"
                className="text-text underline hover:text-accent"
              >
                latest .dmg
              </Link>{' '}
              — pick <span className="font-mono">*-arm64.dmg</span> for
              Apple Silicon or <span className="font-mono">*.dmg</span> for
              Intel. Open the DMG, drag{' '}
              <span className="font-mono">hyper-motion</span> to{' '}
              <span className="font-mono">Applications</span> like any
              other Mac app.
            </p>
          }
        />

        <Step
          n={2}
          title="Open Terminal and paste these two lines"
          body={
            <>
              <pre className="overflow-x-auto rounded-lg border border-border bg-white p-4 font-mono text-[13px] leading-relaxed text-text">
{`xattr -cr /Applications/hyper-motion.app
codesign --force --deep --sign - /Applications/hyper-motion.app`}
              </pre>
              <p className="mt-3 text-[14px] leading-[1.6] text-text-muted">
                Strips macOS&rsquo;s download quarantine and re-applies an
                ad-hoc signature locally. After this, double-click the app
                and it opens. macOS only asks once per install.
              </p>
            </>
          }
        />
      </ol>

      <div className="mt-12 rounded-2xl border border-border bg-surface/60 p-6">
        <h3 className="text-[15px] font-semibold text-text">
          Why is this needed?
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-text-muted">
          macOS Sequoia / Sonoma flag any unsigned download as
          &ldquo;damaged&rdquo; before they even check what&rsquo;s inside
          the bundle. <span className="font-mono">xattr -cr</span> removes
          the <span className="font-mono">com.apple.quarantine</span>{' '}
          attribute that browsers add to downloaded files;{' '}
          <span className="font-mono">codesign --force --deep --sign -</span>{' '}
          re-applies an ad-hoc signature <em>locally</em>, which
          Gatekeeper trusts in a way it doesn&rsquo;t trust the
          downloaded one. Apple Developer signing + notarization — which
          removes both steps entirely — is planned for v0.2.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-6">
        <h3 className="text-[15px] font-semibold text-text">
          Skip the steps: build from source
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-text-muted">
          Locally-built apps never get the quarantine flag, so they open
          without warnings.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-white p-4 font-mono text-[13px] leading-relaxed text-text">
{`git clone https://github.com/psiddharthdesign/hypermotion.git
cd hypermotion
pnpm install
pnpm build:dir
open release/mac-arm64/hyper-motion.app`}
        </pre>
        <p className="mt-3 text-[13px] leading-[1.55] text-text-subtle">
          Requires Node 20+ and pnpm 9+. About 5 minutes end-to-end on a
          fresh machine.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-6">
        <h3 className="text-[15px] font-semibold text-text">Windows?</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-text-muted">
          Not shipping yet. The Windows build pipeline works but
          we&rsquo;re focusing on macOS polish first. Coming in a later
          v0.1.x release.
        </p>
      </div>
    </section>
  )
}

function Step({
  n,
  title,
  body,
}: {
  n: number
  title: React.ReactNode
  body: React.ReactNode
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white">
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-2 text-[16px] font-semibold tracking-tight text-text">
          {title}
        </div>
        {body}
      </div>
    </li>
  )
}

function ComingSoon() {
  const upcoming = [
    {
      title: 'Getting started',
      body:
        'Your first scene, layers, the auto-layout model, and how keyframes ' +
        'target semantic properties.',
    },
    {
      title: 'CLI & MCP',
      body:
        'Install the CLI, render from the terminal, wire the MCP server ' +
        'into Claude Code or Codex. Reference for every flag and tool.',
    },
    {
      title: 'Features',
      body:
        '3D camera, multi-chapter exports, masks, effects, Figma import. ' +
        'What each one does and when to reach for it.',
    },
    {
      title: 'Architecture & contributing',
      body:
        'The load-bearing invariants: semantic keyframes, one-way data flow, ' +
        'scene → layout → render. How to contribute safely.',
    },
    {
      title: 'FAQ',
      body:
        'Common questions, troubleshooting, what works today vs. roadmap.',
    },
    {
      title: 'Release notes',
      body:
        'Per-version changes. Currently living in RELEASES.md on GitHub.',
    },
  ]

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-text">
        More docs, coming soon
      </h2>
      <p className="mt-3 text-[15px] leading-[1.6] text-text-muted">
        v0.1.0 is a research preview, and the docs are catching up.
        Here&rsquo;s what&rsquo;s queued. Until each lands, the source
        of truth is the GitHub repo —{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion"
          className="text-text underline hover:text-accent"
        >
          README
        </Link>
        ,{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/blob/main/AGENTS.md"
          className="text-text underline hover:text-accent"
        >
          AGENTS.md
        </Link>
        ,{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/blob/main/RELEASES.md"
          className="text-text underline hover:text-accent"
        >
          RELEASES.md
        </Link>
        ,{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/blob/main/CLAUDE.md"
          className="text-text underline hover:text-accent"
        >
          CLAUDE.md
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
        {upcoming.map((u) => (
          <div key={u.title} className="bg-bg p-5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="rounded-full border border-border-strong bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-text-subtle">
                Soon
              </span>
              <span className="text-[14px] font-semibold text-text">
                {u.title}
              </span>
            </div>
            <p className="text-[13px] leading-[1.55] text-text-muted">
              {u.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[13.5px] text-text-subtle">
        Have a doc you wish existed? Open an{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/issues/new"
          className="underline hover:text-text"
        >
          issue on GitHub
        </Link>{' '}
        — we prioritize docs by demand.
      </p>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span>hyper-motion · Apache 2.0 · v0.1.0 research preview</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="hover:text-text">
            Home
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
