// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import NavBar from "./components/views/NavBar/NavBar";
// import Footer from "./components/views/Footer/Footer";
// import LandingPage from "./components/views/LandingPage/LandingPage";
// import LoginPage from "./components/views/LoginPage/LoginPage";
// import RegisterPage from "./components/views/RegisterPage/RegisterPage";

// function App() {
//     return (
//         <>
//             <NavBar />
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                 </Routes>
//             </Router>
//             <Footer />
//          </>
//     );
// }

// export default App;
import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'


export default function App() {

  const NewLandongPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/" element={NewLandongPage()}/>
           
          <Route exact path="/login" element={NewLoginPage()}/>
          
          <Route exact path="/register" element={NewRegisterPage()}/>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}