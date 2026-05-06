import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Card from "../UIElements/Card";
import StarRating from "../UIElements/StarRating";
import { Link } from "react-router-dom";
import "../../Main.css";

const MarketItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <li className="marketitem">
        <Card className="marketitem-content">
          <div className="marketitem-name">
            <h1>{props.name}</h1>
            <StarRating rating={props.rating} />
          </div>
          <div className="marketitem-info">
            <div className="marketitem-info-price">
              <h1>{props.price}$</h1>
            </div>
            <div className="marketitem-info-btn">
              <button disabled={!auth.isLoggedIn}>
                {auth.isLoggedIn ? "BUY" : "Login required"}
              </button>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MarketItem;
