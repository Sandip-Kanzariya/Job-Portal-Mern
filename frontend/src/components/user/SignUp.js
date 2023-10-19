import { React, useEffect, useState } from "react";
import { useNavigate, useActionData, Link } from "react-router-dom";

export default function SignUp() {
  // All in One
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();
  //
  const BASE_URI = process.env.REACT_APP_API_URL;

  function isValidEmail(email) {
    // You can use a regex pattern or a library for email validation
    // Here's a simple example using a regex pattern:
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const storeData = async () => {
    setIsError("")
    
    if (!formData["name"] || !formData["email"] || !formData["password"]) {
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
      let result = await fetch(`${BASE_URI}/user/register`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      setIsLoading(false);
      // console.warn(result);
      if (result.msg === "User Registered Successfully") {
        navigate("/signin");
      }
      else{
        setIsError(result.msg);
      }
    } catch (err) {
      setIsLoading(false);
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="px-2 py-3 h-full w-full rounded-md object-cover object-top"
              
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">Get Hire</h3>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Grab Apportunity
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Find Your Favourite Role & Job
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <center>
                  <center className="text-red-500"> {isError} </center>
                </center>
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Name{" "}
                  </label>{" "}
                  {!formData["name"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name"
                      required
                      id="name"
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
                      required
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
                  </label>
                  {!formData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={storeData} // Call Function To Get Data From Form
                  >
                    {isLoading ? "Loading..." : "Create Account"}
                  </button>
                </div>
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
      </div>
    </section>
  );
}
