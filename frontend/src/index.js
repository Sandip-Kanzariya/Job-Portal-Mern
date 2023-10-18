import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/general/Home";
import Nav from "./components/general/Nav";
import { SignIn } from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import { Auth } from "./components/company/Auth";
import Apply from "./components/post/Apply";

const BASE_URI = process.env.REACT_APP_API_URL;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Nav />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route path="company">
        <Route index element={<Auth />} />
        <Route path="my-posts" element={<Auth />} />
      </Route>

      <Route path="post">
        <Route index element={<Home />} />
        <Route
          path=":postid"
          loader={({ params }) => {
            return fetch(`${BASE_URI}/company/post/${params.postid}`);
          }}
          element={<Apply />}
        />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
{/*<RouterProvider router={router} />*/}
    <App/>
  </React.StrictMode>
);
