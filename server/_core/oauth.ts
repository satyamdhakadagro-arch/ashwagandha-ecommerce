import type { Express } from "express";

/**
 * OAuth Routes - Now using Clerk
 * Clerk handles all OAuth/authentication flows automatically.
 * This file is kept for backward compatibility but routes are no longer needed.
 */

export function registerOAuthRoutes(app: Express) {
  // Clerk middleware handles authentication automatically
  // No custom OAuth callback routes needed
  console.log("[OAuth] Clerk authentication initialized - no custom routes needed");
}
