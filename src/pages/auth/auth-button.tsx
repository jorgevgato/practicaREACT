import { Link } from "react-router";
import { useAuth } from "./context";
import { logout } from "./service";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return isLogged ? (
    <button className={className} onClick={handleLogoutClick}>
      Logout
    </button>
  ) : (
    <Link to="/login">
      <button className={className}>Login</button>
    </Link>
  );
}
