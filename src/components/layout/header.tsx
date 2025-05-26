import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import logo from "../../assets/react.svg";
import { Link } from "react-router";

function Header() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <nav>
        {isLogged ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
