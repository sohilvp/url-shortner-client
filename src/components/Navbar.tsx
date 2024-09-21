import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { email } = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
      { withCredentials: true }
    );
    if (response.status === 204) {
      dispatch(clearUser());
      navigate("/");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between h-16 bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        {email && (
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Dashboard
          </Link>
        )}
        {!email && (
          <Link
            to="/register"
            className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Register
          </Link>
        )}
        {!email && (
          <Link
            to="/login"
            className="px-3 py-2 rounded-md text-sm font-medium  text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Login
          </Link>
        )}
        {email && (
          <Link
            to="/"
            onClick={handleLogout}
            className="block px-3 py-2 rounded-md text-base  text-white font-medium bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Logout
          </Link>
        )}
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } absolute top-16 inset-x-0 bg-gray-800 text-white min-h-screen z-10`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {email && (
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Dashboard
            </Link>
          )}
          {!email && (
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Register
            </Link>
          )}
          {!email && (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Login
            </Link>
          )}
          {email && (
            <Link
              to="/"
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
