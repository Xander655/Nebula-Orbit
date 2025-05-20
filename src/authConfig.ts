export const msalConfig = {
    auth: {
      clientId: "dc506a56-1e30-42ce-a4ac-a316f2a6e336", // from Entra ID app registration
      authority: "https://login.microsoftonline.com/09a96d2f-68a1-46da-beec-ff57669fc6b8", // or /organizations
      redirectUri: "http://localhost:5173", // must match what's registered in Entra
    },
    cache: {
      cacheLocation: "sessionStorage", // or localStorage
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["openid", "profile", "email"], // Add API scope here if needed
  };
  