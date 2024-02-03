import { useRef, useEffect } from 'react';
import WebcamComponent from 'react-webcam'; // Renamed to avoid conflict
//import io from 'socket.io-client';
import { Buffer } from 'buffer';

export default function MyWebcam() { // Renamed the component
  const webcamRef = useRef(null);
  // const socket = io('http://localhost:3001');

  useEffect(() => {
    const captureAndSendVideo = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const imageData = imageSrc.split(',')[1];
      const buffer = Buffer.from(imageData, 'base64');
      // socket.emit('videoData', buffer);
      console.log(buffer);
    };

    // Set up a timer to capture and send video every 100 milliseconds
    const videoCaptureInterval = setInterval(captureAndSendVideo, 100);

    // Clear the interval on component unmount
    return () => clearInterval(videoCaptureInterval);
  }, []);

  return (
    <div>
      <WebcamComponent audio={false} ref={webcamRef} height={400} width={400} screenshotFormat="image/jpeg" />
    </div>
  );
}
