// routes/admin/employees/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useApiToken } from '../../../auth/useApiToken'
import { useState } from 'react'
import { SearchInput } from '../../../components/SearchInput'

export const Route = createFileRoute('/admin/employees/')({
  component: EmployeesPage,
})

type Employee = {
  employeeGuid: string
  fullName: string
  email: string
}

function EmployeesPage() {
  const { getAccessToken } = useApiToken()
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const pageSize = 20

  const { data, isLoading, error, isFetching } = useQuery<Employee[]>({
    queryKey: ['employees', page, searchTerm],
    queryFn: async () => {
      const token = await getAccessToken()
      if (!token) throw new Error('No access token')

      const url = new URL('https://sit.nebula.psi.edu/api/employee')
      url.searchParams.append('PageNumber', page.toString())
      url.searchParams.append('PageSize', pageSize.toString())

      if (searchTerm.trim()) {
        url.searchParams.append('Email', searchTerm.trim())
      }

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    },
    placeholderData: (prev) => prev,
  })

  const employees = data ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employees</h2>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            placeholder="Search by email..."
            onSearch={(value) => {
              setPage(1)
              setSearchTerm(value)
            }}
          />
        </div>
        <Link
          to="/admin/employees/new"
          className="mt-2 sm:mt-0 sm:ml-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Employee
        </Link>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error loading employees</div>
      ) : employees.length === 0 ? (
        <div>No employees found.</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.employeeGuid} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <Link
                    to="/admin/employees/$employeeGuid"
                    params={{ employeeGuid: e.employeeGuid }}
                    className="text-blue-600 hover:underline"
                  >
                    {e.fullName}
                  </Link>
                </td>
                <td className="p-2">{e.email}</td>
                <td className="p-2 text-right">
                  <Link
                    to="/admin/employees/$employeeGuid"
                    params={{ employeeGuid: e.employeeGuid }}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} {isFetching && '...'}
        </span>
        <button
          disabled={employees.length < pageSize}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
