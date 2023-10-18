import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);

  const BASE_URI = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  // ##################################### SignUp ########################################
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  function isValidEmail(email) {
    // You can use a regex pattern or a library for email validation
    // Here's a simple example using a regex pattern:
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const storeData = async () => {
    setIsError("");
    if (!formData["cname"] || !formData["email"] || !formData["password"]) {
      setIsError("");
      return;
    }

    if (!isValidEmail(formData["email"])) {
      setIsError("Invalid email address.");
      return;
    }

    if (formData["password"].length < 6) {
      setIsError("Password must be atleast 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      let response = await fetch(`${BASE_URI}/company/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      response = await response.json();

      setIsLoading(false);
      if (response.msg === "Company Registered Successfully") {
        setIsError("");
        setShowSignIn(true);
      } else {
        setIsError(response.msg);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError("Something went wrong");
    }
  }; // End of storeData function

  useEffect(() => {
    const companyAuth = localStorage.getItem("company");
    if (companyAuth) {
      navigate("/");
    }
  });

  // ##################################### SignIn  ########################################
  const [loginData, setLoginData] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value.trim() });
  };

  const verifyData = async () => {
    if (!loginData["email"] || !loginData["password"]) {
      setLoginError("");
      return;
    }

    if (!isValidEmail(loginData["email"])) {
      setLoginError("Invalid email address.");
      return;
    }

    try {
      let response = await fetch(`${BASE_URI}/company/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      response = await response.json();

      if (!response.msg) {
        setLoginError("");

        //
        localStorage.setItem("company", JSON.stringify(response));

        navigate("/company/my-posts");
      } else {
        setLoginError(response.msg);
      }
    } catch (err) {
      setLoginError("Something went wrong");
    }
  }; // End of verifyData function

  return (
    <section className="mt-10 border-collapse">
      <div className="flex justify-center ">
        <button
          className={`btn-toggle ${
            showSignIn ? "active" : ""
          } bg-transparent hover:bg-black hover:text-white border border-black rounded-md py-2 px-4 mr-2`}
          onClick={() => setShowSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={`btn-toggle ${
            showSignIn ? "" : "active"
          } bg-transparent hover:bg-black hover:text-white border border-black rounded-md py-2 px-4`}
          onClick={() => setShowSignIn(false)}
        >
          Sign Up
        </button>
      </div>

      {/*Sign Up*/}
      <div className="items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        {!showSignIn && (
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Create Your Company Account
            </h2>
            <center className="text-red-500"> {isError} </center>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="cname"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Company Name{" "}
                  </label>{" "}
                  {!formData["cname"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  {/*!formData["cname"] && <span className="text-red-500"> cname required </span> */}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Company Name"
                      id="cname"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
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
                    htmlFor="password"
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
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => storeData()}
                  >
                  {isLoading ? "Loading..." : "Create Account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/*Sign In */}
        {showSignIn && (
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your Company Account
            </h2>
            <center className="text-red-500"> {loginError} </center>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>{" "}
                  {!loginData["email"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleLogin}
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
                  {!loginData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleLogin}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => verifyData()}
                  >
                    Sign In
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
          </div>
        )}
        <br />
        <center>
          {" "}
          <span className="text-red-500">
            <b>*</b>
          </span>{" "}
          <b>indicates required field</b>
        </center>
      </div>
    </section>
  );
}
