import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/timeoff')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/timeoff"!</div>
}
