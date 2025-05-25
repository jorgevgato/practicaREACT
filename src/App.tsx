import { useState } from "react";
import AdvertsPage from "./pages/adverts/adverts-page";
import LoginPage from "./pages/auth/login-page";
import { AuthContext } from "./pages/auth/context";

interface AppProps {
  defaultIsLogged: boolean;
}

function App({ defaultIsLogged }: AppProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
  }

  const authValue = { isLogged, onLogin: handleLogin, onLogout: handleLogout };

  return (
    <AuthContext.Provider value={authValue}>
      {isLogged ? <AdvertsPage /> : <LoginPage />};
    </AuthContext.Provider>
  );
}

export default App;
