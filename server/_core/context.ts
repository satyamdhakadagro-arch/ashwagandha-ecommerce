import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { getAuth } from "@clerk/express";
import { getUserByClerkId, upsertUser } from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const auth = getAuth(opts.req);

    if (auth.userId) {
      // User is authenticated with Clerk
      // Try to get user from database
      user = await getUserByClerkId(auth.userId);

      // If user doesn't exist in database, create them
      if (!user) {
        const email = auth.sessionClaims?.email as string | undefined || "";
        const name = auth.sessionClaims?.name as string | undefined || "";
        const image = auth.sessionClaims?.image as string | undefined || null;

        await upsertUser({
          clerkId: auth.userId,
          email,
          name,
          avatarUrl: image,
        });

        // Fetch the newly created user
        user = await getUserByClerkId(auth.userId);
      }
    }
  } catch (error) {
    // Authentication is optional for public procedures
    console.error("[Auth] Error in context creation:", error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
