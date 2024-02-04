// Learn.jsx
import React from "react";
import "./Learn.css";
import Webcam from "./Webcam"; // Import the Webcam component

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
          <div id="step1-img"></div>
        </div>
        <div id="step2" className="lng-steps">
          <div id="step2-img"></div>
        </div>
        <div id="step3" className="lng-steps">
          <div id="step3-img"></div>
        </div>
        <div id="next-img"></div>
      </div>

      <div id="lng-webcam">
        <div id="lng-webcam-bg">
          <h1>{sessionStorage.getItem("currLetter")}</h1>
          <div id="webcam-div">
            {/* Use the Webcam component here */}
            <Webcam />
          </div>
        </div>
      </div>
    </div>
  );
}
