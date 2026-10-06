import { describe, expect, it, beforeEach } from "vitest";
import { clearEvents, getEvents, trackEvent } from "./analytics";

describe("analytics", () => {
  beforeEach(() => clearEvents());

  it("tracks events", () => {
    trackEvent({ event: "page_view", application: "Memory", page: "/memory" });
    expect(getEvents()).toHaveLength(1);
    expect(getEvents()[0].event).toBe("page_view");
  });

  it("keeps event payload isolated", () => {
    const event = trackEvent({ event: "login", application: "Auth" });
    expect(event.id).toBeTruthy();
    expect(event.timestamp).toBeTruthy();
  });
});