import { useState } from "react";
import AdvertsPage from "./pages/adverts/adverts-page";
import LoginPage from "./pages/auth/login-page";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin() {
    setIsLogged(true);
  }

  return isLogged ? <AdvertsPage /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
