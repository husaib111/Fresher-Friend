import "./Login.exp.css";
import React, { useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  async function loginUser(event) {
    event.preventDefault();

    if (!checked) {
      alert("Before you can proceed, you must agree to our Privacy Policy.");
    } else {
      const response = await Axios.post(
        "http://localhost:3000/passwordReset?",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        alert("Login Successful!");
        window.location.href = "/home";
      } else {
        alert(
          "Your email/password is incorrect, please check your login information."
        );
      }
    }
  }

  return (
    <div className="login">
      <h1 className="logo" aria-label="Fresher Friend Logo">
        <GiThreeFriends className="FresherFriendLogo" aria-label="Fresher Friend Logo"/>
      </h1>
      <h1 >Fresher Friend</h1>
      <h2>Connecting UoB students</h2>
      <form className="loginForm" aria-label="login form" onSubmit={loginUser}>
        <div className="mb-3 inputDiv">
          <input
            aria-label="email Input"
            className="form-control loginInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@student.bham.ac.uk"
          />
        </div>
        <div className="mb-3 inputDiv">
          <input
            aria-label="password Input"
            className="form-control loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <label className="check-container">
          <input
            aria-label="By ticking, I acknowledge and accept FresherFriend's privacy policy"
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          By continuing, I acknowledge and accept FresherFriend’s&nbsp;
          <a data-testid="privacy policy Link" href="/privacy">
            Privacy Policy
          </a>
          .
        </label>
        <input
          aria-label="login Button"
          type="submit"
          value="Login"
          className="loginButton btn btn-primary"
        ></input>
        <p>
          <a href="/passwordReset" aria-label="forgot Password Link">
            Forgot password
          </a>
        </p>
      </form>
      <hr />
      <div className="createAccount">
        <p>New here?</p>
        <form action="/createAccount">
          <button aria-label="Register Button" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
