import "./Login.css";
import React, { useState } from "react";
import { GiThreeFriends } from "react-icons/gi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("https://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    alert("hi1");

    const data = await response.json();

    alert("hi2");

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Successful!");
      window.location.href = "/homePage";
    } else {
      alert(
        "Your email or password is incorrect, please check your login information!"
      );
    }
  }

  return (
    <div className="login">
      <h1 className="logo">
        <GiThreeFriends className="icon" />
      </h1>
      <h1>Fresher Friend</h1>
      <h2>Connecting UoB students</h2>
      <form className="loginForm" onSubmit={loginUser}>
        <div class="mb-3">
          <input
            className="form-control loginInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@student.bham.ac.uk"
          />
        </div>
        <div class="mb-3">
          <input
            className="form-control loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <input
          type="submit"
          value="Login"
          class="loginButton btn btn-primary"
        ></input>
        <p>
          <a href="/login">Forgot password</a>
        </p>
      </form>
      <hr />
      <div className="createAccount">
        <p>New here?</p>
        <form action="/register">
          <button className="btn btn-primary">Create an Account</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
