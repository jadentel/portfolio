"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-white dark:bg-[#1a1a1a] w-[2.75rem] h-[2.75rem] border border-black/10 dark:border-white/10 shadow-lg rounded-full flex items-center justify-center hover:scale-110 hover:border-[#ff6b2b]/50 active:scale-100 transition-all text-gray-600 dark:text-gray-400 hover:text-[#ff6b2b]"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
