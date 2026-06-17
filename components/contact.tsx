"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-full max-w-[56rem]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <div className="bg-white dark:bg-[#141414] rounded-2xl border border-black/5 dark:border-white/5 p-6 md:p-8">
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Reach me directly at{" "}
          <a
            className="text-[#ff6b2b] hover:underline"
            href="mailto:jadentellis11@gmail.com"
          >
            jadentellis11@gmail.com
          </a>{" "}
          or use the form below.
        </p>

        <form
          className="flex flex-col gap-3"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Email sent successfully!");
          }}
        >
          <input
            className="h-12 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/8 text-gray-900 dark:text-[#ededed] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-[#ff6b2b]/50 transition-colors text-sm"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
          />
          <textarea
            className="h-44 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/8 text-gray-900 dark:text-[#ededed] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-[#ff6b2b]/50 transition-colors resize-none text-sm"
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
          />
          <div className="flex justify-end">
            <SubmitBtn />
          </div>
        </form>
      </div>
    </motion.section>
  );
}
