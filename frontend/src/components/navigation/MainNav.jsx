import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import  "../../Main.css";

const MainNav = () => {
    const { t, i18n } = useTranslation();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
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
                    <Link to="/">{t("marketTitle")}</Link>
                </h1>
                <div className="mainnav-language-switch">
                    <button type="button" onClick={() => changeLanguage("en")}>EN</button>
                    <button type="button" onClick={() => changeLanguage("fr")}>FR</button>
                </div>
                <nav className="mainnav-header-nav">
                    <NavLinks />
                </nav>
            </header>
        </>
    );
};

export default MainNav;