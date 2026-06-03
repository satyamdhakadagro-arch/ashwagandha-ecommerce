import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useAuth as useClerkAuth, useClerk } from "@clerk/clerk-react";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false } = options ?? {};
  const utils = trpc.useUtils();

  // Get Clerk auth state
  const clerkAuth = useClerkAuth();
  const clerk = useClerk();

  // Fetch current user from our database (synced from Clerk)
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: clerkAuth.isSignedIn, // Only fetch if Clerk says user is signed in
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      // Call our backend logout endpoint
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      // Continue with Clerk logout even if our endpoint fails
    } finally {
      // Clear local cache
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();

      // Sign out from Clerk
      if (clerkAuth.isSignedIn && clerk) {
        await clerk.signOut({ redirectUrl: "/" });
      }
    }
  }, [logoutMutation, utils, clerkAuth.isSignedIn, clerk]);

  const state = useMemo(() => {
    // Use Clerk's auth state combined with our database user
    const isAuthenticated = clerkAuth.isSignedIn && meQuery.data;

    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(meQuery.data)
    );

    return {
      user: meQuery.data ?? null,
      loading: !clerkAuth.isLoaded || meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(isAuthenticated),
    };
  }, [
    clerkAuth.isLoaded,
    clerkAuth.isSignedIn,
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    logoutMutation.error,
    logoutMutation.isPending,
  ]);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (state.loading) return;
    if (state.isAuthenticated) return;
    if (typeof window === "undefined") return;

    // Clerk will handle the redirect to sign-in page
    if (!clerkAuth.isSignedIn) {
      window.location.href = "/sign-in";
    }
  }, [
    redirectOnUnauthenticated,
    state.loading,
    state.isAuthenticated,
    clerkAuth.isSignedIn,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
