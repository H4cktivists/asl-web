import React from "react";
import Gesture from "./Gesture"; 

export default function Learn(props) {
  return (
    <div>
      <div onClick={() => handleClick()}>Learn {sessionStorage.getItem("currLetter")}</div>
      <Gesture />
    </div>
  );
}
