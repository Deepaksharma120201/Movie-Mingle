import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Shows from "./pages/Shows/Shows";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Movies from "./pages/Movies/Movies";
import Search from "./pages/Search/Search";
import Trending from "./pages/Trending/Trending";
import DetailsPage from "./pages/DetailsPage/Details";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/authProvider";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const isAuthPage = location.pathname === "/login";

  return (
    <div>
      <ToastContainer theme="dark" />
      <AuthProvider>
        {!shouldHideNavbar && <Navbar />}
        <div className={isAuthPage ? "" : "content-wrapper"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:type/:id" element={<DetailsPage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
