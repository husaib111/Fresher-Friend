import React, { useState } from "react";
import { FaUniversalAccess } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";
import {
  MdHome,
  MdInfo,
  MdLogout,
  MdPerson,
  MdPrivacyTip,
} from "react-icons/md";
import Axios from "axios";

function Navbar() {
  return (
   <div>
      <div className="Navbar"  aria-label="Navigation bar">
        <div className="NavbarFlex" aria-label="Navigation bar">
          <MenuBarButton />
          <h1 className="title">Fresher Friend</h1>
          <GiThreeFriends className={"FresherFriendLogo"}/>
        </div>
      </div>
      <div className="Menu" />
      <div className="NavbarMargin" />
   </div>
  );
}

/*
function AccessibilitySwitch() {
  return (
    <div className="AccessibilitySwitch">
        <FaUniversalAccess className={"NavbarIcon"} />
        Accessibilty
    </div>
  );
}


AccessibilitySwitch.onclick = function () { swapStyleSheet("./Navbar-Accessible.css") };

function swapStyleSheet(sheet) {
  Navbar.getElementById("stylesheet").setAttribute("href", sheet);  
}
*/

function MenuBarButton() {
  const [MenuStatus, setMenuStatus] = useState(["I"]);

  const doLogout = async () => {
    await Axios.get("https://www.fresher-friend.bham.team:5001/logout/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";
  };

  const toggleNavbarMenu = (e) => {
    let oldMenuStatus = MenuStatus;
    switch (oldMenuStatus[e]) {
      case "I": {
        oldMenuStatus[e] = "O";
        break;
      }
      case "C": {
        oldMenuStatus[e] = "O";
        break;
      }
      case "O": {
        oldMenuStatus[e] = "C";
        break;
      }
      //THIS FIXES THE BUILD ERROR
      default:
        console.log("Error in navbar, contact the developer!");
    }

    setMenuStatus([...oldMenuStatus]);
    console.log(MenuStatus);
  };

  return (
    <div>
      <div className="MenuBarButton" >
        <GiHamburgerMenu
          tabindex="0"
          aria-label="show side-bar menu"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
        />
      </div>
      <div className={`NavigationMenu ${MenuStatus[0]}`}>
        <GiHamburgerMenu
          aria-label="hide side-bar menu"
          tabindex="0"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
        />

        <ul className="TopNavbarMenuItems">
          <li aria-label="home">
            {" "}
            <a href={"/home"}>
              {" "}
              <MdHome className="NavbarMenuIcon" />
              Home
            </a>
          </li>
          <li aria-label="My profile">
            {" "}
            <a href={"/myAccount"} >
              {" "}
              <MdPerson className="NavbarMenuIcon" />
              My Profile
            </a>
          </li>
          <li aria-label="About us">
            {" "}
            <a  aria-label="About us" href={"/about"} >
              {" "}
              <MdInfo className="NavbarMenuIcon" />
              About Us{" "}
            </a>
          </li>
          <li aria-label="Privacy policy">
            {" "}
            <a href={"/privacy"} >
              {" "}
              <MdPrivacyTip className="NavbarMenuIcon" />
              Privacy Policy
            </a>
          </li>
          <li aria-label="log out">
            {" "}
            <a href={"/#"}  onClick={doLogout}>
              {" "}
              <MdLogout className="NavbarMenuIcon" />
              Log Out
            </a>
          </li>
        </ul>
        <ul className="BottomNavbarMenuItems">
          <li>
              <FaUniversalAccess className="FresherFriendLogo" />
              Accessibilty supported
          </li>
        </ul>
      </div>
      <div className={`PageDimmer ${MenuStatus[0]}`} />
    </div>
  );
}

export default Navbar;
