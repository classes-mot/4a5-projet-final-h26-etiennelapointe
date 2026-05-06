import { Link } from "react-router-dom";
import { useState } from "react";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import  "../../Main.css";

const MainNav = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            {drawerIsOpen && (
                <SideDrawer>
                    <nav className="mainnav-drawer">
                        <NavLinks />
                    </nav>
                </SideDrawer>
            )}
            <header className="mainnav-header">
                <button className="mainnav-header-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="mainnav-header-title">
                    <Link to="/">Market</Link>
                </h1>
                <nav className="mainnav-header-nav">
                    <NavLinks />
                </nav>
            </header>
        </>
    );
};

export default MainNav;