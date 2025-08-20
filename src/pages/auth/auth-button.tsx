import { Link, useNavigate } from "react-router";
/* import { useAuth } from "./context"; */
import { logout } from "./service";
import { useAuth, useLogoutAction } from "../../store/hooks";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  /* const { isLogged, onLogout } = useAuth(); */
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await logout();
    /* onLogout(); */
    logoutAction();
    navigate("/", { replace: true });
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
