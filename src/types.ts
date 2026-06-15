export type Screen = "start" | "quiz" | "result" | "review";
export type BadgeStatus = "idle" | "preparing" | "attributing" | "minting" | "claimed";
export type AttributionStatus = "ready" | "simulating" | "attributed";

export interface ModalContent {
  title: string;
  body: string;
  bullets?: string[];
  ctaLabel?: string;
  href?: string;
}
