import { msalInstance } from './msalInstance'
import { InteractionRequiredAuthError } from '@azure/msal-browser'

const NEBULA_API_SCOPE = import.meta.env.VITE_NEBULA_API_SCOPE

export async function getAccessToken(): Promise<string> {
  const accounts = msalInstance.getAllAccounts()
  const account = accounts[0]

  if (!account) {
    throw new Error('No signed-in account found.')
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      account,
      scopes: [NEBULA_API_SCOPE],
    })

    return response.accessToken
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      // fallback if silent token failed
      await msalInstance.acquireTokenRedirect({
        scopes: [NEBULA_API_SCOPE],
        account,
      })
    }

    throw new Error('Failed to acquire access token.')
  }
}
