# Keep the `u` prefix when moving to Tailwind 4

Tailwind 4 changes prefix syntax from `u-flex` to `u:flex`, which touches every class string in the library. We adopt `u:` rather than drop the prefix, because the library is embedded in host pages that may define their own utilities, and the prefix is what prevents collisions. Relying on Scope isolation alone would only protect the reset, not utility names.
