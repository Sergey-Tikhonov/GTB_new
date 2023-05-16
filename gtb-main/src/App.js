import "./App.css";
import Header from "./Components/Header/Header";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";

import { Signup } from "./Components/Signup/Signup";
import { Home } from "./Components/Home/Home";
import { Signin } from "./Components/Signin/Signin";
import { Report } from "./Components/Report/Report";
import { AllOfficers } from "./Components/AllOfficers/AllOfficers";
import { Messages } from "./Components/Messages/Messages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [admin, setAdmin] = useState(
    localStorage.getItem(localStorage.getItem("admin") || false)
  );



  return (
    <div className="App">
      <Router>
        <Header admin={admin} setAdmin={setAdmin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="auth/sign_up" element={<Signup />}></Route>
            <Route
              path="auth/sign_in"
              element={
                <Signin admin={admin} setAdmin={setAdmin}/>
              }
            ></Route>
            <Route
              path="public/report"
              element={<Report admin={admin} />}
            ></Route>
            <Route
              path="/officers"
              element={
                <AllOfficers />
              }
            ></Route>
            <Route
              path="/cases/"
              element={<Messages />}
            ></Route>
            <Route
              path="/officers/:id"
              element={
                <AllOfficers />
              }
            ></Route>
            <Route
              path="/cases/:id"
              element={<Messages/>}
            ></Route>
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token')
  if(!token){
    return <Navigate to="auth/sign_in" />
  }
}


export default App;
