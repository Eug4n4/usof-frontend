import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import NoMatch from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <div className="main_wrapper">
        <Sidebar />
        <main id="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
