// routes/unauthorized.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthorized')({
  component: () => (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-2 text-gray-700">
        You do not have the required role to access this application.
      </p>
    </div>
  ),
})
