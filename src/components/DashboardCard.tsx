// components/DashboardCard.tsx
import { Link } from '@tanstack/react-router'

type DashboardCardProps = {
  title: string
  href: string
  subtitle?: string
}

export default function DashboardCard({ title, href, subtitle }: DashboardCardProps) {
  return (
    <Link
      to={href}
      className="block p-4 bg-white border border-gray-200 rounded shadow hover:shadow-md transition hover:border-blue-500"
    >
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </Link>
  )
} 
