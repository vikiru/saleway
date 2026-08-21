export const paymentKeys = {
  all: ['payments'] as const,
  verify: (sessionId: string) => [...paymentKeys.all, 'verify', sessionId] as const,
};
