"use client";

import { useMemo, useState } from "react";
import { Button, Input, Modal, Typography } from "shivanya-ui";
import { listRecords, removeRecord, upsertRecord } from "@/lib/store";
import type { Entity, RecordItem } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";
import { Page } from "./Page";

export function ResourcePage({ entity, title, description }: { entity: Entity; title: string; description: string }) {
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const rows = useMemo(() => {
    void version;
    const value = listRecords(entity);
    const q = query.trim().toLowerCase();
    return q ? value.filter((item) => JSON.stringify(item).toLowerCase().includes(q)) : value;
  }, [entity, query, version]);

  const save = () => {
    if (!editing?.name.trim()) return;
    upsertRecord(entity, editing);
    trackEvent({ event: `admin_${editing.id === editing.id ? "save" : "create"}`, application: "Admin" });
    setEditing(null);
    setVersion((v) => v + 1);
  };

  return (
    <Page title={title} description={description} actions={<Button onClick={() => setEditing({ id: `new-${Date.now()}`, name: "", status: "active" })}>Add</Button>}>
      <div className="admin-toolbar">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
        <Button variant="outline" onClick={() => setVersion((v) => v + 1)}>Refresh</Button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Status</th><th>Email</th><th>Organization</th><th>Updated</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td><td><span className="admin-badge">{row.status ?? "active"}</span></td><td>{row.email ?? "—"}</td><td>{row.organization ?? "—"}</td><td>{new Date(row.updatedAt).toLocaleString()}</td>
                <td><div className="admin-actions"><Button size="sm" variant="outline" onClick={() => setEditing({ ...row })}>Edit</Button><Button size="sm" variant="outline" onClick={() => { removeRecord(entity, row.id); setVersion((v) => v + 1); }}>Delete</Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} closable size="md">
        {editing ? <div style={{ display: "grid", gap: 12 }}>
          <Typography as="h2" variant="h3" weight="semibold">Edit {title}</Typography>
          <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Name" />
          <Input value={editing.status ?? ""} onChange={(e) => setEditing({ ...editing, status: e.target.value })} placeholder="Status" />
          <Input value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} placeholder="Email" />
          <Input value={editing.organization ?? ""} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} placeholder="Organization" />
          <div className="admin-actions"><Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></div>
        </div> : null}
      </Modal>
    </Page>
  );
}