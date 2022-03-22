import GroupsList from "./GroupsList";
import React from "react";
import Navbar from "../Navbar/Navbar";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="HomePage">
          <GroupsList />
        </div>
      </div>
    );
  }
}
export default HomePage;
