import { React, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  // const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  //
  const BASE_URI = process.env.REACT_APP_API_URL;

  function isValidEmail(email) {
    // You can use a regex pattern or a library for email validation
    // Here's a simple example using a regex pattern:
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleSignIn = async () => {
    setIsError("");

    if (!formData["email"] || !formData["password"]) {
      setIsError("");
      return;
    }

    if (!isValidEmail(formData["email"])) {
      setIsError("Invalid email address.");
      return;
    }

    try {
      setLoading(true);

      let result = await fetch(`${BASE_URI}/user/login`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      setLoading(false);

      if (!result.msg) {
        localStorage.setItem("user", JSON.stringify(result));

        navigate("/");
      } else {
        setIsError(result.msg);
        return;
      }
    } catch (err) {
      setLoading(false);
      setIsError("Something Went Wrong");
    }
  };

  useEffect(() => {
    const companyAuth = localStorage.getItem("company");
    const userAuth = localStorage.getItem("user");

    if (companyAuth || userAuth) {
      navigate("/");
    }
  });

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <center>
              <center className="text-red-500"> {isError} </center>
            </center>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  {!formData["email"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>{" "}
                  {!formData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={handleSignIn}
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </button>
                </div>
                <a
                  href="#"
                  title=""
                  className="text-sm font-semibold text-black hover:underline"
                >
                  {" "}
                  Forgot password?{" "}
                </a>
              </div>
            </form>
            <div className="mt-4 space-y-3">
              <center>
                {" "}
                <span className="text-red-500">
                  <b>*</b>
                </span>{" "}
                <b>indicates required field</b>
              </center>
            </div>
          </div>
        </div>

        <div className="h-full w-full">
          <img
            className="my-3 px-2 mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1557425529-b1ae9c141e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
