import { Link } from "react-router";
import { useAuth } from "./context";
import { logout } from "./service";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return isLogged ? (
    <button onClick={handleLogoutClick}>Logout</button>
  ) : (
    <Link to="/login">
      <button>Login</button>
    </Link>
  );
}
