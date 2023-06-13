import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
function Router() {
  const { user } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={!user ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route index element={user ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
