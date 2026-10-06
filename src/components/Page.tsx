import type { ReactNode } from "react";
import { Typography } from "shivanya-ui";

export function Page({ title, description, actions, children }: { title: string; description?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <Typography as="h1" variant="h2" weight="bold">{title}</Typography>
          {description ? <Typography as="p" variant="body" color="secondary">{description}</Typography> : null}
        </div>
        {actions ? <div className="admin-actions">{actions}</div> : null}
      </header>
      {children}
    </main>
  );
}