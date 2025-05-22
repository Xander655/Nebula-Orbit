import { createFileRoute } from '@tanstack/react-router'
import { useRouterState } from '@tanstack/react-router'
import DashboardCard from '../components/DashboardCard'
import SignInButton from '../auth/SignInButton'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const state = useRouterState({
    select: (s) => s.matches.slice(-1)[0]?.context.auth,
  })  

  const { isAuthenticated, user } = state ?? { isAuthenticated: false }

  const roles = user?.roles ?? []
  const hasRole = (role: string) => roles.includes(role)

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
    <div className="space-y-6">
      <section className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>
        <p className="text-gray-600 mt-1">
          You're signed in as <span className="font-mono">{user?.username}</span>
        </p>
        {roles.length > 0 && (
          <p className="mt-1 text-sm text-gray-500">Roles: {roles.join(', ')}</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard title="Employees" href="/employees" />
          {(hasRole('Admin') || hasRole('HR')) && (
            <DashboardCard title="Start Onboarding" href="/onboarding" />
          )}
          {hasRole('Admin') && <DashboardCard title="Admin Dashboard" href="/admin" />}
          {hasRole('ITAdmin') && <DashboardCard title="System Logs" href="/logs" />}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6 mb-2">Recently Used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard title="John Doe" href="/employees/123" subtitle="Recently viewed employee" />
          <DashboardCard title="Provisioning Logs" href="/logs" subtitle="Access history" />
        </div>
      </section>
    </div>
  )
}
