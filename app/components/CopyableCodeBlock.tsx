// SPDX-License-Identifier: Apache-2.0

'use client'

import { useState } from 'react'

type CopyableCodeBlockProps = {
  code: string
  className?: string
  preClassName?: string
}

/**
 * Command/code block with an icon-only copy affordance.
 */
export function CopyableCodeBlock({
  code,
  className = '',
  preClassName = '',
}: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = code
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-border bg-white ${className}`}
    >
      <button
        type="button"
        onClick={copyCode}
        aria-label={copied ? 'Copied command' : 'Copy command'}
        title={copied ? 'Copied' : 'Copy'}
        className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-white text-text-muted opacity-0 transition hover:border-text-muted hover:text-text focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-text/20 group-hover:opacity-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre
        className={`overflow-x-auto p-4 pr-14 font-mono text-[13px] leading-relaxed text-text ${preClassName}`}
      >
        {code}
      </pre>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
