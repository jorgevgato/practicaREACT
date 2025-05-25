import { useContext } from "react";
import { AuthContext } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";

function Header() {
  const { isLogged, onLogout } = useContext(AuthContext);
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div></div>
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
