import { describe, expect, it, beforeEach } from "vitest";
import { getState, listRecords, removeRecord, resetState, upsertRecord } from "./store";

describe("admin store", () => {
  beforeEach(() => resetState());

  it("lists seeded records", () => {
    expect(listRecords("users").length).toBeGreaterThan(0);
  });

  it("creates and removes records", () => {
    upsertRecord("users", { id: "u-test", name: "Test", email: "test@example.com" });
    expect(listRecords("users").some((item) => item.id === "u-test")).toBe(true);
    removeRecord("users", "u-test");
    expect(listRecords("users").some((item) => item.id === "u-test")).toBe(false);
  });

  it("updates settings", () => {
    expect(getState().settings.maintenance).toBe(false);
  });
});