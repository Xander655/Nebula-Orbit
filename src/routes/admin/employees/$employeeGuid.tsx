import {
  createFileRoute,
  useParams,
  useNavigate,
} from '@tanstack/react-router'
import { useApiToken } from '../../../auth/useApiToken'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const Route = createFileRoute('/admin/employees/$employeeGuid')({
  component: EmployeeDetailPage,
})

type Employee = {
  employeeGuid: string
  firstName: string
  lastName: string
  fullName: string
  email: string
}

function EmployeeDetailPage() {
  const { employeeGuid } = Route.useParams()
  const { getAccessToken } = useApiToken()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Employee>()

  const {
    data: employee,
    isLoading,
    error,
  } = useQuery<Employee>({
    queryKey: ['employee', employeeGuid],
    queryFn: async () => {
      const token = await getAccessToken()
      const res = await fetch(`https://sit.nebula.psi.edu/api/employee/${employeeGuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    },
  })
  
  // Reset form when employee data arrives
  useEffect(() => {
    if (employee) {
      reset(employee)
    }
  }, [employee, reset])

  const updateMutation = useMutation({
    mutationFn: async (formData: Employee) => {
      const token = await getAccessToken()

      const patch = [
        { op: 'replace', path: '/firstName', value: formData.firstName },
        { op: 'replace', path: '/lastName', value: formData.lastName },
        { op: 'replace', path: '/fullName', value: formData.fullName },
        { op: 'replace', path: '/email', value: formData.email },
      ]

      const res = await fetch(
        `https://sit.nebula.psi.edu/api/employee/${employeeGuid}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json-patch+json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patch),
        }
      )

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `Error ${res.status}`)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      navigate({ to: '/admin/employees' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessToken()
      const res = await fetch(
        `https://sit.nebula.psi.edu/api/employee/${employeeGuid}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error(`Error ${res.status}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      navigate({ to: '/admin/employees' })
    },
  })

  const onSubmit = handleSubmit((formData) => {
    updateMutation.mutate(formData)
  })

  if (isLoading) return <div>Loading employee...</div>
  if (error) return <div className="text-red-500">Failed to load employee</div>

  return (
    <div className="p-4 max-w-xl space-y-6">
      <h2 className="text-xl font-bold">Edit Employee</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            {...register('firstName')}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            {...register('lastName')}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register('fullName')}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register('email')}
            type="email"
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={updateMutation.isPending || !isDirty}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete this employee? This cannot be undone.'
                )
              ) {
                deleteMutation.mutate()
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={deleteMutation.isPending}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}
