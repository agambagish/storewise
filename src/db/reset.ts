/** biome-ignore-all lint/suspicious/noConsole: _ */

import { reset } from "drizzle-seed";

import { db } from "@/db";
import * as schema from "@/db/schema";

(async () => {
  try {
    await reset(db, schema);
    console.log("DB has been reset ✅");
    process.exit(0);
  } catch {
    console.error("❌ Unable to reset DB");
    process.exit(1);
  }
})();
