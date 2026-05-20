// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link'
import type { Metadata } from 'next'
import {
  formatAbsoluteDate,
  formatRelativeTime,
  formatVersionLabel,
  getAllReleases,
  getLatestRelease,
  type GithubRelease,
} from '../lib/github'

/**
 * Changelog page.
 *
 * Server component that fetches every release from
 * github.com/psiddharthdesign/hypermotion at build time (1-hour
 * revalidate, see `app/lib/github.ts`). Each release renders as a
 * stacked card: version tag, publish date, full markdown body of the
 * release notes.
 *
 * Why server-fetched and not statically baked: shipping a new release
 * shouldn't require touching the landing site repo. Tag → workflow
 * → release published → next page request (or next 1h revalidate)
 * picks it up. Same path the home page version chip uses.
 *
 * Markdown rendering: deliberately a tiny inline parser instead of
 * pulling in marked / remark / react-markdown. The release notes we
 * write are simple (headings, bullet lists, inline code, paragraphs)
 * and a dependency-free render keeps the bundle truly zero outside
 * Next itself.
 */

export const metadata: Metadata = {
  title: 'Changelog — hyper-motion',
  description:
    "Release history for hyper-motion. Auto-updates from the project's GitHub releases — new versions appear within an hour of publishing.",
}

export default async function ChangelogPage() {
  const [releases, latest] = await Promise.all([
    getAllReleases(),
    getLatestRelease(),
  ])
  const latestTag = latest?.tag ?? null

  return (
    <main className="min-h-screen">
      <Nav />
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-20 sm:pt-28">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
          Changelog
        </p>
        <h1 className="max-w-2xl text-balance text-[36px] font-semibold leading-[1.1] tracking-tight text-text sm:text-[48px]">
          What shipped, when.
        </h1>
        <p className="mt-6 max-w-xl text-[15.5px] leading-[1.55] text-text-muted">
          Auto-synced from the{' '}
          <Link
            href="https://github.com/psiddharthdesign/hypermotion/releases"
            className="underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
          >
            GitHub releases
          </Link>{' '}
          page. New versions appear here within an hour of publishing.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32">
        {releases.length === 0 ? (
          <EmptyState />
        ) : (
          <ol className="space-y-10">
            {releases.map((release) => (
              <li key={release.tag}>
                <ReleaseCard
                  release={release}
                  isLatest={release.tag === latestTag}
                />
              </li>
            ))}
          </ol>
        )}
      </section>

      <Footer />
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
          className="px-3 py-1.5 font-medium text-text"
          aria-current="page"
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

function ReleaseCard({
  release,
  isLatest,
}: {
  release: GithubRelease
  isLatest: boolean
}) {
  const version = formatVersionLabel(release)
  return (
    <article className="rounded-2xl border border-border bg-white p-7 sm:p-9">
      <header className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="text-[22px] font-semibold tracking-tight text-text sm:text-[26px]">
          {version}
        </h2>
        {isLatest && (
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            Latest
          </span>
        )}
        {release.prerelease && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-amber-700">
            Pre-release
          </span>
        )}
        <span
          className="text-[12.5px] text-text-subtle"
          title={formatAbsoluteDate(release.publishedAt)}
        >
          {formatRelativeTime(release.publishedAt)}
          <span className="mx-1.5 text-text-subtle/50">·</span>
          {formatAbsoluteDate(release.publishedAt)}
        </span>
      </header>

      {release.body ? (
        <Markdown source={release.body} />
      ) : (
        <p className="text-[14px] text-text-subtle">
          No release notes for this version.
        </p>
      )}

      <footer className="mt-6 border-t border-border pt-4">
        <Link
          href={release.htmlUrl}
          className="text-[12.5px] text-text-subtle underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
        >
          View on GitHub →
        </Link>
      </footer>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
      <p className="text-[15px] font-medium text-text">
        Couldn’t reach GitHub right now.
      </p>
      <p className="mt-2 text-[13.5px] text-text-muted">
        The release history is fetched from the GitHub API. Try{' '}
        <Link
          href="https://github.com/psiddharthdesign/hypermotion/releases"
          className="underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
        >
          the source page directly
        </Link>{' '}
        if this keeps happening.
      </p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-8 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span>hyper-motion · Apache 2.0</span>
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

/**
 * Tiny, intentional markdown renderer.
 *
 * Handles the subset we actually use in release notes:
 *   - ATX headings (#, ##, ###)
 *   - Unordered lists (- or *)
 *   - Paragraphs (blank line as separator)
 *   - Inline code (`code`)
 *   - Bold (**bold**)
 *   - Links ([text](url))
 *
 * Anything more exotic (tables, footnotes, HTML embeds) gets passed
 * through as plain text. Keeps the bundle dependency-free; release
 * notes that need richer rendering can link out to the GitHub page.
 */
function Markdown({ source }: { source: string }) {
  const blocks = parseBlocks(source.trim())
  return (
    <div className="space-y-4 text-[14.5px] leading-[1.65] text-text-muted">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

interface MdBlock {
  kind: 'h1' | 'h2' | 'h3' | 'paragraph' | 'list'
  // For headings / paragraph: the raw line(s) joined with a space.
  // For list: each bullet's content.
  lines: string[]
}

function parseBlocks(source: string): MdBlock[] {
  const lines = source.split(/\r?\n/)
  const blocks: MdBlock[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') {
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ kind: 'h3', lines: [line.slice(4)] })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', lines: [line.slice(3)] })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ kind: 'h1', lines: [line.slice(2)] })
      i++
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      const bullets: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        bullets.push(lines[i].replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push({ kind: 'list', lines: bullets })
      continue
    }
    // Paragraph — accumulate consecutive non-blank, non-heading,
    // non-list lines.
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !/^[-*]\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      blocks.push({ kind: 'paragraph', lines: [paraLines.join(' ')] })
    }
  }
  return blocks
}

function renderBlock(block: MdBlock, key: number): React.ReactNode {
  if (block.kind === 'h1') {
    return (
      <h3
        key={key}
        className="mt-6 text-[16px] font-semibold tracking-tight text-text"
      >
        {renderInline(block.lines[0])}
      </h3>
    )
  }
  if (block.kind === 'h2') {
    return (
      <h4
        key={key}
        className="mt-5 text-[15px] font-semibold tracking-tight text-text"
      >
        {renderInline(block.lines[0])}
      </h4>
    )
  }
  if (block.kind === 'h3') {
    return (
      <h5
        key={key}
        className="mt-4 text-[14px] font-semibold tracking-tight text-text"
      >
        {renderInline(block.lines[0])}
      </h5>
    )
  }
  if (block.kind === 'list') {
    return (
      <ul key={key} className="ml-5 list-disc space-y-1.5">
        {block.lines.map((bullet, j) => (
          <li key={j}>{renderInline(bullet)}</li>
        ))}
      </ul>
    )
  }
  return <p key={key}>{renderInline(block.lines[0])}</p>
}

/**
 * Inline tokenizer: turns a plain string into React nodes, handling
 * **bold**, `code`, and [text](url). Naive left-to-right scan — good
 * enough for release notes, doesn't attempt to nest formatting (no
 * **bold `code`** etc.) because we don't write that.
 */
function renderInline(text: string): React.ReactNode {
  // Single regex with named alternatives — each capture group identifies
  // which kind of token matched.
  const tokenRegex =
    /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const tok = match[0]
    if (tok.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-text">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith('`')) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px] text-text"
        >
          {tok.slice(1, -1)}
        </code>,
      )
    } else if (tok.startsWith('[')) {
      const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        nodes.push(
          <Link
            key={key++}
            href={href}
            className="underline decoration-text-subtle/40 underline-offset-[3px] hover:text-text"
          >
            {label}
          </Link>,
        )
      } else {
        nodes.push(tok)
      }
    }
    lastIndex = match.index + tok.length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}
