// types/router-context.ts
import type { IMsalContext } from "@azure/msal-react"

export interface RouterContext {
  auth: IMsalContext
}
