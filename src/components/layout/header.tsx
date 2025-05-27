import logo from "../../assets/react.svg";
import { Link } from "react-router";
import "../../styles/header.css";
import AuthButton from "../../pages/auth/auth-button";

function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <nav className="buttonContainer">
        <Link className="navButton" to="/adverts/new">
          Crear anuncio
        </Link>
        <AuthButton className="navButton" />
      </nav>
    </header>
  );
}

export default Header;
