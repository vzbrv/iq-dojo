export function track(event: string, data: Record<string, unknown> = {}) {
  console.info(`[IQ Dojo] ${event}`, data);
}
