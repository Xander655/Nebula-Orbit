import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/provisioning')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/provisioning"!</div>
}
