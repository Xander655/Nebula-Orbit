import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import type { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Welcome to the Nebula Admin Portal</h2>
        <p>This is an internal tool for authorized PSI users only.</p>
        <button onClick={() => instance.loginRedirect()}>🔐 Sign In</button>
      </div>
    );
  }

  return <>{children}</>;
}


