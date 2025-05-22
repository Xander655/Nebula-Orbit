import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { msalInstance } from './msalConfig'
import { router } from '../router'
import type { RouterContext } from '../types/router-context'

const queryClient = new QueryClient()

export default function MsalProviderWrapper() {
  return (
    <MsalProvider instance={msalInstance}>
      {/* ✅ Add QueryClientProvider here */}
      <QueryClientProvider client={queryClient}>
        <RouterWithContext />
      </QueryClientProvider>
    </MsalProvider>
  )
}

function RouterWithContext() {
    const { instance } = useMsal()
    const isAuthenticated = useIsAuthenticated()
  
    // ⚠️ Critical: restore account from local/session storage if needed
    const account =
      instance.getActiveAccount() ?? instance.getAllAccounts()[0] ?? null
  
    // Set active account once if it's not set
    if (account && !instance.getActiveAccount()) {
      instance.setActiveAccount(account)
    }
  
    const context: RouterContext = {
      auth: {
        isAuthenticated: !!account,
        user: account
          ? {
              name: account.name ?? '',
              username: account.username,
              roles: (account.idTokenClaims?.roles ?? []) as string[],
            }
          : undefined,
      },
      queryClient,
    }
  
    return <RouterProvider router={router} context={context} />
  }
  
