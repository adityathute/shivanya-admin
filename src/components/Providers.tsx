"use client";

import type { ReactNode } from "react";
import { ShellProvider } from "shivanya-shell";
import "shivanya-ui/styles";
import "shivanya-shell/styles";

export function Providers({ children }: { children: ReactNode }) {
  return <ShellProvider>{children}</ShellProvider>;
}