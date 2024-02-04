import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import "./game.css";

export default function Game() {
  const [letters, setLetters] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H"
  ]);

  useEffect(() => {
    console.log("rendered");
    sessionStorage.setItem("completedElements", []);
  });

  //   const history = useHistory();

  function handleClick(letter) {
    sessionStorage.setItem("currLetter", letter);
    window.location.href = "/learn";
  }

  return (
    <div className="LoginGame">
      <div className="ImageContainer">
        <img src="../../public/map.svg" alt="Background" />
      </div>
      <div className="img2">
        {letters.map((i, index) => (
          <div
            key={index}
            className="game-element"
            onClick={() => handleClick(i)}
          >
            element {i}
          </div>
        ))}
      </div>
    </div>
  );
}