import { PublicClientApplication, type AuthenticationResult } from '@azure/msal-browser'

const ENTRA_CLIENT_ID = import.meta.env.VITE_ENTRA_CLIENT_ID
const ENTRA_AUTHORITY = import.meta.env.VITE_ENTRA_AUTHORITY
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

console.log("All env vars:", import.meta.env);



export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: ENTRA_CLIENT_ID,
    authority: ENTRA_AUTHORITY,
    redirectUri: REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
})

msalInstance.addEventCallback((event) => {
  if (event.eventType === 'msal:loginSuccess') {
    const payload = event.payload

    if ((payload as AuthenticationResult)?.account) {
      const account = (payload as AuthenticationResult).account
      const idTokenClaims = account.idTokenClaims as Record<string, unknown>
      const roles = Array.isArray(idTokenClaims?.roles)
        ? (idTokenClaims.roles as string[])
        : []

      if (!roles.includes('nebula_admin')) {
        console.warn('Unauthorized — redirecting to /unauthorized')
        window.location.href = '/unauthorized'
      }
    }
  }
})
