# Fonts

- `rupee-hind-600.woff2`: the rupee sign (U+20B9) only, cut from Hind SemiBold by Indian Type Foundry via the Google Fonts `text=` API. SIL Open Font License 1.1. Zalando Sans (loaded through `next/font/google`, OFL) has no rupee glyph, so this file is its per-glyph fallback (docs/DECISIONS.md FP-D35).

- `og/zalando-display.woff` (width 125, weight 720) and `og/zalando-text.woff` (width 100, weight 500): static Latin instances of Zalando Sans (OFL) for the generated Open Graph image, which cannot read woff2 or variable axes.
