import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Shivanya Admin",
  description: "Administration and analytics workspace for the Shivanya ecosystem."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}