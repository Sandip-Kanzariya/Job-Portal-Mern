
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

import Nav from "./components/general/Nav"
import { SignIn } from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import Home from './components/general/Home';
import PostForm from './components/post/PostForm';
import { Auth } from './components/company/Auth';

function App() {
  return (
    // <div className="App">
    <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/add-post' element={<PostForm/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/company' element={<Auth/>} />
          </Routes>
        </BrowserRouter>
    // </div>
  );
}

export default App;
