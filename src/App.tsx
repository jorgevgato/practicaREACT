import LoginPage from "./pages/auth/login-page";
import { useAuth } from "./pages/auth/context";
import AdvertsPage from "./pages/adverts/adverts-page";

function App() {
  const { isLogged } = useAuth();
  return isLogged ? <AdvertsPage /> : <LoginPage />;
}

export default App;
