export type AnalyticsEvent =
  | "nav_click"
  | "cta_book_intro"
  | "cta_book_assessment"
  | "cta_contact"
  | "cta_see_results"
  | "cta_how_we_work"
  | "cta_book_call"
  | "cta_view_by_sector"
  | "cta_email"
  | "cta_subscribe"
  | "cta_participate_survey"
  | "cta_intelligence_briefing"
  | "cta_research"
  | "sector_tab_click"
  | "use_case_click"
  | "read_note"
  | "form_submit"
  | "briefing_sample_request"
  | "research_signup";

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
