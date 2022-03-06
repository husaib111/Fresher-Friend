import "./Login.css";
import React from 'react';
import { GiThreeFriends } from "react-icons/gi";

class Login extends React.Component {
  render(){
    return (
      <div className="login">
        <h1 className="logo">
          <GiThreeFriends className="icon" />
        </h1>
        <h1>
          Fresher Friend
        </h1>
        <h2>Connecting UoB students</h2>
        <form className="loginForm">
          <div class="mb-3">
            <input 
              className="form-control loginInput"
              type="email"
              placeholder="example@student.bham.ac.uk"
            />
          </div>
          <div class="mb-3">
            <input
              className="form-control loginInput"
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="loginButton btn btn-primary">Log In</button>
          <p><a href="/login">Forgot password</a></p>
        </form>
        <hr/>
        <div className="createAccount">
          <p>New here?</p>
          <form action="/register">
            <button className="btn btn-primary">Create an Account</button>
          </form>
        </div>
      </div>
    );
  } 
}

export default Login;
