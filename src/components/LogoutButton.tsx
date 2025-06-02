import { useMsal } from "@azure/msal-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const { instance, accounts } = useMsal()

  const handleLogout = () => {
    const account = accounts[0]
    if (!account) return

    instance.logoutRedirect({
        account,
        postLogoutRedirectUri: window.location.origin,
    })
  }


  return (
    <Button onClick={handleLogout} variant="outline">
      Sign Out
    </Button>
  )
}
