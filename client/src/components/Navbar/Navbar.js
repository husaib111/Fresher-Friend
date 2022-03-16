import React, {useState} from "react";
import {FaUniversalAccess} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import "./Navbar.css"
import {MdHome, MdInfo, MdLogout, MdPerson, MdPrivacyTip} from "react-icons/md";

function Navbar() {
    return (
        <div>
        <div className="Navbar">
            <div className="NavbarFlex">
                <MenuBarButton />
                <h1>
                Fresher Friend
                </h1>
                <AccessibilitySwitch />
            </div>
        </div>
            <div className="Menu">

            </div>
        </div>
    );
}

function AccessibilitySwitch(){
    return(
        <div className="AccesibilitySwitch">
                <FaUniversalAccess
                    className={"NavbarIcon"}
                    />
        </div>
    )
}

function MenuBarButton(){
    const [MenuStatus, setMenuStatus] = useState([false])

    const toggleNavbarMenu = (e) => {
        const oldMenuStatus = MenuStatus;
        oldMenuStatus[e] = !oldMenuStatus[e];
        setMenuStatus([...oldMenuStatus]);
        console.log(MenuStatus);
    }

    return(
        <div>
        <div className="MenuBarButton">
                <GiHamburgerMenu
                    className= {`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
                    onClick={()=>toggleNavbarMenu(0)}
                />
        </div>
            <div className= {`NavigationMenu ${MenuStatus[0] ? "menuOpen" : "menuClosed" }`}>
                    <GiHamburgerMenu
                        className= {`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
                        onClick={()=>toggleNavbarMenu(0)}
                    />


                    <ul className="TopNavbarMenuItems">
                        <li><MdHome className = "NavbarMenuIcon" />Home</li>
                        <li><MdPerson className = "NavbarMenuIcon" />My Profile</li>
                    </ul>
                    <ul className="BottomNavbarMenuItems">
                        <li><MdInfo className = "NavbarMenuIcon" />About Us</li>
                        <li><MdPrivacyTip className = "NavbarMenuIcon" />Privacy Policy</li>
                        <li><MdLogout className = "NavbarMenuIcon" />Log Out</li>
                    </ul>
                </div>


        </div>
    )
}

export default Navbar;
