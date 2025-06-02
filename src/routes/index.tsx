import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        This is an internal hub for managing employee provisioning and Active Directory automation.
      </p>
    </div>
  )
}
