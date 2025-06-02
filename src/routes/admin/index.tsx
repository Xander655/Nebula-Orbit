// routes/admin/index.tsx
import type { RouterContext } from '@/types/router-context'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useRouterState } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const auth = useRouterState({
    select: (s) =>
      (s.matches[s.matches.length - 1]?.context as RouterContext | undefined)
        ?.auth,
  })

  const name = auth?.accounts[0]?.name;
  const roles = auth?.accounts[0]?.idTokenClaims?.roles ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {name ?? 'Admin'} 👋
      </h1>
      <p className="text-gray-600 mb-4">This is your internal control panel.</p>

      {roles.length > 0 && (
        <div className="mb-4 text-sm text-gray-500">
          Roles: <span className="font-mono">{roles.join(', ')}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <DashboardCard title="Manage Employees" to="/admin/employees" />
        <DashboardCard title="Provision Access" to="/admin/provisioning" />
        <DashboardCard title="Time Off Requests" to="/admin/timeoff" />
        <DashboardCard title="System Logs" to="/admin/logs" />
      </div>
    </div>
  )
}

function DashboardCard({ title, to }: { title: string; to: string }) {
  return (
    <Link
      to={to}
      className="block p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">View details</p>
    </Link>
  )
}
