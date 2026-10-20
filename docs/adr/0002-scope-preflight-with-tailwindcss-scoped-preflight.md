# Scope preflight to `.u-scope` with `tailwindcss-scoped-preflight` v4

The library must not leak Tailwind's global reset into host pages. We import `tailwindcss/theme` and `tailwindcss/utilities` (not the full `tailwindcss`, which bundles global preflight) and apply `tailwindcss-scoped-preflight` v4 via `@plugin` with the `inside` strategy on `.u-scope`. We rejected a hand-written scoped reset because the plugin already covers v4 and tracks upstream preflight changes.

The v3 `body` line-height tweak (`modifyPreflightStyles`) is not available in v4 and not needed: the built `.u-scope` rule has `line-height: 1.5` in both versions. The manual `::before`/`::after` workaround was dropped because the v4 plugin scopes pseudo-elements itself.
