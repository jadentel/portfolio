"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const ReconstructionViewer = dynamic(
  () => import("@/components/ReconstructionViewer"),
  { ssr: false }
);

const pipeline = [
  {
    step: "01",
    name: "Depth Anything V3",
    short: "Dense Metric Depth",
    description:
      "DA3 (da3nested-giant-large) estimates per-pixel metric depth for every frame. A sliding window of 128 frames (stride 64) aligned via Procrustes / Sim3 produces a globally consistent depth sequence from a single RGB video — no depth sensor required.",
  },
  {
    step: "02",
    name: "CoTracker3",
    short: "Long-Range 2D Tracking",
    description:
      "CoTracker3 (online mode) tracks a dense grid of 2D points across hundreds of frames, continuously renewing tracks as points leave view. This yields correspondences that span the full sequence — far longer than typical optical flow.",
  },
  {
    step: "03",
    name: "IRLS + Bundle Adjustment",
    short: "Geometric Optimisation",
    description:
      "An IRLS rigidity filter first rejects dynamic or outlier tracks. Then Huber-robust global bundle adjustment jointly refines camera poses and scale-corrected depth maps across the whole sequence, minimising reprojection error.",
  },
  {
    step: "04",
    name: "Open3D TSDF Fusion",
    short: "Volumetric Reconstruction",
    description:
      "Refined depth maps and poses are fused into an Open3D ScalableTSDFVolume. Marching cubes extracts a textured mesh; coloured point clouds are exported for inspection — a dense, metric-scale reconstruction from an ordinary phone video.",
  },
];

const results = [
  { dataset: "Replica", score5: "71.0%", score15: "88.3%", ate: "1.56 cm" },
  { dataset: "ScanNet", score5: "35.8%", score15: "–", ate: "–" },
  { dataset: "Tanks & Temples", score5: "51.7%", score15: "86.0%", ate: "–" },
];

export default function ReconstructionPage() {
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
          Group Project · COMP5530 · University of Leeds · 2026
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          3D Reconstruction using Hybrid Depth &amp; Tracking
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          A training-free, monocular pipeline that turns a single smartphone video into a dense
          textured mesh — no depth sensor, no multi-camera rig. We combine state-of-the-art depth
          estimation, long-range point tracking, and robust geometric optimisation to produce
          metric-scale reconstructions competitive with sensor-based approaches.
        </p>
      </div>

      {/* Side-by-side videos */}
      <div className="mb-14 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl flex flex-col">
          <div className="bg-black/80 px-4 py-2 shrink-0">
            <p className="text-xs font-mono text-[#ff6b2b] uppercase tracking-wider">
              Stage 01 · Depth Anything V3
            </p>
            <p className="text-[0.6rem] text-gray-500 font-mono mt-0.5">
              Per-frame metric depth estimation
            </p>
          </div>
          <div className="relative flex-1 min-h-[16rem] bg-black">
            <video
              src="/office0_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl flex flex-col">
          <div className="bg-black/80 px-4 py-2 shrink-0">
            <p className="text-xs font-mono text-[#ff6b2b] uppercase tracking-wider">
              Stage 02 · CoTracker3
            </p>
            <p className="text-[0.6rem] text-gray-500 font-mono mt-0.5">
              Long-range 2D tracks after IRLS filter
            </p>
          </div>
          <div className="relative flex-1 min-h-[16rem] bg-black">
            <video
              src="/cotracker_tracks.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Replica viewer */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Interactive Reconstruction
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          Replica office0 benchmark scene — drag to orbit, scroll to zoom. Toggle between point
          cloud and mesh.
        </p>
        <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 h-[30rem] shadow-xl">
          <ReconstructionViewer
            pcdUrl="/office0_pcd.ply"
            meshUrl="/office0_mesh.ply"
            videoSrc="/office0_video.mp4"
            videoLabel="DA3 depth"
            sceneLabel="Replica · office0"
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </div>
      </div>

      {/* IRL Ripley viewer */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-black/5 dark:bg-white/5" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b2b]">
            IRL demo
          </span>
          <div className="h-px flex-1 bg-black/5 dark:bg-white/5" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          Reconstructed from a handheld phone video — no depth sensor, no controlled environment.
        </p>
        <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 h-[30rem] shadow-xl">
          <ReconstructionViewer
            meshUrl="/ripley_mesh.ply"
            videoSrc="/ripley_input.mp4"
            videoLabel="Source video"
            sceneLabel="Ripley · IRL"
            rotation={[Math.PI / 2 + Math.PI / 4, -Math.PI / 4, 0]}
          />
        </div>
      </div>

      {/* Pipeline */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Pipeline overview</h2>
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

      {/* Results */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benchmark results</h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-5">
          F-Score@5cm / F-Score@15cm — proportion of reconstructed points within 5 cm / 15 cm of
          ground truth. Higher is better.
        </p>
        <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white dark:bg-[#141414] border-b border-black/5 dark:border-white/5">
                <th className="text-left px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  Dataset
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  F-Score@5cm
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  F-Score@15cm
                </th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  Mean ATE
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={r.dataset}
                  className={`${i < results.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""} bg-white/50 dark:bg-[#141414]/50`}
                >
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                    {r.dataset}
                  </td>
                  <td className="px-5 py-3 text-right text-[#ff6b2b] font-mono font-semibold">
                    {r.score5}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 font-mono">
                    {r.score15}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 font-mono">
                    {r.ate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/5 dark:border-white/5 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
          Sai Arunkumar · Hitang Desai · Muhammad-Abdullah Kashif-Khan · Jaden Tellis ·
          Laleendteshwaran Vigneshwaran
        </p>
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
