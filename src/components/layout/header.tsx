import logo from "../../assets/react.svg";
import { Link } from "react-router";
import AuthButton from "../../pages/auth/auth-button";

function Header() {

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <nav>
        <Link to="/adverts/new">Crear anuncio</Link>
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
