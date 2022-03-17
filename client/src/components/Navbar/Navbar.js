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
    // -1 = Close without animation (for when you first open the site
    // 0 = Close with animation
    // 1 = Open with animation

    const toggleNavbarMenu = (e) => {
        const oldMenuStatus = MenuStatus;
        oldMenuStatus[e] = !oldMenuStatus[e];
        setMenuStatus([...oldMenuStatus]);
        console.log(MenuStatus);
    }

    let homePageRef =  React.createRef();
    homePageRef.current = "/homePage";
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
                        <li> <a href={"/homePage"}> <MdHome className = "NavbarMenuIcon" />Home</a></li>
                        <li> <a href={"/myAccount"}> <MdPerson className = "NavbarMenuIcon" />My Profile</a></li>
                    </ul>
                    <ul className="BottomNavbarMenuItems">
                        <li> <a> <MdInfo className = "NavbarMenuIcon" />About Us </a></li>
                        <li> <a> <MdPrivacyTip className = "NavbarMenuIcon" />Privacy Policy</a></li>
                        <li> <a href={"/"}> <MdLogout className = "NavbarMenuIcon" />Log Out</a></li>
                    </ul>
                </div>


        </div>
    )
}

export default Navbar;
