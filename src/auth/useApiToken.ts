// auth/useApiToken.ts
import { useMsal } from '@azure/msal-react'

export function useApiToken() {
  const { instance, accounts } = useMsal()

  const getAccessToken = async (): Promise<string | null> => {
    if (accounts.length === 0) return null

    const request = {
      account: accounts[0],
      scopes: ['api://dc506a56-1e30-42ce-a4ac-a316f2a6e336/Admin'],
    }

    try {
      const response = await instance.acquireTokenSilent(request)
      return response.accessToken
    } catch (error) {
      console.error('Failed to get access token', error)
      return null
    }
  }

  return { getAccessToken }
}
