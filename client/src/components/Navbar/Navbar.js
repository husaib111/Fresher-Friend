import React, { useState } from "react";
//import { FaUniversalAccess } from "react-icons/fa";
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
          <GiThreeFriends className={"FresherFriendLogo"} aria-label="Fresher Friend Logo"/>
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
    tabAccessSidebar();
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
          tabIndex="0"
          aria-label="show side-bar menu"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
          onKeyPress={(event) => {
            event.key === "Enter" && toggleNavbarMenu(0);
          }}
        />
      </div>
      <div id="NavMenu" className={`NavigationMenu ${MenuStatus[0]}`} >
        <GiHamburgerMenu
          aria-label="hide side-bar menu"
          tabIndex="0"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
          onKeyPress={(event) => {
            event.key === "Enter" && toggleNavbarMenu(0);
          }}
        />

        <ul className="TopNavbarMenuItems">
          <li aria-label="home">
            {" "}
            <a href={"/home"} aria-label="Home button">
              {" "}
              <MdHome className="NavbarMenuIcon" />
              Home
            </a>
          </li>
          <li aria-label="My profile">
            {" "}
            <a href={"/myAccount"} aria-label="My Profile button">
              {" "}
              <MdPerson className="NavbarMenuIcon" />
              My Profile
            </a>
          </li>
          <li aria-label="About us">
            {" "}
            <a href={"/about"} aria-label="About us button">
              {" "}
              <MdInfo className="NavbarMenuIcon" />
              About Us{" "}
            </a>
          </li>
          <li aria-label="Privacy policy">
            {" "}
            <a href={"/privacy"} aria-label="Privacy policy button">
              {" "}
              <MdPrivacyTip className="NavbarMenuIcon" />
              Privacy Policy
            </a>
          </li>
          <li aria-label="log out">
            {" "}
            <a href={"/#"} onClick={doLogout} aria-label="log out button">
              {" "}
              <MdLogout className="NavbarMenuIcon" />
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <div className={`PageDimmer ${MenuStatus[0]}`} />
    </div>
  );
}

let isShown = false;

function tabAccessSidebar() {
  if(isShown && document.getElementById("NavMenu")) {
    document.getElementById("NavMenu").style.visibility = 'hidden';
    document.getElementById("NavMenu").style.zIndex = -1;
    isShown = false;
  } else {
    document.getElementById("NavMenu").style.visibility= 'visible';
    document.getElementById("NavMenu").style.zIndex = 10;
    isShown = true;
  }

}
/*
<ul className="BottomNavbarMenuItems">
          <li>
              <FaUniversalAccess className="FresherFriendLogo"/>
              Accessibilty supported
          </li>
        </ul>

*/

export default Navbar;
