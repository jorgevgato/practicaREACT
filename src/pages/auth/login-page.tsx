import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import "../../styles/login.css";
import { Link } from "react-router";
import logo from "../../assets/react.svg";

function LoginPage() {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const disabled = !email || !password;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(credentials);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="main-container">
      <div className="login-page">
        <h1>Inicia sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" disabled={disabled}>
            Iniciar sesión
          </button>
          <Link to="/">
            {" "}
            <img src={logo} alt="Ir al inicio" className="login-logo" />
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
