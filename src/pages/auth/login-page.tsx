import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import "../../styles/login.css";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../../assets/react.svg";
import { AxiosError } from "axios";

function LoginPage() {
  const { onLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<{message: string} | null> (null)
  const disabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsFetching(true)
      await login(credentials);
      onLogin();

      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });

    } catch (error) {
      if (error instanceof AxiosError) {
        setError({message: error.response?.data?.message})
      }
    
    } finally {
      setIsFetching(false)
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
        {error && (
          <div className="login-error" role="alert" onClick={() => {setError(null)}}>
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
