"use client";

import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex items-center gap-2 bg-[#ff6b2b] text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#e85a1e] transition-all hover:scale-105 active:scale-100 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
      ) : (
        <>
          Send message{" "}
          <FaPaperPlane className="text-xs transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}
