import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { AdminAuthGate } from "@/components/AdminAuthGate";
import "./globals.css";

export const metadata = { title: "Shivanya Admin", description: "Administration and analytics workspace for the Shivanya ecosystem." };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><Providers><AdminAuthGate>{children}</AdminAuthGate></Providers></body></html>;
}