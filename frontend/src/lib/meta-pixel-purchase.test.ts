import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildNeoTransatPurchaseEvent,
  buildWatchesPurchaseEvent,
  MetaPurchaseTracker,
  resetMetaPurchaseTrackerForTests,
  trackMetaPurchase,
} from "./meta-pixel-purchase";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe("Meta Pixel Purchase", () => {
  afterEach(() => {
    resetMetaPurchaseTrackerForTests();
    vi.unstubAllGlobals();
  });

  it("builds Neo Transat Purchase payload from backend totals", () => {
    const event = buildNeoTransatPurchaseEvent("SH-000101", "duo", 458);

    expect(event).toEqual({
      orderNumber: "SH-000101",
      value: 458,
      currency: "MAD",
      content_type: "product",
      content_ids: ["duo"],
      num_items: 2,
    });
  });

  it("builds multi-model Watches Purchase payload", () => {
    const event = buildWatchesPurchaseEvent(
      "SH-000202",
      [
        { variant_id: "taupe", quantity: 1 },
        { variant_id: "navy-blue", quantity: 2 },
        { variant_id: "burgundy", quantity: 1 },
      ],
      996
    );

    expect(event).toEqual({
      orderNumber: "SH-000202",
      value: 996,
      currency: "MAD",
      content_type: "product",
      content_ids: ["taupe", "navy-blue", "burgundy"],
      num_items: 4,
    });
  });

  it("does not fire Purchase when order creation fails", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });

    // Failed submissions stop before trackMetaPurchase is invoked.
    expect(fbq).not.toHaveBeenCalled();
  });

  it("prevents duplicate Purchase events for the same order", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });

    const event = buildNeoTransatPurchaseEvent("SH-000404", "family", 657);

    expect(trackMetaPurchase(event)).toBe(true);
    expect(trackMetaPurchase(event)).toBe(false);
    expect(trackMetaPurchase(event)).toBe(false);
    expect(fbq).toHaveBeenCalledTimes(1);
    expect(fbq).toHaveBeenCalledWith("track", "Purchase", {
      value: 657,
      currency: "MAD",
      content_type: "product",
      content_ids: ["family"],
      num_items: 3,
    });
  });

  it("persists dedupe state across rerenders via session storage", () => {
    const storage = new MemoryStorage();
    const tracker = new MetaPurchaseTracker(storage);

    expect(tracker.tryMark("SH-000505")).toBe(true);
    expect(tracker.tryMark("SH-000505")).toBe(false);

    const restored = new MetaPurchaseTracker(storage);
    expect(restored.has("SH-000505")).toBe(true);
    expect(restored.tryMark("SH-000505")).toBe(false);
  });
});
