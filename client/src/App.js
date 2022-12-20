import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/home" element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoutes() {
  const auth = localStorage.getItem("accessToken");

  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
}
