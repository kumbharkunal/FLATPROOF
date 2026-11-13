/** Fills "{name}" placeholders in a content template: fill("Found {n} of {total}", { n: 2, total: 4 }). */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}
