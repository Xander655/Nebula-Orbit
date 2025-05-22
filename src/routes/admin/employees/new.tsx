import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApiToken } from '../../../auth/useApiToken'

export const Route = createFileRoute('/admin/employees/new')({
  component: NewEmployeePage,
})

type NewEmployeeForm = {
  firstName: string
  lastName: string
  fullName: string
  email: string
}

function NewEmployeePage() {
  const { getAccessToken } = useApiToken()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewEmployeeForm>()

  const mutation = useMutation({
    mutationFn: async (data: NewEmployeeForm) => {
      const token = await getAccessToken()
      if (!token) throw new Error('No access token')

      const res = await fetch('https://sit.nebula.psi.edu/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message || `Error ${res.status}`)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      navigate({ to: '/admin/employees' })
    },
  })

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Employee</h2>

      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            {...register('firstName', { required: true })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">First name is required.</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            {...register('lastName', { required: true })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">Last name is required.</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register('fullName', { required: true })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">Full name is required.</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required.</p>
          )}
        </div>

        {mutation.isError && (
          <p className="text-red-600 text-sm">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'An error occurred'}
          </p>
        )}

        <div className="flex items-center space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? 'Saving...' : 'Create Employee'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm text-gray-500 underline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
