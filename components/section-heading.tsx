import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="inline-block w-1.5 h-7 bg-[#ff6b2b] rounded-full flex-shrink-0" />
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        {children}
      </h2>
    </div>
  );
}
