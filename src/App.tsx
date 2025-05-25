import { useState } from "react";
import AdvertsPage from "./pages/adverts/adverts-page";
import LoginPage from "./pages/auth/login-page";

interface AppProps {
  defaultIsLogged: boolean;
}

function App({ defaultIsLogged }: AppProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin() {
    setIsLogged(true);
  }

  return isLogged ? <AdvertsPage /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
