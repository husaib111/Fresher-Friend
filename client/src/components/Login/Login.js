import "./Login.css";
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
      alert("Before you can proceed, you need to agree to the Privacy Policy.");
    } else {
      const response = await Axios.post(
        "http://www.fresher-friend.bham.team:5001/login",
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
        window.location.href = "/homePage";
      } else {
        alert(
          "Your email or password is incorrect, please check your login information!"
        );
      }
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
        <div className="mb-3">
          <input
            aria-label="emailInput"
            className="form-control loginInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@student.bham.ac.uk"
          />
        </div>
        <div className="mb-3">
          <input
            aria-label="passwordInput"
            className="form-control loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <label className="check-container">
          <input
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          By continuing, I acknowledge FresherFriend’s
          <a href="/">Privacy Policy</a>.
        </label>
        <input
          aria-label="loginButton"
          type="submit"
          value="Login"
          className="loginButton btn btn-primary"
        ></input>
        <p>
          <a href="/login">Forgot password</a>
        </p>
        <PrivacyPolicy />
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
