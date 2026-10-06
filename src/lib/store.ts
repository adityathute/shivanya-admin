import type { AdminState, Entity, RecordItem } from "./types";

const now = new Date().toISOString();

const seed = (): AdminState => ({
  organizations: [
    { id: "org-1", name: "ShivanyaMS", status: "active", createdAt: now, updatedAt: now },
    { id: "org-2", name: "Demo Organization", status: "active", createdAt: now, updatedAt: now }
  ],
  users: [
    { id: "user-1", name: "Aditya", email: "admin@shivanyams.com", status: "active", organization: "ShivanyaMS", createdAt: now, updatedAt: now },
    { id: "user-2", name: "Demo User", email: "demo@example.com", status: "active", organization: "Demo Organization", createdAt: now, updatedAt: now }
  ],
  applications: [
    { id: "app-1", name: "ShivanyaMS", status: "active", organization: "ShivanyaMS", createdAt: now, updatedAt: now },
    { id: "app-2", name: "Memory", status: "active", organization: "ShivanyaMS", createdAt: now, updatedAt: now }
  ],
  activity: [
    { id: "act-1", name: "Page viewed", type: "page_view", application: "ShivanyaMS", browser: "Chrome", device: "Desktop", country: "India", city: "Pune", isp: "Jio", ip: "192.0.2.10", createdAt: now, updatedAt: now },
    { id: "act-2", name: "Login", type: "login", application: "Memory", browser: "Chrome", device: "Mobile", country: "India", city: "Mumbai", isp: "Airtel", ip: "192.0.2.11", createdAt: now, updatedAt: now }
  ],
  events: [
    { id: "evt-1", name: "page_view", type: "page_view", application: "ShivanyaMS", value: 1, createdAt: now, updatedAt: now },
    { id: "evt-2", name: "login", type: "login", application: "Memory", value: 1, createdAt: now, updatedAt: now }
  ],
  pages: [
    { id: "page-1", name: "Home", path: "/", value: 120, createdAt: now, updatedAt: now },
    { id: "page-2", name: "Dashboard", path: "/dashboard", value: 82, createdAt: now, updatedAt: now },
    { id: "page-3", name: "Memory", path: "/memory", value: 61, createdAt: now, updatedAt: now }
  ],
  settings: { maintenance: false, refreshInterval: 30 }
});

let state: AdminState = seed();

export function getState(): AdminState {
  return state;
}

export function resetState() {
  state = seed();
}

export function listRecords(entity: Entity): RecordItem[] {
  return state[entity];
}

export function upsertRecord(entity: Entity, record: Omit<RecordItem, "createdAt" | "updatedAt"> & Partial<Pick<RecordItem, "createdAt" | "updatedAt">>) {
  const timestamp = new Date().toISOString();
  const existing = state[entity].find((item) => item.id === record.id);
  if (existing) Object.assign(existing, record, { updatedAt: timestamp });
  else state[entity].unshift({ ...record, createdAt: record.createdAt ?? timestamp, updatedAt: timestamp });
}

export function removeRecord(entity: Entity, id: string) {
  state[entity] = state[entity].filter((item) => item.id !== id);
}

export function updateSettings(patch: Partial<AdminState["settings"]>) {
  state.settings = { ...state.settings, ...patch };
}