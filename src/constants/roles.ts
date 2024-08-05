export const roles = ['admin', 'user', 'super-admin'] as const;

export type Role = (typeof roles)[number];
