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

import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
  
function App() {
  
  return (

  <BrowserRouter>
    <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route exact path="/login" element = {<LoginPage/>}/>
      <Route exact path="/register" element = {<RegisterPage/>}/>
    </Routes>
  </BrowserRouter>
  
  );
  
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           hello
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;