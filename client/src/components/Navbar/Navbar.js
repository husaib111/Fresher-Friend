import React, {useState} from "react";
import {FaUniversalAccess} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import "./Navbar.css"

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
                    onClick={(e)=>toggleNavbarMenu(0)}
                />
        </div>
            <div className= {`NavigationMenu ${MenuStatus[0] ? "menuOpen" : "menuClosed" }`}>

                <div className="NavbarMenu">
                    <GiHamburgerMenu
                        className= {`NavbarIcon ${MenuStatus[0] ? "" : ""}`}
                        onClick={(e)=>toggleNavbarMenu(0)}
                    />


                    <div className="TopNavbarMenuItems">
                        <li>Home</li>
                        <li>My Profile</li>
                    </div>
                    <div className="BottomNavbarMenuItems">
                        <li>About Us</li>
                        <li>Privacy Policy</li>
                        <li>Log Out</li>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Navbar;
