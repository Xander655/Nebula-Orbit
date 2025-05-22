// types/router-context.ts
import type { QueryClient } from '@tanstack/react-query'

export interface RouterContext {
  auth: {
    isAuthenticated: boolean
    user?: {
      name: string
      username: string
      roles?: string[]
    }
  }
  queryClient: QueryClient
}
