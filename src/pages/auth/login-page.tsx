import type { FormEvent } from "react";
import { login } from "./service";

interface LoginPageProps {
  onLogin: () => void
}

function LoginPage({onLogin}: LoginPageProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({
        username: event.target.username.value,
        password: event.target.password.value,
      });
      onLogin()

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
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;
