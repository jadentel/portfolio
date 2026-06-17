import Link from "next/link";
import HPLatticeViewer from "@/components/HPLatticeViewer";

const pipeline = [
  {
    step: "01",
    name: "2D HP Lattice Model",
    short: "Problem Encoding",
    description:
      "A protein is encoded as a self-avoiding walk on a 2D grid, with each residue labelled Hydrophobic (H) or Polar (P). Fitness is the negative number of non-sequential H–H contacts (Lau & Dill / Unger & Moult) — more buried hydrophobic contacts means lower energy and a more stable, native-like fold.",
  },
  {
    step: "02",
    name: "Genetic Algorithm",
    short: "Evolutionary Search",
    description:
      "A population of folds is evolved with tournament selection and single-point crossover, plus three problem-specific mutation operators — directed, corner-flip and crankshaft — designed for the lattice. Together they escape local minima and reshape folds locally and globally while keeping every conformation valid.",
  },
  {
    step: "03",
    name: "Bayesian Optimisation",
    short: "Automatic Tuning",
    description:
      "A Gaussian-Process surrogate with an Expected-Improvement acquisition function automatically tunes the GA's hyperparameters — population size, mutation rate and crossover rate. This replaces manual trial-and-error with a sample-efficient, confidence-aware search over the noisy fitness landscape.",
  },
  {
    step: "04",
    name: "Testing & Validation",
    short: "Correctness",
    description:
      "Every operator is unit-tested for chain validity and no-overlap, with before/after lattice renderings as human-verifiable proofs. The pipeline reproduces Unger & Moult's published −9 benchmark exactly, then extends it to sequences up to 85 residues.",
  },
];

// Table 4.1 — target energy vs GA+Bayes vs the Unger & Moult (1993) baseline.
const energy = [
  { len: 20, optimal: -9, gaBayes: -9, baseline: -9 },
  { len: 24, optimal: -9, gaBayes: -9, baseline: -9 },
  { len: 25, optimal: -9, gaBayes: -10, baseline: -8, beats: true },
  { len: 36, optimal: -14, gaBayes: -14, baseline: -14 },
  { len: 48, optimal: -22, gaBayes: -22, baseline: -22 },
  { len: 50, optimal: -21, gaBayes: -21, baseline: -21 },
  { len: 60, optimal: -34, gaBayes: -34, baseline: -34 },
  { len: 64, optimal: -42, gaBayes: -39, baseline: -37, beats: true },
  { len: 85, optimal: -52, gaBayes: -48, baseline: null },
];

// Table 4.2 — mean unique conformations, No-Bayes vs With-Bayes.
const diversity = [
  { len: 20, no: 4524, yes: 8123 },
  { len: 24, no: 7112, yes: 13392 },
  { len: 48, no: 41708, yes: 83748 },
  { len: 60, no: 38037, yes: 59038 },
  { len: 85, no: 74586, yes: 78066 },
];
const diversityMax = 90000;

const stats = [
  { value: "20–60", label: "sequence lengths that hit the known optimal energy" },
  { value: "≈10×", label: "fewer fitness evaluations than the 1993 baseline (≈26k vs 301k at length 36)" },
  { value: "+100.8%", label: "more unique conformations explored with Bayesian tuning (length 48)" },
  { value: "1/5 → 4/5", label: "success rate on length-60 folds with Bayesian guidance" },
];

export default function ProteinFoldingPage() {
  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-[#ff6b2b] transition-colors mb-10"
      >
        ← Back to portfolio
      </Link>

      {/* Title block */}
      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-[#ff6b2b] mb-2">
          Individual Project · COMP3931 · University of Leeds · 2024/25
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          Integrating Genetic Algorithms with Bayesian Inference for Protein Folding
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          My BSc dissertation tackles protein structure prediction — an NP-hard problem — on the
          2D Hydrophobic–Polar (HP) lattice model. I built a Genetic Algorithm that evolves protein
          folds to minimise energy, then wrapped it in a Bayesian Optimisation loop that
          automatically tunes its hyperparameters. The result matches or beats a classic 1993
          benchmark while using up to an order of magnitude fewer evaluations.
        </p>
      </div>

      {/* Lattice visual */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          The folding problem, visualised
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 max-w-3xl">
          Each protein is a chain on a grid. The GA searches for the fold that buries the most
          hydrophobic (H) residues against each other — the dashed bonds below are the non-sequential
          H–H contacts the energy function rewards. Here a clean fold buries its hydrophobic core,
          reaching an energy of E = −6.
        </p>
        <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 h-[26rem] shadow-xl">
          <HPLatticeViewer />
        </div>
      </div>

      {/* Pipeline */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">How it works</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {pipeline.map((stage) => (
            <div
              key={stage.step}
              className="bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 rounded-xl p-5 hover:border-[#ff6b2b]/30 transition-colors duration-200"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="font-black text-2xl text-[#ff6b2b] leading-none select-none tabular-nums shrink-0">
                  {stage.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                    {stage.name}
                  </p>
                  <p className="text-xs text-[#ff6b2b] font-mono uppercase tracking-wider">
                    {stage.short}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Headline improvements */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          What the Bayesian tuning bought
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 rounded-xl p-5"
            >
              <p className="text-2xl sm:text-3xl font-black text-[#ff6b2b] tabular-nums leading-none mb-2">
                {s.value}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diversity chart */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Conformational diversity
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6 max-w-3xl">
          Mean number of unique folds explored per run. Bayesian-guided sampling rewards
          under-explored regions of the search space, keeping the population diverse and avoiding
          premature convergence — most dramatically at length 48 (+100.8%).
        </p>
        <div className="bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 rounded-2xl p-6">
          {/* legend */}
          <div className="flex items-center gap-5 mb-6">
            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="w-3 h-3 rounded-sm bg-gray-300 dark:bg-white/20" /> No-Bayes
            </span>
            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="w-3 h-3 rounded-sm bg-[#ff6b2b]" /> With-Bayes
            </span>
          </div>
          <div className="flex items-end justify-around gap-3 sm:gap-8 h-56">
            {diversity.map((d) => (
              <div key={d.len} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="flex items-end gap-1.5 sm:gap-2 w-full justify-center h-full">
                  <div
                    className="w-4 sm:w-7 rounded-t bg-gray-300 dark:bg-white/20"
                    style={{ height: `${(d.no / diversityMax) * 100}%` }}
                    title={`No-Bayes: ${d.no.toLocaleString()}`}
                  />
                  <div
                    className="w-4 sm:w-7 rounded-t bg-[#ff6b2b]"
                    style={{ height: `${(d.yes / diversityMax) * 100}%` }}
                    title={`With-Bayes: ${d.yes.toLocaleString()}`}
                  />
                </div>
                <span className="text-[0.65rem] font-mono text-gray-500 dark:text-gray-500">
                  len {d.len}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Energy results table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Energy vs the 1993 benchmark
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-5 max-w-3xl">
          Lower (more negative) energy is a better fold. GA+Bayes matches the known optimum from
          length 20 to 60, and beats the Unger &amp; Moult (1993) genetic algorithm outright at
          lengths 25 and 64 (highlighted).
        </p>
        <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white dark:bg-[#141414] border-b border-black/5 dark:border-white/5">
                <th className="text-left px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  Length
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  Optimal
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  GA + Bayes
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  Unger &amp; Moult (1993)
                </th>
              </tr>
            </thead>
            <tbody>
              {energy.map((r, i) => (
                <tr
                  key={r.len}
                  className={`${i < energy.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""} ${
                    r.beats ? "bg-[#ff6b2b]/5" : "bg-white/50 dark:bg-[#141414]/50"
                  }`}
                >
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{r.len}</td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 font-mono">
                    {r.optimal}
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-mono font-semibold ${
                      r.beats ? "text-[#ff6b2b]" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {r.gaBayes}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 font-mono">
                    {r.baseline ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/5 dark:border-white/5 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <a
          href="https://github.com/jadentel/GeneticAlgorithm-2.0"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-[#ff6b2b] transition-colors"
        >
          View source on GitHub →
        </a>
        <Link
          href="/#projects"
          className="text-sm text-gray-500 dark:text-gray-500 hover:text-[#ff6b2b] transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}
