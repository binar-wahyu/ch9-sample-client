import { createContext, useState, useContext, useEffect } from "react";

// Key to save access token on localStorage
const KEY_ACCESS_TOKEN = "accessToken";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ProvideAuth");
  }
  return context;
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// When you fetch an API that requires auth header, just call this function to get the access token value
export function getAccessToken() {
  return localStorage.getItem(KEY_ACCESS_TOKEN);
}

async function getCurrentUser() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }

  const response = await fetch("http://localhost:4000/auth/whoami", {
    headers: new Headers({ Authorization: accessToken }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  async function login(accessToken) {
    localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
    const currentUser = await getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(false);
    }
  }

  function logout() {
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    setUser(false);
  }

  useEffect(() => {
    let ignore = false;

    async function getData() {
      const currentUser = await getCurrentUser();

      if (ignore) return;

      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(false);
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  // Return the user object and auth related functions
  return {
    user,
    login,
    logout,
  };
}
