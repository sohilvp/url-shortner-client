import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
function App() {
  const { email } = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!email && <Route path="/login" element={<LoginPage />} />}
        {!email && <Route path="/register" element={<RegisterPage />} />}
        {email && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
