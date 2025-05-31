import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./context";
import storage from "../../utils/storage";
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";

interface AuthProviderProps {
  defaultIsLogged: boolean;
  children: ReactNode;
}

function AuthProvider({ defaultIsLogged, children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  useEffect(() => {
    const token = storage.local.get("auth") || storage.session.get("auth");
    if (token) {
      setAuthorizationHeader(token);
      setIsLogged(true);
    }
  }, []);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
    storage.local.remove("auth");
    storage.session.remove("auth");
    removeAuthorizationHeader();
  }

  const authValue = { isLogged, onLogin: handleLogin, onLogout: handleLogout };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
