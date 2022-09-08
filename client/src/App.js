import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import NavigationBar from "./components/NavigationBar";
import { useSelector } from "react-redux";
import UserManagement from "./Pages/UserManagment";
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  const { userInfo } = useSelector((state) => state.user);

  const isAdmin = userInfo?.role === "admin";
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/Products" element={<Products />} />

          {isAdmin && <Route path="/Register" element={<Register />} />}
          {isAdmin &&<Route path="/UserManagment" element={<UserManagement />} />}
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
