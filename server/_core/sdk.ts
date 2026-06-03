/**
 * SDK Server - Now using Clerk for authentication
 * This file is kept for backward compatibility but most OAuth logic is removed
 * Clerk handles all authentication via middleware in context.ts
 */

import type { User } from "../../drizzle/schema";

/** Result of `sdk.authenticateRequest`. Now just returns the user from Clerk. */
export type AuthenticatedUser = User & {
  taskUid?: string;
  isCron?: boolean;
};

class SDKServer {
  constructor() {
    console.log("[SDK] Initialized with Clerk authentication");
  }
}

export const sdk = new SDKServer();
