import { type PropsWithChildren, useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import { useRouter } from "@tanstack/react-router"
import NavBar from "./NavBar"
import type { RouterContext } from "@/types/router-context"

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter()
  const msal = useMsal()

  // Only set context once when Layout mounts
  useEffect(() => {
    (router.options.context as RouterContext).auth = msal
  }, [msal, router])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} PSI Internal Tools
      </footer>
    </div>
  )
}
