import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Account from "./components/Account/Account";
import Group from "./components/Group/Group";
import TestExample from "./components/TestExample/TestExample";
import PrivacyPolicy from "./components/Login/PrivacyPolicy";
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
          <Route path="/group" element={<Group />} />
          <Route path="/test" element={<TestExample />} />
          <Route path="/gdpr" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
