import { logout } from "../../pages/auth/service";

export interface HeaderProps {
  isLogged: boolean;
  onLogout: () => void;
}

function Header({ isLogged, onLogout }: HeaderProps) {
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
