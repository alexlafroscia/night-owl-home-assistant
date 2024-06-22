import { NIGHT_OWL_THEME, build } from "./build.ts";

const onDisk = new TextDecoder().decode(await Deno.readFile(NIGHT_OWL_THEME));
const current = await build();

if (current === onDisk) {
  console.log(`✅ Theme up-to-date`);
} else {
  console.log(`❌ Theme is outdated; run \`deno task build\``);
  Deno.exit(1);
}
