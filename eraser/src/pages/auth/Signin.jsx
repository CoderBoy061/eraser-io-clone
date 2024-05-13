import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/public/logo-1.png";
import google from "../../assets/public/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginFunction } from "@/redux/actions/user.action";

const Signin = () => {
  const dispatch = useDispatch();

  const onSuccessHandler = async (credentialResponse) => {
    try {
      const profile = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentialResponse.access_token}`
      );
      if (profile && profile.data !== null) {
        dispatch(
          googleLoginFunction(
            profile?.data?.email,
            profile?.data?.given_name,
            profile?.data?.picture
          )
        );
      }
    } catch (error) {
      toast.error("An error occurred while logging in with Google");
    }
  };
  const onErrorHandler = () => {
    toast.error("An error occurred while logging in with Google");
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.replace("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-5">
          <button
            className="flex w-full justify-center border border-black rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => loginWithGoogle()}
          >
            <span>
              <img src={google} className="h-6 mr-5" />{" "}
            </span>
            Continue with Google
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
