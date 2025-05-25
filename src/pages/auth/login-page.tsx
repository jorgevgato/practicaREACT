import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";

function LoginPage() {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = credentials;
  const disabled = !username || !password;

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
    <div>
      <h1>Inicia sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
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
      </form>
    </div>
  );
}

export default LoginPage;
