import { TEMPLATE_DIR, build, write } from "./build.ts";

// Perform an initial build
await write(await build());
console.log(`✅ Theme updated!`);

// Watch template directory and rebuild on change
const watcher = Deno.watchFs(TEMPLATE_DIR);

for await (const _event of watcher) {
  await write(await build());
  console.log(`✅ Theme updated!`);
}
