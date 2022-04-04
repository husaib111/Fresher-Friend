import "./Accessibility.css";
import "./../Navbar/Navbar";
import React, { useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
import Axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//Accessibility Page
//At the moment there is no functionality, simply a test atm
class Accessibility extends React.Component {
  render() {
  return (
      <div>
          <Navbar />
          <h1 className="title">Accessibility</h1>
      </div>

    );
  }
};

export default Accessibility;
