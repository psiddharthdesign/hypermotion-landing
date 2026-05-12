/**
 * PostCSS config for Tailwind v4. The new `@tailwindcss/postcss` plugin
 * replaces the old `tailwindcss` + `autoprefixer` chain — Tailwind v4
 * handles its own prefixing internally.
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
