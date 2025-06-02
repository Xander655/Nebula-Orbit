// routes/employees.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useApiToken } from '../../auth/useApiToken'
import { useRef, useState } from 'react'
import { SearchInput } from '../../components/SearchInput'

export const Route = createFileRoute('/directory/')({
  component: DirectoryPage,
})

type Employee = {
  employeeGuid: string
  fullName: string
  email: string
}

function DirectoryPage() {
  const { getAccessToken } = useApiToken()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const pageSize = 20

  const query = useQuery<Employee[]>({
    queryKey: ['employees', page, searchTerm],
    queryFn: async () => {
      const token = await getAccessToken()
      if (!token) throw new Error('No access token')

      const url = new URL('https://sit.nebula.psi.edu/api/employee')
      url.searchParams.append('PageNumber', page.toString())
      url.searchParams.append('PageSize', pageSize.toString())

      if (searchTerm) {
        url.searchParams.append('Email', searchTerm)
      }

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    },
    placeholderData: (prev) => prev,
  })

  const { data, isLoading, error, isFetching } = query
  const employees = data ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employees</h2>

      <SearchInput
        placeholder="Search by email..."
        onSearch={(val) => {
          setPage(1)
          setSearchTerm(val)
        }}
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error loading employees</div>
      ) : employees.length === 0 ? (
        <div>No employees found.</div>
      ) : (
        <ul className="space-y-1 mb-4">
          {employees.map((e) => (
            <li key={e.employeeGuid}>
              <strong>{e.fullName}</strong> – {e.email}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center space-x-2">
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
