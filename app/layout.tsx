import "./globals.css";
import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Providers } from "./provider";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "مقارئ السفرة",
  description: "الموقع الرسمي لمقارئ السفرة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
