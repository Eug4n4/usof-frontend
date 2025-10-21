import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import NoMatch from "./pages/404";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthProvider from "./contexts/AuthProvider";
import Profile from "./pages/Profile";
import Categories from "./pages/categories/Categories";
import EditCategory from "./pages/categories/EditCategory";
import RoleChecker from "./components/RoleChecker";
import Logout from "./pages/auth/Logout";
import DeleteCategory from "./pages/categories/DeleteCategory";
import CreatePost from "./pages/post/CreatePost";
import PasswordReset from "./pages/auth/PasswordReset";
import SetNewPassword from "./pages/auth/SetNewPassword";
import Post from "./pages/post/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="password-reset/:token" element={<SetNewPassword />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="profile" element={<Profile />} />
        <Route path="categories" element={<Categories />} />

        <Route
          path="categories/:id/edit"
          element={
            <RoleChecker roles={["admin"]}>
              <EditCategory />
            </RoleChecker>
          }
        />
        <Route
          path="categories/:id/delete"
          element={
            <RoleChecker roles={["admin"]}>
              <DeleteCategory />
            </RoleChecker>
          }
        />
        <Route
          path="post"
          element={
            <RoleChecker roles={["admin", "user"]}>
              <CreatePost />
            </RoleChecker>
          }
        />

        <Route path="post/:id" element={<Post />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="main_wrapper">
          <Sidebar />
          <main id="content">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
