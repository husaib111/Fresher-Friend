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

function Navbar() {
  return (
    <div>
      <div className="Navbar">
        <div className="NavbarFlex">
          <MenuBarButton />
          <h1>Fresher Friend</h1>
          <AccessibilitySwitch />
        </div>
      </div>
      <div className="Menu"/>
    </div>
  );
}

function AccessibilitySwitch() {
  return (
    <div className="AccessibilitySwitch">
      <FaUniversalAccess className={"NavbarIcon"} />
    </div>
  );
}

function MenuBarButton() {
  const [MenuStatus, setMenuStatus] = useState(['i']);

  const toggleNavbarMenu = (e) => {
    let oldMenuStatus = MenuStatus;
    switch (oldMenuStatus[e]) {
      case 'i': {
        oldMenuStatus[e] = 'o';
        break;
      }
      case 'c': {
        oldMenuStatus[e] = 'o';
        break;
      }
      case 'o': {
        oldMenuStatus[e] = 'c';
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
          aria-label="menuBarButton"
          className={`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
          onClick={() => toggleNavbarMenu(0)}
        />
      </div>
      <div className={`NavigationMenu ${MenuStatus[0]}`}>
        <GiHamburgerMenu
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
            <a href={"/"}>
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
