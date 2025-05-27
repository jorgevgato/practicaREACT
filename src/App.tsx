import LoginPage from "./pages/auth/login-page";
import AdvertsPage from "./pages/adverts/adverts-page";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import RequireAuth from "./pages/auth/require-auth";
import AdvertDetail from "./pages/adverts/advert-detail-page";
import AdvertCreator from "./pages/adverts/advert-creator-page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adverts"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route
          path="new"
          element={
            <RequireAuth>
              <AdvertCreator />
            </RequireAuth>
          }
        />
        <Route path=":advertId" element={<AdvertDetail />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
