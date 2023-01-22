import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/PatientSchedule";



export default function App() {

return (

  <Router>

   <div>

   <Navbar />

   <Routes>

    

   </Routes>

   </div>

  </Router>

);

}