import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { submitOnboardingRequest } from '@/api/onboarding'

export const Route = createFileRoute('/provisioning')({
  component: RouteComponent,
})

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
})

export type FormData = z.infer<typeof formSchema>

function RouteComponent() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
        status: 'PreEmployment',
      }

      await submitOnboardingRequest(payload)
    },
    onError: (err: any) => {
      if (err?.errors) {
        for (const [field, messages] of Object.entries(err.errors)) {
          setError(field as keyof FormData, { message: (messages as string[])[0] })
        }
      }
    },
  })

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">IT Onboarding Intake</h2>
      <form
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data)
        })}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Submitting...' : 'Start Onboarding'}
        </Button>
        {mutation.isSuccess && <p className="text-green-600">Submitted successfully!</p>}
        {mutation.isError && !Object.keys(errors).length && (
          <p className="text-red-600">Submission failed. Please check the form.</p>
        )}
      </form>
    </div>
  )
}
