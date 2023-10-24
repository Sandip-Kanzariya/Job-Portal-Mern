"use client";

import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  {
    // 0
    name: "Home",
    href: "/",
    active: true,
  },
  {
    // 1
    name: "My Posts",
    href: "/company/my-posts",
    active: false,
  },
  {
    // 2
    name: "Add Post",
    href: "company/add-post",
    active: false,
  },
  {
    // 3
    name: "Profile",
    href: "/profile",
    active: false,
  },
  {
    // 4
    name: "SignIn",
    href: "/signin",
    active: true,
  },
  {
    // 5
    name: "SignUp",
    href: "/signup",
    active: true,
  },
  {
    // 6
    name: "Company Zone",
    href: "/company",
    active: true,
  },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const companyAuth = localStorage.getItem("company");
  const userAuth = localStorage.getItem("user");

  const navigate = useNavigate();

  if (userAuth) {
    menuItems[1].active = false;
    menuItems[2].active = false;
    menuItems[3].active = true;
    menuItems[4].active = false;
    menuItems[5].active = false;
    menuItems[6].active = false;
  }

  if (companyAuth) {
    menuItems[1].active = true;
    menuItems[2].active = true;
    menuItems[3].active = false;
    menuItems[4].active = false;
    menuItems[5].active = false;
    menuItems[6].active = false;
  }

  const logOut = () => {
    localStorage.removeItem("company");
    localStorage.removeItem("user");

    menuItems[1].active = false;
    menuItems[2].active = false;
    menuItems[3].active = false;
    menuItems[4].active = true;
    menuItems[5].active = true;
    menuItems[6].active = true;

    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-slate-100 border border-b-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img
              src={process.env.PUBLIC_URL + "images/logo.png"}
              className="h-10"
            />
          </span>

          <span className="font-bold">JOB Finder</span>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    className={({ isActive }) =>
                      `inline-flex items-center text-sm font-semibold 
                    ${isActive ? "text-orange-800" : "text-gray-800"} 
                    hover:text-gray-900`
                    }
                    to={item.href}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : (
                <></>
              )
            )}

            {userAuth || companyAuth ? (
              <li>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        {/*<div className="flex grow justify-end">
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray-100 border border-black px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          ></input>
            </div>*/}

        {/* <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
            <img
              className="h-10 w-10 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
          </span>
            </div> */}

        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <img
                        src={process.env.PUBLIC_URL + "images/logo.png"}
                        className="h-10"
                      />
                    </span>
                    <span className="font-bold">JOB</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) =>
                      item.active ? (
                        <NavLink
                          className={({ isActive }) =>
                            `-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 
                        ${isActive ? "text-orange-800" : "text-gray-800"}`
                          }
                          to={item.href}
                          key={item.name}
                        >
                          <span className="ml-3 text-base font-medium">
                            {item.name}
                          </span>
                          <span>
                            <ChevronRight className="ml-3 h-4 w-4" />
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )
                    )}

                    {userAuth || companyAuth ? (
                      <li>
                        <button
                          type="button"
                          className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          onClick={logOut}
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <></>
                    )}
                  </nav>
                </div>

                {/*<div className="ml-3 mt-4 flex items-center space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                    alt="Dan_Abromov"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">Dan Abromov</span>
                    <span className="text-sm font-medium text-gray-500">@dan_abromov</span>
                  </span>
                  </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
