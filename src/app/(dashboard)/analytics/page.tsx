"use client";

import Link from "next/link";
import { Card, Typography } from "shivanya-ui";
import { Page } from "@/components/Page";

const items = [
  ["Traffic Acquisition","traffic","Understand application traffic by source."],
  ["Referrers","referrers","See websites and sources sending visitors."],
  ["Users","users","Explore users and engagement."],
  ["Applications","applications","Compare application activity."],
  ["Events","events","Explore event volume and types."],
  ["Pages","pages","Analyze visited pages."],
  ["Browsers","browsers","See browser usage."],
  ["Operating Systems","operating-systems","Analyze operating systems."],
  ["Devices","devices","Compare desktop, mobile and tablet traffic."],
  ["Countries","countries","Explore visitors by country."],
  ["Cities","cities","Explore visitor activity by city."],
  ["ISPs","isps","Analyze internet service providers."],
  ["IPs","ips","Explore traffic by IP address."],
  ["Sessions","sessions","Analyze visitor sessions."]
] as const;

export default function PageComponent() {
  return <Page title="Analytics" description="Explore detailed analytics across all Shivanya applications.">
    <div className="admin-grid-2">{items.map(([title,slug,description])=><Link key={slug} href={slug==="users"?"/users":slug==="applications"?"/applications":slug==="events"?"/events":slug==="pages"?"/pages":`/analytics/${slug}`}><Card><Typography as="h2" variant="h4" weight="semibold">{title}</Typography><Typography as="p" variant="body" color="secondary">{description}</Typography></Card></Link>)}</div>
  </Page>;
}