"use client";

import type { ReactNode } from "react";
import { ShellProvider } from "shivanya-shell";
import "shivanya-ui/styles";
import "shivanya-shell/styles";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellProvider>{children}</ShellProvider>
      </body>
    </html>
  );
}