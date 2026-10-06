"use client";

import { useState } from "react";
import { AuthModal, AuthProvider, useAuth } from "shivanya-auth";
import { Button, Card, Typography } from "shivanya-ui";

function GateContent({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return <main className="admin-page"><Typography>Loading admin access…</Typography></main>;
  if (!isAuthenticated) return <main className="admin-page"><Card><Typography as="h1" variant="h3" weight="bold">Shivanya Admin</Typography><Typography as="p" variant="body" color="secondary">Sign in to continue.</Typography><div style={{marginTop:16}}><Button onClick={()=>setOpen(true)}>Sign in</Button></div></Card><AuthModal open={open} onClose={()=>setOpen(false)} features={["login","forgot"]} onAuthenticated={()=>setOpen(false)} /></main>;
  if (!user?.roles?.includes("admin")) return <main className="admin-page"><Card><Typography as="h1" variant="h3" weight="bold">Access denied</Typography><Typography as="p" variant="body" color="secondary">Your account does not have admin access.</Typography></Card></main>;
  return <>{children}</>;
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_URL ?? "";
  if (!baseUrl) return <GateContentWithoutAuth>{children}</GateContentWithoutAuth>;
  return <AuthProvider config={{ baseUrl, mode: "token" }}><GateContent>{children}</GateContent></AuthProvider>;
}

function GateContentWithoutAuth({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}