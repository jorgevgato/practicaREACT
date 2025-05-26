import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import logo from "../../assets/react.svg";

function Header() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div>
        <img src={logo} />
      </div>
      <nav>
        {isLogged ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <button>Login</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
