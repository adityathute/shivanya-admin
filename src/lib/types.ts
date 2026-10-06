export type Entity = "organizations" | "users" | "applications" | "activity" | "events" | "pages";

export type RecordItem = {
  id: string;
  name: string;
  status?: string;
  email?: string;
  organization?: string;
  application?: string;
  path?: string;
  type?: string;
  browser?: string;
  device?: string;
  country?: string;
  city?: string;
  isp?: string;
  ip?: string;
  value?: number;
  createdAt: string;
  updatedAt: string;
};

export type AnalyticsPoint = { label: string; value: number };

export type AdminState = {
  organizations: RecordItem[];
  users: RecordItem[];
  applications: RecordItem[];
  activity: RecordItem[];
  events: RecordItem[];
  pages: RecordItem[];
  settings: { maintenance: boolean; refreshInterval: number };
};