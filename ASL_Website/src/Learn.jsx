import React from "react";
import "./Learn.css";
import Progressbar from "./components/progressbar";

export default function Learn() {
  return (
    <div id="lng-main">
      <div id="lng-bg">
        <div
          id="lng-back-btn"
          onClick={() => {
            window.location.href = "/game";
          }}
        ></div>
        <div id="step1" className="lng-steps">
          {/* <div id="step1-img"></div> */}
        </div>
        <div id="progressbar" >
          <Progressbar value={30} />
        </div>
       
        <div id="next-img"></div>
      </div>

      <div id="lng-webcam">
        <div id="lng-webcam-bg">
          <h1>{sessionStorage.getItem("currLetter")}</h1>
          <div id="webcam-div"></div>
        </div>
      </div>
      {/* <Gesture /> */}

      {/* <div id="lng-webcam-bg"></div> */}
    </div>
  );
}
