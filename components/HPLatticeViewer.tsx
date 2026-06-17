"use client";

import { motion } from "framer-motion";

type Cell = { x: number; y: number; h: boolean };

/**
 * A clean boustrophedon fold on the 2D HP lattice (sequence: P-H-H-P repeated).
 * The hydrophobic (H) residues collapse into a buried two-column core while the
 * polar (P) residues sit on the outside — the hydrophobic-collapse principle the
 * Genetic Algorithm is rewarded for discovering. Six non-sequential H–H contacts
 * give this fold an energy of E = −6.
 */
const SEQ: Cell[] = [
  { x: 0, y: 0, h: false }, // 0  P
  { x: 1, y: 0, h: true },  // 1  H
  { x: 2, y: 0, h: true },  // 2  H
  { x: 3, y: 0, h: false }, // 3  P
  { x: 3, y: 1, h: false }, // 4  P
  { x: 2, y: 1, h: true },  // 5  H
  { x: 1, y: 1, h: true },  // 6  H
  { x: 0, y: 1, h: false }, // 7  P
  { x: 0, y: 2, h: false }, // 8  P
  { x: 1, y: 2, h: true },  // 9  H
  { x: 2, y: 2, h: true },  // 10 H
  { x: 3, y: 2, h: false }, // 11 P
  { x: 3, y: 3, h: false }, // 12 P
  { x: 2, y: 3, h: true },  // 13 H
  { x: 1, y: 3, h: true },  // 14 H
  { x: 0, y: 3, h: false }, // 15 P
];

// Non-sequential H–H lattice contacts — the bonds the energy function rewards.
const CONTACTS: [number, number][] = [
  [1, 6], [6, 9], [9, 14],
  [2, 5], [5, 10], [10, 13],
];

const CELL = 64;
const PAD = 44;
const R = 15;
const px = (x: number) => PAD + x * CELL;
const py = (y: number) => PAD + y * CELL;
const SIZE = PAD * 2 + 3 * CELL;

const backbone = SEQ.map(
  (c, i) => `${i === 0 ? "M" : "L"} ${px(c.x)} ${py(c.y)}`
).join(" ");

export default function HPLatticeViewer() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-[#101010] dark:to-[#171717]">
      {/* faint lattice dot grid */}
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* caption */}
      <div className="absolute top-3 left-3 z-10">
        <p className="text-[0.55rem] font-mono uppercase tracking-widest text-[#ff6b2b]">
          2D HP lattice
        </p>
        <p className="text-[0.5rem] font-mono uppercase tracking-wider text-gray-500">
          hydrophobic core · E = −6
        </p>
      </div>

      {/* legend */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-[0.5rem] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#ff6b2b]" /> H · hydrophobic
        </span>
        <span className="flex items-center gap-1.5 text-[0.5rem] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full border border-gray-400 dark:border-white/30" /> P · polar
        </span>
      </div>

      <motion.svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative z-0 w-full h-full max-w-[20rem] max-h-[20rem] p-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* backbone chain */}
        <motion.path
          d={backbone}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-gray-300 dark:stroke-white/15"
          strokeWidth={5}
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* H–H contact bonds */}
        {CONTACTS.map(([a, b], i) => (
          <motion.line
            key={`c-${i}`}
            x1={px(SEQ[a].x)}
            y1={py(SEQ[a].y)}
            x2={px(SEQ[b].x)}
            y2={py(SEQ[b].y)}
            stroke="#ff6b2b"
            strokeWidth={2.5}
            strokeDasharray="3 5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.85, 0.45, 0.85] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 3,
              delay: 1.6 + i * 0.08,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* residues */}
        {SEQ.map((c, i) => (
          <motion.g
            key={`n-${i}`}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1 },
            }}
            transition={{ delay: 0.2 + i * 0.09, type: "spring", stiffness: 260, damping: 18 }}
            style={{ transformOrigin: `${px(c.x)}px ${py(c.y)}px` }}
          >
            <circle
              cx={px(c.x)}
              cy={py(c.y)}
              r={R}
              fill={c.h ? "#ff6b2b" : "transparent"}
              className={
                c.h
                  ? ""
                  : "fill-white dark:fill-[#141414] stroke-gray-400 dark:stroke-white/30"
              }
              strokeWidth={c.h ? 0 : 2}
            />
            <text
              x={px(c.x)}
              y={py(c.y)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={13}
              fontFamily="monospace"
              fontWeight={700}
              className={c.h ? "fill-white" : "fill-gray-500 dark:fill-gray-400"}
            >
              {c.h ? "H" : "P"}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
