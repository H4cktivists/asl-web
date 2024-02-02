import React, { useState } from "react";
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

  //   const history = useHistory();

  function handleClick(letter) {
    sessionStorage.setItem("currLetter", letter);
    window.location.href = "/learn";
  }

  return (
    <div>
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
  );
}