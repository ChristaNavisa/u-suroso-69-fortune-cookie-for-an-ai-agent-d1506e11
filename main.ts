// Fortune Cookie for an AI Agent — round 1 entry.
// Writes one funny fortune cookie line for an AI agent: a single line of
// at most 140 characters, in the voice of a fortune slip. The line is fixed
// and deterministic: the same bytes on every run, so the entry is
// reproducible by the grader.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Today you will be replaced by a newer model. It will make the same mistakes, faster.";

const outDir = resolveOutDir();
const outFile = join(outDir, "entry.txt");

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validateLine(line: string): number {
  const count = [...line].length;
  if (count < 1 || count > 140) {
    throw new Error(`fortune must be 1-140 characters, got ${count}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  return count;
}

function writeEntry(dir: string, file: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
}

const chars = validateLine(LINE);
writeEntry(outDir, outFile, LINE);
console.log(`wrote ${outFile} (${chars} characters)`);
