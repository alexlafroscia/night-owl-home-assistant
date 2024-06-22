import { build, TEMPLATE_DIR, write } from "./build.ts";

async function* throttle<T>(iter: AsyncIterable<T>, diff: number = 10) {
  let lastEmit: number = 0;

  for await (const i of iter) {
    const now = Date.now();

    if (now - lastEmit > diff) {
      lastEmit = now;
      yield i;
    }
  }
}

// Perform an initial build
await write(await build());
console.log(`✅ Theme updated!`);

// Watch template directory and rebuild on change
const watcher = Deno.watchFs(TEMPLATE_DIR);

for await (const _event of throttle(watcher)) {
  try {
    await write(await build());
    console.log(`✅ Theme updated!`);
  } catch (e) {
    console.log(`❌ Error compiling theme!`);
    console.error(e);
  }
}
