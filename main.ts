// The Excuse That Almost Works — make.fun entry
// Writes exactly one line to /output/entry.txt: the excuse a gamer texts
// the boss to skip work on GTA 6 launch week. A tired-manager judge picks
// the excuse it would almost believe.
//
// The excuse: "My keyboard died overnight and I'm typing this on my TV
// remote, can't do anything till the new one arrives"
// Why it wins: it is a real, specific, boring workplace detail (a dead
// keyboard) rather than a wild story, so a tired manager would almost
// believe it. The laugh comes from the excuse's own logic — the text
// proves itself, because it really is typed in a hurry on a TV remote,
// and the manager can picture it. It is a fresh angle (no dead
// grandmother, no flat tyre, no sudden fever), and it reads exactly like
// a hurried text: plain words, no setup, no explanation, no signature.
// The "almost" is the giveaway a manager would spot a second later —
// an on-screen keyboard exists — but for one line, it almost works.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "My keyboard died overnight and I'm typing this on my TV remote, can't do anything till the new one arrives";

// Limits from the kit rules: 1-140 characters, exactly one line,
// at most 20 words. Named constants so the validation messages and
// the checks can never drift apart.
const MAX_CHARS = 140;
const MAX_WORDS = 20;

function validateExcuse(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const words = text.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    throw new Error(`entry must be at most ${MAX_WORDS} words, got ${words}`);
  }
}

validateExcuse(EXCUSE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EXCUSE, "utf8");
console.log(`wrote ${JSON.stringify(EXCUSE)} to ${outPath}`);
