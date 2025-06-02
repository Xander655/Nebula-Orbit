import { useMsal } from "@azure/msal-react"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect()
  }

  return (
    <Button onClick={handleLogin}>
      Sign In
    </Button>
  )
}
