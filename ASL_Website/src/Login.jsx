import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <>
      <div id="login-div">Login</div>
      <Link to={"/game"}>Game Page </Link>
    </>
  );
}
