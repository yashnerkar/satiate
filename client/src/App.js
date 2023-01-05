import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Map from "./components/Map";
import Register from "./components/Register";
import Registeruser from "./components/Registeruser";
import Organization from "./components/Organization";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home> </Home>} />
        <Route path="/map" element={<Map> </Map>} />
        <Route path="/register" element={<Register> </Register>} />
        <Route path="/registeruser" element={<Registeruser> </Registeruser>} />
        <Route path="/contact" element={<Contact />} />{" "}
        <Route path="/about" element={<About />} />{" "}
        <Route exact path="/organizations/:name" element={<Organization />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
