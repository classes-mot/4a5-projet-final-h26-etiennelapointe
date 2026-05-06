import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";
import "../../Main.css";


const NavLinks = (props) => {
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
      {auth.isLoggedIn ? (
          <li>
            <NavLink to="/register">Login</NavLink>
          </li>
      ) : (
        <>
          <li>
            <p>{auth.money}$</p>
          </li>
          <li>
            <NavLink to={`/${auth.userId}/settings`}>
              <Avatar image={auth.icon} color={auth.color} />
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLink;
