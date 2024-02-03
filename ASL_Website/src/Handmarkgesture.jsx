import { FilesetResolver, HandLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import React, { useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs';

export default function HandLandmarkDetection() {
    useEffect(() => {
        let handLandmarker;
        let runningMode = "VIDEO";
        let enableWebcamButton;
        const videoHeight = "360px";
        const videoWidth = "480px";

        const video = document.getElementById("webcam");
        const canvasElement = document.getElementById("output_canvas");
        const canvasCtx = canvasElement.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);

        async function runDemo() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: '../public/models/hand_landmarker.task',
                },
                runningMode: 'VIDEO',
                numHands: 1,
            });
        }

        runDemo();

        let webcamRunning = false;

        if (hasGetUserMedia()) {
            enableWebcamButton = document.getElementById("webcamButton");
            enableWebcamButton.addEventListener("click", enableCam);
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }

        function enableCam(event) {
            if (!handLandmarker) {
                console.log("Wait! handLandmarker not loaded yet.");
                return;
            }

            if (webcamRunning === true) {
                webcamRunning = false;
                enableWebcamButton.innerText = "ENABLE PREDICTIONS";
            } else {
                console.log("webcam was off");
                webcamRunning = true;
                enableWebcamButton.innerText = "DISABLE PREDICTIONS";
            }

            const constraints = {
                video: true,
            };

            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                video.srcObject = stream;
                video.addEventListener("loadeddata", predictWebcam);
            });
        }

        async function predictWebcam() {
            let results;  // Declare results outside the loop
        
            if (runningMode === "IMAGE") {
                runningMode = "VIDEO";
                await handLandmarker.setOptions({ runningMode: runningMode });
            }
        
            let totalLandmarks = [];
        
            for (let instance = 0; instance < 10; instance++) {
                const nowInMs = Date.now();
                results = handLandmarker.detectForVideo(video, nowInMs);
        
                if (results.worldLandmarks) {
                    for (const worldLandmarks of results.worldLandmarks) {
                        for (const landmark of worldLandmarks) {
                            totalLandmarks.push(landmark.x || 0, landmark.y || 0, landmark.z || 0);
                        }
                    }
                } else {
                    for (let k = 0; k < 21; k++) {
                        totalLandmarks.push(0, 0, 0);
                    }
                }
            }
        
            while (totalLandmarks.length < 630) {
                totalLandmarks.push(0, 0, 0);
            }
        
            console.log("Total World Landmarks Array:", totalLandmarks);

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasElement.style.height = videoHeight;
            video.style.height = videoHeight;
            canvasElement.style.width = videoWidth;
            video.style.width = videoWidth;

            if (results.landmarks) {
                for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(
                        landmarks,
                        HandLandmarker.HAND_CONNECTIONS,
                        {
                            color: "#00FF00",
                            lineWidth: 5,
                        }
                    );
                    drawingUtils.drawLandmarks(landmarks, {
                        color: "#FF0000",
                        lineWidth: 2,
                    });
                }
            }

            canvasCtx.restore();

            if (webcamRunning === true) {
                window.requestAnimationFrame(predictWebcam);
            }
        }

    }, []);

    return (
        <div>
            <h1>Hello hand landmark detection</h1>
            <div id="liveView" className="videoView">
                <button id="webcamButton">
                    <span>ENABLE WEBCAM</span>
                </button>
                <div style={{ position: "relative" }}>
                    <video id="webcam" style={{ width: "1280px", height: "720px", position: "absolute", left: "0px", top: "0px" }} autoPlay playsInline></video>
                    <canvas className="output_canvas" id="output_canvas" width="1280" height="720" style={{ position: "absolute", left: "0px", top: "0px" }}></canvas>
                </div>
            </div>
        </div>
    );
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
