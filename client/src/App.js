import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Account from "./components/Account/Account";
import OtherAccount from "./components/Account/OtherAccount";
import Group from "./components/Group/Group";
import TestExample from "./components/TestExample/TestExample";
import PrivacyPolicy from "./components/Login/PrivacyPolicy";
import About from "./components/Login/About";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import PasswordReset from "./components/Login/PasswordReset";
import ProfileUpload from "./components/Profile/profileUpload";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Link,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/myAccount" element={<Account />} />
          <Route path="/" element={<Login />} />
          <Route path="account/:userName" element={<OtherAccount />} />
          <Route path="/group/:type" element={<Group />} />
          <Route path="/test" element={<TestExample />} />
		      <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
	        <Route path="/profileUpload" element={<ProfileUpload />} />
	</Routes>
      </Router>
    );
  }
}

export default App;
