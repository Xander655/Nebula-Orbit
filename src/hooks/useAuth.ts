// hooks/useAuth.ts
import { useRouteContext } from "@tanstack/react-router"
import type { RouterContext } from "@/types/router-context"

export function useAuth() {
  const context = useRouteContext({ from: "/" }) as Partial<RouterContext>

  // auth might not be set yet on initial render
  const auth = context.auth
  const account = auth?.accounts?.[0]
  const isAuthenticated = !!account
  const username = account?.username || ""
  const name = account?.name || ""

  return {
    account,
    isAuthenticated,
    username,
    name,
    instance: auth?.instance,
    auth,
  }
}
