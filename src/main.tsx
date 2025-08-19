import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import AuthProvider from "./pages/auth/auth-provider.tsx";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "./components/errors/error-boundary.tsx";
import configureStore from "./store/index.ts";
import { Provider } from "react-redux";

const store = configureStore();

const accessToken = storage.local.get("auth") || storage.session.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider defaultIsLogged={accessToken ? true : false}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
