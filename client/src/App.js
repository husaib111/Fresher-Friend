import "./App.css";
import React from 'react';
import { GiThreeFriends } from "react-icons/gi";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <h1 className="title">
          <GiThreeFriends className="icon" />
          Welcome to Fresher Friend.
        </h1>
        <h2>
          This is Reuben's test
        </h2>
      </div>
    );
  } 
}

export default App;
