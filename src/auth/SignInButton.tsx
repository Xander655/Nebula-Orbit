import { useMsal } from "@azure/msal-react";

export default function SignInButton() {
  const { instance } = useMsal();

  return (
    <button onClick={() => instance.loginRedirect()}>
      Sign In
    </button>
  );
}
