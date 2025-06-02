import './index.css'
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { MsalProvider } from "@azure/msal-react"
import { msalInstance } from './auth/msalInstance'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { router } from "./router"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>
)