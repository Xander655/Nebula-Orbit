import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { submitOnboardingRequest } from '@/api/onboarding'

const formSchema = z.object({
  useDrPrefix: z.boolean().optional(),
  role: z.string().min(1, 'Role is required'),
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  minHours: z.coerce.number().min(0),
  maxHours: z.coerce.number().min(0),
  hourlyRate: z.coerce.number().min(0),
  vacationRate: z.coerce.number().min(0),
  fringe: z.coerce.number().min(0),
  indirectRate: z.coerce.number().min(0),
  burdenRate: z.coerce.number().min(0),
  payPeriod_MinHours: z.coerce.number().min(0),
})

export type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
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
        fullName: `${data.firstName} ${data.middleName ?? ''} ${data.lastName}`.trim(),
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
    <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
      <h2 className="text-2xl font-semibold">Timesheet User Intake</h2>
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name Row */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField id="firstName" label="First Name" error={errors.firstName?.message} {...register('firstName')} />
          <FormField id="middleName" label="Middle Name" error={errors.middleName?.message} {...register('middleName')} />
          <FormField id="lastName" label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
        </div>

        <FormField
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
          className="md:col-span-2"
        />

        {/* Checkbox */}
        <div className="md:col-span-2 flex flex-wrap gap-6 items-center">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('useDrPrefix')} /> Use Dr. Prefix
          </label>
        </div>

        {/* Role Select */}
        <div className="md:col-span-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            {...register('role')}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select a role</option>
            <option value="ctiveEmployee">Active Employee</option>
            <option value="FinancialManager">Financial Manager</option>
            <option value="Executive">Executive</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        {/* Remaining Fields */}
        <FormField id="minHours" label="Min Hours" error={errors.minHours?.message} {...register('minHours')} />
        <FormField id="maxHours" label="Max Hours" error={errors.maxHours?.message} {...register('maxHours')} />
        <FormField id="hourlyRate" label="Hourly Rate" error={errors.hourlyRate?.message} {...register('hourlyRate')} />
        <FormField id="vacationRate" label="Vacation Rate" error={errors.vacationRate?.message} {...register('vacationRate')} />
        <FormField id="fringe" label="Fringe" error={errors.fringe?.message} {...register('fringe')} />
        <FormField id="indirectRate" label="Indirect Rate" error={errors.indirectRate?.message} {...register('indirectRate')} />
        <FormField id="burdenRate" label="Burden Rate" error={errors.burdenRate?.message} {...register('burdenRate')} />
        <FormField id="payPeriod_MinHours" label="Pay Period Min Hours" error={errors.payPeriod_MinHours?.message} {...register('payPeriod_MinHours')} />

        {/* Submit */}
        <div className="md:col-span-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Submit User Info'}
          </Button>
          {mutation.isSuccess && <p className="text-green-600 mt-2">Submitted successfully!</p>}
          {mutation.isError && !Object.keys(errors).length && (
            <p className="text-red-600 mt-2">Submission failed. Please check the form.</p>
          )}
        </div>
      </form>
    </div>
  )
}

function FormField({ id, label, error, className = '', ...rest }: any) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
