import fs from "fs";
import path from "path";

type BoundaryFinding = {
  file: string;
  line: number;
  term: string;
  text: string;
};

const repoRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(repoRoot, "src");

const recommendationTerms = [
  "recommendation",
  "recommend",
  "recommended",
  "bestOption",
  "best option",
  "ranking",
  "rank",
  "score",
  "suitability",
  "priority",
  "estimatedSaving",
  "estimatedCost",
];

const contractPurityTerms = [
  "simulation",
  "simulate",
  "recommendation",
  "recommendedOption",
  "pricing",
  "price",
  "productRecommendation",
  "product selection",
  "manufacturer selection",
];

const contractPurityGuardrailFiles = new Set([
  path.join("src", "serviceModel", "serviceModel.ts"),
]);

const sourceFiles = (root: string): string[] => {
  if (!fs.existsSync(root)) {
    return [];
  }

  const files: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...sourceFiles(absolute));
    } else if (entry.isFile() && /\.(ts|json)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) {
      files.push(absolute);
    }
  }
  return files;
};

const findTerms = (files: string[], terms: string[]): BoundaryFinding[] => {
  const normalizedTerms = terms.map((term) => ({
    raw: term,
    normalized: term.toLowerCase(),
  }));

  return files.flatMap((file) => {
    const relative = path.relative(repoRoot, file);
    return fs
      .readFileSync(file, "utf8")
      .split(/\r?\n/)
      .flatMap((line, index) => {
        if (/^\s*\/\//.test(line)) {
          return [];
        }
        const normalizedLine = line.toLowerCase();
        return normalizedTerms
          .filter((term) => normalizedLine.includes(term.normalized))
          .map((term) => ({
            file: relative,
            line: index + 1,
            term: term.raw,
            text: line.trim(),
          }));
      });
  });
};

describe("Constitutional boundary: Recommendation Boundary", () => {
  it("does not expose recommendation-oriented concepts from Contracts", () => {
    const publicSurfaceFiles = [
      path.join(srcRoot, "index.ts"),
      ...sourceFiles(path.join(srcRoot, "recommendations")),
      path.join(srcRoot, "fixtures", "fixture.ts"),
      path.join(srcRoot, "fixtures", "composition", "order.ts"),
    ].filter((file) => fs.existsSync(file));

    const findings = findTerms(publicSurfaceFiles, recommendationTerms);

    expect(findings).toEqual([]);
  });
});

describe("Constitutional boundary: Contract Purity", () => {
  it("does not contain simulation, recommendation, pricing, or product-selection logic in Contracts source", () => {
    const files = sourceFiles(srcRoot).filter((file) => {
      const relative = path.relative(repoRoot, file);
      return !contractPurityGuardrailFiles.has(relative);
    });

    const findings = findTerms(files, contractPurityTerms);

    expect(findings).toEqual([]);
  });
});

describe("Constitutional boundary: System Twin Coverage", () => {
  it.todo(
    "can represent Solar PV, Battery, EV Charger, Air Conditioning, Consumer Unit, and MVHR without special-case architecture"
  );
});
