import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/Home";

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
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default App;
