import { rmSync } from "node:fs";
import { execSync, spawn } from "node:child_process";

function killPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();

    for (const line of out.split("\n")) {
      const match = line.trim().match(/\s(\d+)\s*$/);
      if (match) pids.add(match[1]);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
      } catch {
        // Process may already be gone.
      }
    }
  } catch {
    // No listeners on this port.
  }
}

console.log("Stopping dev servers on ports 3000/3001...");
killPort(3000);
killPort(3001);

try {
  rmSync(".next", { recursive: true, force: true });
  console.log("Removed .next cache");
} catch {
  console.warn("Could not fully remove .next — close other terminals and retry.");
}

spawn("npx", ["next", "dev"], { stdio: "inherit", shell: true });
