import LoginPage from "./pages/auth/login-page";
import AdvertsPage from "./pages/adverts/adverts-page";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/" element={<Navigate to="/adverts" />} />
      {/* <Route path="adverts/new" element={<NewAdvertPage />} />*/}
      {/* <Route path="adverts/:advertId" element={<AdvertPage />} />*/}
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
