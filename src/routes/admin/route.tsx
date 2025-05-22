// routes/admin/_layout.tsx
import { createFileRoute, Outlet, redirect, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  console.log('🧩 AdminLayout mounted')
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <aside className="bg-gray-100 border-r p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2 text-sm">
          <Link
            to="/admin/employees"
            className="block hover:text-blue-600"
          >
            👥 Employees
          </Link>
          <Link
            to="/admin/timeoff"
            className="block hover:text-blue-600"
          >
            📆 Time Off
          </Link>
          <Link
            to="/admin/provisioning"
            className="block hover:text-blue-600"
          >
            🛠 Provisioning
          </Link>
          <Link
            to="/admin/logs"
            className="block hover:text-blue-600"
          >
            📄 Logs
          </Link>
        </nav>
      </aside>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
