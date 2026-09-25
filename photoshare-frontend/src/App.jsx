import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Profile from "./components/users/Profile";
import Profiles from "./components/users/Profiles";
import Gallery from "./components/photos/Gallery";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import { isLoggedIn } from "./utils/isLoggedIn";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/gallery" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn() ? <Navigate to="/gallery" replace /> : <Register />
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/users" element={<Profiles />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={isLoggedIn() ? "/gallery" : "/"} replace />}
        />
      </Routes>
    </>
  );
}
export default App;
