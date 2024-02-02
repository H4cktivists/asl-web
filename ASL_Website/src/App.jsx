import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Login from "./components/Login";
import Learn from "./Learn";
import Gesture from "./Gesture";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/gesture" element={<Gesture />} />
      </Routes>
    </BrowserRouter>
  );
}
