// routes/__root.tsx
import {
    createRootRouteWithContext,
    Outlet,
    redirect,
    Link,
  } from '@tanstack/react-router'
  import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
  import { useIsAuthenticated } from '@azure/msal-react'
  import SignInButton from '../auth/SignInButton'
  import SignOutButton from '../auth/SignOutButton'
  import NavBar from '../components/NavBar'
  import type { RouterContext } from '../types/router-context'
  
  export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad: ({ context, location }) => {
      const isLoginPage = location.pathname === '/'
  
      if (!context.auth.isAuthenticated && !isLoginPage) {
        throw redirect({
          to: '/',
          search: { redirect: location.href },
        })
      }
    },
    component: RootLayout,
  })
  
  function RootLayout() {
    const isAuthenticated = useIsAuthenticated()
  
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome to Nebula Admin</h2>
          <p className="text-gray-600 mt-2 mb-6">This is a secure internal app for PSI staff.</p>
          <SignInButton />
        </div>
      )
    }
  
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <NavBar />
    
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Outlet />
          </main>
    
          <TanStackRouterDevtools />
        </div>
      )
  }
  