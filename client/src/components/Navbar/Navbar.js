import React, { useState } from "react";
import { FaUniversalAccess } from "react-icons/fa";
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
      <div className="Navbar">
        <div className="NavbarFlex">
          <MenuBarButton />
          <h1 className="title">Fresher Friend</h1>
          <AccessibilitySwitch />
        </div>
      </div>
      <div className="Menu" />
      <div className="NavbarMargin" />
    </div>
  );
}

function AccessibilitySwitch() {
  return (
    <div className="AccessibilitySwitch">
      {" "}
      <a href={"/accessibility"}>
        {" "}
        <FaUniversalAccess className={"NavbarIcon"} />
        Accessibility
      </a>
    </div>
  );
}

function MenuBarButton() {
  const [MenuStatus, setMenuStatus] = useState(["O"]);

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
      <div className="MenuBarButton">
        <GiHamburgerMenu
          tabindex="0"
          aria-label="menuBarButton"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
        />
      </div>
      <div className={`NavigationMenu ${MenuStatus[0]}`}>
        <GiHamburgerMenu
          tabindex="0"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
        />

        <ul className="TopNavbarMenuItems">
          <li>
            {" "}
            <a href={"/home"}>
              {" "}
              <MdHome className="NavbarMenuIcon" />
              Home
            </a>
          </li>
          <li>
            {" "}
            <a href={"/myAccount"} aria-label="myAccountLink">
              {" "}
              <MdPerson className="NavbarMenuIcon" />
              My Profile
            </a>
          </li>
        </ul>
        <ul className="BottomNavbarMenuItems">
          <li>
            {" "}
            <a href={"/about"}>
              {" "}
              <MdInfo className="NavbarMenuIcon" />
              About Us{" "}
            </a>
          </li>
          <li>
            {" "}
            <a href={"/privacy"}>
              {" "}
              <MdPrivacyTip className="NavbarMenuIcon" />
              Privacy Policy
            </a>
          </li>
          <li>
            {" "}
            <a href={"/#"} onClick={doLogout}>
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

export default Navbar;
