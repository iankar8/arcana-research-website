export type AnalyticsEvent =
  | "nav_click"
  | "cta_book_intro"
  | "cta_how_we_work"
  | "read_note"
  | "form_submit";

export function track(event: AnalyticsEvent, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, detail, timestamp: Date.now() };

  if (typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new CustomEvent(event, { detail: payload }));
  }

  const globalWithDataLayer = window as typeof window & { dataLayer?: unknown[] };
  if (Array.isArray(globalWithDataLayer.dataLayer)) {
    globalWithDataLayer.dataLayer.push(payload);
  }
}
