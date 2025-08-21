import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
/* import { useAuth } from "./context"; */
import "../../styles/form.css";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../../assets/react.svg";
import { AxiosError } from "axios";
import { useLoginAction } from "../../store/hooks";

function LoginPage() {
  /* const { onLogin } = useAuth(); */
  const loginAction = useLoginAction();
  const location = useLocation();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { username, password } = credentials;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const disabled = !username || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRememberMeChange(event: ChangeEvent<HTMLInputElement>) {
    setRememberMe(event.target.checked);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsFetching(true);
      await login(credentials, rememberMe);
      /* onLogin(); */
      loginAction();

      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({ message: error.response?.data?.message });
      }
    } finally {
      setIsFetching(false);
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
              name="username"
              value={username}
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
          <label className="remember-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span>Recordar contraseña</span>
          </label>
          <Link to="/">
            {" "}
            <img src={logo} alt="Ir al inicio" className="login-logo" />
          </Link>
        </form>
        {error && (
          <div
            className="form-error"
            role="alert"
            onClick={() => {
              setError(null);
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
