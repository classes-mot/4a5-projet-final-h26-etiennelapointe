import React from "react";
import { useContext } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";
import "../../Main.css";


const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <ul className="nav-links">
      <li>
        <RouterNavLink to="/market">{t("marketTitle")}</RouterNavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <RouterNavLink to={`/${auth.userId}/collection`}>{t("myCollection")}</RouterNavLink>
          </li>
          <li>
            <RouterNavLink to="/numbers/add">{t("pull")}</RouterNavLink>
          </li>
        </>
      )}
      <li>
        <RouterNavLink to="/users">{t("users")}</RouterNavLink>
      </li>
      {auth.isLoggedIn ? (
          <li>
            <RouterNavLink to="/register">{t("loginButton")}</RouterNavLink>
          </li>
      ) : (
        <>
          <li>
            <p>{auth.money}$</p>
          </li>
          <li>
            <RouterNavLink to={`/${auth.userId}/settings`}>
              <Avatar image={auth.icon} color={auth.color} />
            </RouterNavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
