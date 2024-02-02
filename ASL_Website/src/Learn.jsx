import React from "react";

export default function Learn(props) {
  
  return (
    <div onClick={() => handleClick()}>
      Learn {sessionStorage.getItem("currLetter")}
    </div>
  );
}
