import * as path from "node:path";

import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import { color, ui } from "night-owl-palette";

export const TEMPLATE_DIR = path.resolve(import.meta.dirname!, "../templates");
export const THEME_DIR = path.resolve(import.meta.dirname!, "../themes");

export const NIGHT_OWL_TEMPLATE = path.resolve(
  TEMPLATE_DIR,
  "./night_owl.yaml",
);
export const NIGHT_OWL_THEME = path.resolve(THEME_DIR, "./night_owl.yaml");

export function build() {
  const eta = new Eta({ views: TEMPLATE_DIR });

  return eta.renderAsync("night_owl.yaml", {
    color,
    ui,
  });
}

export function write(nightOwlContent: string) {
  const encoder = new TextEncoder();
  const nightOwlBuffer = encoder.encode(nightOwlContent);

  return Deno.writeFile(
    path.resolve(THEME_DIR, "night_owl.yaml"),
    nightOwlBuffer,
  );
}

if (import.meta.main) {
  await write(await build());
}
