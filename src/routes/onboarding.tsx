import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useApiToken } from '../auth/useApiToken'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingForm,
})

type OnboardingFormData = {
  firstName: string
  lastName: string
  email: string
}

function OnboardingForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<OnboardingFormData>()
  const { getAccessToken } = useApiToken()

  const mutation = useMutation<
    unknown,
    Error,
    OnboardingFormData
  >({
    mutationFn: async (formData) => {
      const token = await getAccessToken()

      const payload = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        FullName: `${formData.firstName} ${formData.lastName}`,
      }

      const res = await fetch('https://sit.nebula.psi.edu/api/employee', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errData = await res.json()
        const message = errData.title ?? 'Unknown error during onboarding'
        throw new Error(message)
      }

      return res.json()
    },
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = (data: OnboardingFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Start IT Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <input
            {...register('firstName', { required: 'First name is required' })}
            placeholder="First name"
            className="input"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            placeholder="Last name"
            className="input"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Email"
            className="input"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.status === 'pending'}
        >
          {mutation.status === 'pending' ? 'Submitting...' : 'Start Onboarding'}
        </button>

        {mutation.status === 'error' && (
          <p className="text-red-500">{mutation.error.message}</p>
        )}

        {mutation.status === 'success' && (
          <p className="text-green-600">Onboarding started!</p>
        )}
      </form>
    </div>
  )
}
