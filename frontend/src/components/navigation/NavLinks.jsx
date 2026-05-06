import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "../../Main.css";

const NavLink = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/market">Market</NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${auth.userId}/collection`}>My Collection</NavLink>
          </li>
          <li>
            <NavLink to="/numbers/add">PULL</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <>
          <li>
            <NavLink to="/register">Login</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLink;