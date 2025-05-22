import { useMsal } from "@azure/msal-react";

export default function SignOutButton() {
  const { instance } = useMsal();

  return (
    <button onClick={() => instance.logoutRedirect()}>
      Sign Out
    </button>
  );
}
