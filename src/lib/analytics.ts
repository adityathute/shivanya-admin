import type { AdminState, AnalyticsPoint, RecordItem } from "./types";

export type AnalyticsEvent = {
  id: string;
  event: string;
  application: string;
  page?: string;
  userId?: string;
  sessionId?: string;
  browser?: string;
  device?: string;
  os?: string;
  country?: string;
  city?: string;
  isp?: string;
  ip?: string;
  referrer?: string;
  duration?: number;
  timestamp: string;
};

const events: AnalyticsEvent[] = [];

export function trackEvent(input: Omit<AnalyticsEvent, "id" | "timestamp">) {
  const event = { ...input, id: cryptoSafeId(), timestamp: new Date().toISOString() };
  events.unshift(event);
  return event;
}

function cryptoSafeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getEvents(): AnalyticsEvent[] {
  return [...events];
}

export function clearEvents() {
  events.length = 0;
}

export function buildAnalytics(state: AdminState) {
  const source = [...state.activity.map((item) => ({
    application: item.application ?? "Unknown",
    browser: item.browser ?? "Unknown",
    device: item.device ?? "Unknown",
    country: item.country ?? "Unknown",
    city: item.city ?? "Unknown",
    isp: item.isp ?? "Unknown",
    ip: item.ip ?? "Unknown",
    referrer: "Direct",
    value: item.value ?? 1
  })), ...events.map((item) => ({
    application: item.application,
    browser: item.browser ?? "Unknown",
    device: item.device ?? "Unknown",
    country: item.country ?? "Unknown",
    city: item.city ?? "Unknown",
    isp: item.isp ?? "Unknown",
    ip: item.ip ?? "Unknown",
    referrer: item.referrer ?? "Direct",
    value: 1
  }))];
  return {
    traffic: group(source, "application"),
    browsers: group(source, "browser"),
    devices: group(source, "device"),
    countries: group(source, "country"),
    cities: group(source, "city"),
    isps: group(source, "isp"),
    ips: group(source, "ip"),
    referrers: group(source, "referrer"),
    applications: group(source, "application")
  };
}

function group(rows: Array<Record<string, string | number>>, key: string): AnalyticsPoint[] {
  const map = new Map<string, number>();
  for (const row of rows) {
    const label = String(row[key] ?? "Unknown");
    map.set(label, (map.get(label) ?? 0) + Number(row.value ?? 1));
  }
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}