import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  console.log("user:", user);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser({
      loggedIn: false,
      user: {},
    });
  };
  const navItems = [
    { title: "Start a search", path: "/" },
    { title: "My Jobs", path: "/my-job" },
    { title: "Salary Estimate", path: "/salary" },
    { title: "Post a Job", path: "/post-job" },
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="29"
            height="30"
            viewBox="0 0 29 30"
          >
            <circle
              cx="12.0143"
              cy="12.5343"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />

            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          JobPortal
        </a>
        {/* nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              {" "}
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/*sign up and login btn */}
        {user?.loggedIn ? (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link
              className="py-2 px-5 border rounded bg-blue text-white"
              onClick={() => logout()}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
              Log in
            </Link>
            <Link
              to="/signup"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </div>
        )}
        {/* menu toggler for small devices */}
        <div className="md:hidden block ">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Link to="/login" className="">
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
