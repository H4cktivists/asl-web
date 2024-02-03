import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Webcam from "react-webcam";

const WebcamVideo = () => {
  const webcamRef = useRef(null);
  const socket = useRef(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    // Connect to the Flask server using Socket.IO
    socket.current = io("http://localhost:5000");

    // Start capturing frames when the component mounts
    setCapturing(true);

    return () => {
      // Disconnect from the server when the component unmounts
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Function to capture and send frames to the server
    const captureAndSendFrame = () => {
      // const video = webcamRef.current.video;

      // const canvas = document.createElement("canvas");
      // canvas.width = video.videoWidth;
      // canvas.height = video.videoHeight;
      // canvas.getContext("2d").drawImage(video, 0, 0);

      // const data = canvas.toDataURL("image/png");

      const imageSrc = webcamRef.current.getScreenshot();
      socket.current.emit("catch-frame", { image: true, buffer: imageSrc });
    };

    // Capture and send frames every 100 milliseconds while capturing is true
    let interval;
    if (capturing) {
      interval = setInterval(captureAndSendFrame, 20);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [capturing]);

  return (
    <div>
      {/* Display the webcam video using react-webcam */}
      <Webcam ref={webcamRef} style={{
        width: "100%",
        aspectRatio: 1280/720
      }} 
        screenshotFormat="image/png" videoConstraints={{
        aspectRatio: 1280/720,
        facingMode: "user"
      }}/>

      {/* Button to start/stop capturing */}
      <button onClick={() => setCapturing(!capturing)}>
        {capturing ? "Stop Capturing" : "Start Capturing"}
      </button>
    </div>
  );
};

export default WebcamVideo;
