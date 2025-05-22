// router.ts
import { createRouter } from '@tanstack/react-router'
import type { RouterContext } from './types/router-context'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: undefined!, // will be injected in <RouterProvider />
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
    context: RouterContext
  }
}