"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "shivanya-shell";
import type { ShellNavItem } from "shivanya-shell";

const navigation: ShellNavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Organizations", href: "/organizations" },
  { label: "Users", href: "/users" },
  { label: "Applications", href: "/applications" },
  { label: "Activity", href: "/activity" },
  { label: "Events", href: "/events" },
  { label: "Pages", href: "/pages" },
  { label: "Analytics", href: "/analytics" },
  { label: "Server", href: "/server" },
  { label: "Settings", href: "/settings" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DashboardShell
      branding={{ name: "Shivanya Admin", subtitle: "Administration" }}
      navigation={navigation}
      pathname={pathname}
      linkComponent="a"
    >
      {children}
    </DashboardShell>
  );
}