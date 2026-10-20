# UI Lab

A published React component library (`@joonassandell/ui-lab`) with a Next.js app that showcases it. Components ship with their own precompiled stylesheet and must coexist with arbitrary host pages.

## Language

**Scope**:
The `.u-scope` container inside which the library's base (reset) styles apply. Nothing outside a Scope is touched by the library's reset.
_Avoid_: Root, wrapper, sandbox

**Prefix**:
The `u` namespace on every utility class (`u:flex`) and CSS custom property (`--u-*`) the library emits, which prevents collisions with host-page styles.
_Avoid_: Namespace, vendor prefix

**Dark theme**:
The appearance activated by the `.u-dark` class, which is the library's public hook for dark mode.
_Avoid_: Night mode, dark class

**Scale**:
The `.u-scale` mode that sizes the whole UI relative to the viewport width, used when the component is embedded in an iframe.
_Avoid_: Zoom, responsive mode
