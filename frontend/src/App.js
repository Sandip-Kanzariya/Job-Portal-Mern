import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Nav from "./components/general/Nav";
import { SignIn } from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/general/Home";
import PostForm from "./components/post/PostForm";
import { Auth } from "./components/company/Auth";
import Apply from "./components/post/Apply";
import CmpPost from "./components/company/CmpPost";

function App() {
  const BASE_URI = process.env.REACT_APP_API_URL;

  return (
    // <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/company" element={<Auth />} />
        <Route path="/company/add-post" element={<PostForm />} />
        <Route path="/company/my-posts" element={<CmpPost />} />
        
        <Route
          path="/post/:postid"
          element={<Apply />}
        />

      </Routes>
    </BrowserRouter>
    // </div>

   
  );
}

export default App;
