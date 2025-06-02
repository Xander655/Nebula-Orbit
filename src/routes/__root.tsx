import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import Layout from '@/components/Layout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { LoginButton } from '@/components/LoginButton'

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthenticatedTemplate>
        <Layout>
          <Outlet />
        </Layout>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div className="h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Nebula</h1>
          <p className="mb-4">Please sign in to continue.</p>
          <LoginButton />
        </div>
      </UnauthenticatedTemplate>
    </>
  ),
})
