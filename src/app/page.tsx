import { Card, Typography } from "shivanya-ui";
import { Page } from "@/components/Page";
import { getState } from "@/lib/store";

export default function DashboardPage() {
  const state = getState();
  const stats = [
    ["Users", state.users.length],
    ["Organizations", state.organizations.length],
    ["Applications", state.applications.length],
    ["Events", state.events.length]
  ];
  return <Page title="Dashboard" description="Overview of Shivanya applications and analytics.">
    <div className="admin-grid">{stats.map(([label,value])=><Card key={String(label)}><Typography variant="caption" color="secondary">{label}</Typography><div className="admin-stat-value">{value}</div></Card>)}</div>
    <div className="admin-grid-2">
      <Card><Typography as="h2" variant="h4" weight="semibold">Recent activity</Typography><div className="admin-list">{state.activity.slice(0,5).map(item=><div className="admin-row" key={item.id}><span>{item.name}</span><span className="admin-muted">{item.application}</span></div>)}</div></Card>
      <Card><Typography as="h2" variant="h4" weight="semibold">Top pages</Typography><div className="admin-list">{[...state.pages].sort((a,b)=>(b.value??0)-(a.value??0)).slice(0,5).map(item=><div className="admin-row" key={item.id}><span>{item.path}</span><strong>{item.value}</strong></div>)}</div></Card>
    </div>
  </Page>;
}