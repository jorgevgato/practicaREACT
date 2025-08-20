import { Link, useNavigate } from "react-router";
/* import { useAuth } from "./context"; */
import { logout } from "./service";
import { authLogout } from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store";
import { getIsLogged } from "../../store/selectors";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  /* const { isLogged, onLogout } = useAuth(); */
  const isLogged = useAppSelector(getIsLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await logout();
    /* onLogout(); */
    dispatch(authLogout());
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
