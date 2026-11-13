// Motion tokens (docs/DESIGN.md). CSS mirrors these in :root and @theme.
export const DUR = { press: 0.12, ui: 0.22, open: 0.42, reveal: 0.7, draw: 0.9, lock: 0.38 } as const;
export const EASE = {
  out: [0.16, 1, 0.3, 1] as const, // expo.out
  inout: [0.65, 0, 0.35, 1] as const, // power2.inOut
  ui: [0.25, 1, 0.5, 1] as const, // power3.out
};
/** Exits run at 65% of the enter time. */
export const exit = (d: number) => d * 0.65;
