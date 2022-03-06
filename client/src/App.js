import "./App.css";
import React from 'react';
import Login from "./components/Login/Login"
import HomePage from "./components/HomePage/HomePage"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Link,
} from "react-router-dom";

class App extends React.Component {
  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<HomePage/>} />
          <Route path="/404" element={<Login/>} />
        </Routes>
      </Router>
    );
  } 
}

export default App;
