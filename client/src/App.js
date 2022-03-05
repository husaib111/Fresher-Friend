import "./App.css";
import React from 'react';
import Login from "./components/Login"
import HomePage from "./components/HomePage"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

class App extends React.Component {
  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/404" element={<Login/>} />
        </Routes>
      </Router>
    );
  } 
}

export default App;
