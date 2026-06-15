export type AnalyticsEvent =
  | "app_open" | "challenge_start" | "question_answered" | "answer_feedback_viewed"
  | "challenge_completed" | "result_viewed" | "mistake_review_opened"
  | "play_again_clicked" | "iq_wiki_link_clicked" | "badge_preview_clicked" | "iq_unlock_clicked";

export function track(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  console.info(`[IQ Dojo] ${event}`, data);
}
