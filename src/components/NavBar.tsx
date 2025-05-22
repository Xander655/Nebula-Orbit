// components/NavBar.tsx
import { Link, useRouterState } from '@tanstack/react-router'
import SignOutButton from '../auth/SignOutButton'
import clsx from 'clsx' // optional, but makes conditional classes cleaner
import UserInfo from './UserInfo'

const navItems = [
    { to: '/', label: 'Home' },
    { to: '/employees', label: 'Employees' },
    { to: '/admin', label: 'Admin', roles: ['Admin', 'ITAdmin'] },
    { to: '/onboarding', label: 'Onboarding', roles: ['Admin', 'HR', 'ITAdmin'] },
    { to: '/logs', label: 'Logs', roles: ['Admin', 'ITAdmin'] },
    { to: '/settings', label: 'Settings', roles: ['Admin'] },
]

export default function NavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="space-x-4">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                'text-sm font-medium px-2 pb-1 border-b-2 transition-colors',
                pathname === to
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-700 border-transparent hover:text-blue-500 hover:border-blue-300'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-end md:items-center md:flex-row gap-2 md:gap-4">
          <UserInfo />
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}
