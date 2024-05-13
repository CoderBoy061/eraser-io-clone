import React from "react";
import blackLogo from "../assets/public/logo-1.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeHeader = () => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-8 sm:px-6 lg:px-8 py-10">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <img src={blackLogo} alt="Logo" className="h-6  " />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  Careers{" "}
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  History{" "}
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  Services{" "}
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  Projects{" "}
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  href="#"
                >
                  {" "}
                  Blog{" "}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
              <p className="text-black text-md font-bold">{user?.email}</p>
              <p className="text-slate-500 text-s">{user?.username}</p>
              </div>
            
            </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  to="/login"
                  className="block rounded-md  px-5 py-2.5 text-sm font-medium text-black transition hover:text-indigo-600 "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="hidden rounded-md px-5 py-2.5 text-sm font-medium text-black transition hover:text-indigo-600 sm:block"
                  href="#"
                >
                  Register
                </Link>
              </div>
            )}

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
