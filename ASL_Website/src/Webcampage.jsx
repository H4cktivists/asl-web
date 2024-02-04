import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./WebcamPage.css";

const WebcamPage = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [correctedWord, setCorrectedWord] = useState("");

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Send the captured image to the server for autocorrection
    axios
      .post("http://localhost:5000/correct", { imageSrc })
      .then((response) => {
        setCorrectedWord(response.data.corrected_word);
      })
      .catch((error) => {
        console.error("Error correcting spelling:", error);
      });
  };

  return (
    <div className="WebcamPage">
      <h1>Webcam Page</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <button onClick={capture}>Capture Photo</button>

      {capturedImage && (
        <div className="captured-image-container">
          <img src={capturedImage} alt="Captured" />
          <p>Corrected Word: {correctedWord}</p>
        </div>
      )}
    </div>
  );
};

export default WebcamPage;
