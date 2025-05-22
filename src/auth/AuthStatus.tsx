import { useMsal } from "@azure/msal-react";

export default function AuthStatus() {
  const { accounts } = useMsal();
  const user = accounts[0];

  return user ? (
    <div style={{ fontSize: "0.9rem" }}>
      Logged in as <strong>{user.name}</strong> ({user.username})
    </div>
  ) : null;
}
