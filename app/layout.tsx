import Header from "@/components/header";
import ThemeSwitch from "@/components/theme-switch";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Jaden Tellis | Personal Portfolio",
  description:
    "MEng Computer Science student at the University of Leeds. Full-stack developer with a focus on AI and web development.",
  openGraph: {
    title: "Jaden Tellis | Personal Portfolio",
    description:
      "MEng Computer Science student at the University of Leeds. Full-stack developer with a focus on AI and web development.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jaden Tellis | Personal Portfolio",
    description:
      "MEng Computer Science student at the University of Leeds. Full-stack developer with a focus on AI and web development.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth dark">
      <body
        className={`${inter.variable} font-sans relative pt-28 sm:pt-36`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <ThemeSwitch />
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
