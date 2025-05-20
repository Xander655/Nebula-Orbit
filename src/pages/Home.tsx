import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import SignOutButton from '../components/auth/SignOutButton';

function Home() {

    const { accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      const user = accounts[0];
      console.log("Name:", user.name);
      console.log("Email:", user.username); // typically email
    }
  }, [accounts]);

    return <>
    <p>Welcome to the Nebula onboarding portal.</p>;
    {accounts.length > 0 && (
  <div style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
    Logged in as: <strong>{accounts[0].name}</strong> ({accounts[0].username})
  </div>
  
)}
<SignOutButton />
    </>
    
  }
  
  export default Home;
  