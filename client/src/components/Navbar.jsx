import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Navbar() {
  const { user, token } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("user in nav", token, user);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    // { link: "Login", path: "/sign-in" },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 flex items-center gap-2"
          >
            <FaBlog className="inline-block" />
            Bookify
          </Link>

          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base
                    text-black uppercase cursor-pointer hover:text-blue-700"
              >
                {link}
              </Link>
            ))}

            {user == null && token == null ? (
              <Link
                to="/sign-in"
                className="block text-base
                  text-black uppercase cursor-pointer hover:text-blue-700"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/user/dashboard"
                className="block text-base
                  text-black uppercase cursor-pointer hover:text-blue-700"
              >
                Dashboard
              </Link>
            )}
          </ul>

          <div>
            <button className="space-x-12 hidden lg:flex items-center">
              <FaBarsStaggered className="w-5 hover:text-blue-700" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-base
                 text-white uppercase cursor-pointer"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
