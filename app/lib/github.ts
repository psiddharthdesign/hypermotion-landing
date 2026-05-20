// SPDX-License-Identifier: Apache-2.0

/**
 * GitHub release + commit fetchers for the landing site.
 *
 * Used by `app/page.tsx` (hero / footer version chip) and
 * `app/changelog/page.tsx` (full release history). All calls run inside
 * server components, so the GitHub API key — if we ever need one to lift
 * the unauthenticated 60 req/hr rate limit — would live as a server env
 * var, never shipped to the client.
 *
 * Caching: Next.js fetch's `revalidate` option re-runs the request at most
 * once per the given interval. With our static-ish landing site, an hour
 * is plenty — new releases land within an hour of being published, no
 * code change needed. Cloudflare Pages + Next.js honors this on builds
 * triggered by deploy hooks; local dev hits the network every reload.
 *
 * Graceful failure: every fetcher returns a sane fallback when the API
 * is unreachable or rate-limited so the landing site still renders.
 * Don't throw — a 404 on changelog or a missing version chip is much
 * worse than a slightly-stale page.
 */

const OWNER = 'psiddharthdesign'
const REPO = 'hypermotion'
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`

// Re-fetch at most once per hour. New release → at most 1h delay before
// the landing page picks it up. Lower this to a few minutes if release
// cadence speeds up.
const REVALIDATE_SECONDS = 60 * 60

export interface GithubRelease {
  /** Tag name, e.g. "v0.1.9". */
  tag: string
  /** Release name (often same as tag, but can be customized). */
  name: string
  /** Markdown body of the release notes. May be empty. */
  body: string
  /** ISO 8601 publish timestamp. */
  publishedAt: string
  /** Web URL to the release page on GitHub. */
  htmlUrl: string
  /** True when GitHub flagged this as a pre-release. */
  prerelease: boolean
}

/**
 * Fetch the latest published release. Used by the landing page's hero
 * kicker + footer version line. Returns null when the API is
 * unreachable; callers should fall back to a default string in that
 * case (e.g. "Open source").
 */
export async function getLatestRelease(): Promise<GithubRelease | null> {
  try {
    const res = await fetch(`${API_BASE}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return null
    const data = (await res.json()) as RawRelease
    return normalizeRelease(data)
  } catch {
    return null
  }
}

/**
 * Fetch the full release history, newest first. Used by the changelog
 * page. Returns an empty array on API failure so the page can still
 * render its header and a "no releases available" notice.
 */
export async function getAllReleases(): Promise<GithubRelease[]> {
  try {
    // `per_page=100` is the GitHub max; covers many releases in one
    // call. If we ever pass 100 releases, paginate via the Link header.
    const res = await fetch(`${API_BASE}/releases?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return []
    const data = (await res.json()) as RawRelease[]
    return data.map(normalizeRelease)
  } catch {
    return []
  }
}

/**
 * Raw shape from the GitHub API. Locally typed instead of pulling
 * @octokit/types so the landing site keeps zero runtime dependencies
 * outside of Next.
 */
interface RawRelease {
  tag_name: string
  name: string | null
  body: string | null
  published_at: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

function normalizeRelease(raw: RawRelease): GithubRelease {
  return {
    tag: raw.tag_name,
    name: raw.name || raw.tag_name,
    body: raw.body || '',
    publishedAt: raw.published_at,
    htmlUrl: raw.html_url,
    prerelease: raw.prerelease,
  }
}

/**
 * Compact display string for the version chip. Strips any leading 'v'
 * and re-adds it lowercase for visual consistency ("v0.1.9", not
 * "V0.1.9" or "0.1.9"). Falls back to a generic label when no release
 * is available so the chip never goes blank.
 */
export function formatVersionLabel(release: GithubRelease | null): string {
  if (!release) return 'Research preview'
  const tag = release.tag.replace(/^v/i, '')
  return `v${tag}`
}

/**
 * Friendly relative-time string for the changelog ("2 days ago",
 * "3 weeks ago"). Pure function, no Intl.RelativeTimeFormat dep —
 * keeps bundle tiny + avoids locale surprises.
 */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (!Number.isFinite(then)) return ''
  const now = Date.now()
  const diffSec = Math.max(0, Math.round((now - then) / 1000))
  const day = 60 * 60 * 24
  if (diffSec < 60) return 'just now'
  if (diffSec < 60 * 60) {
    const m = Math.round(diffSec / 60)
    return `${m} minute${m === 1 ? '' : 's'} ago`
  }
  if (diffSec < day) {
    const h = Math.round(diffSec / 3600)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  if (diffSec < day * 30) {
    const d = Math.round(diffSec / day)
    return `${d} day${d === 1 ? '' : 's'} ago`
  }
  if (diffSec < day * 365) {
    const m = Math.round(diffSec / (day * 30))
    return `${m} month${m === 1 ? '' : 's'} ago`
  }
  const y = Math.round(diffSec / (day * 365))
  return `${y} year${y === 1 ? '' : 's'} ago`
}

/**
 * Absolute date string for the changelog ("May 18, 2026"). Used next
 * to the relative time so users can see the actual date when hovering.
 */
export function formatAbsoluteDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
