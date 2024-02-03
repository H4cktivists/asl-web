import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      navigate("/game");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User logged in with Google:", user);
      navigate("/game");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="Login">
      <div className="ImageContainer">
        {/* Replace 'image.jpg' with the actual path to your image */}
        <img src="../../public/landing.png" alt="Background" />
      </div>
      <div className="auth-container">
        <h1 className="title">Starry</h1>
        <h1 className="welcome">Welcome Back!</h1>
        <p>Username</p>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
