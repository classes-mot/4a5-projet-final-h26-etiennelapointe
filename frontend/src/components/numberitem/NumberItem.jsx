import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Card from "../UIElements/Card";
import StarRating from "../UIElements/StarRating";
import { Link } from "react-router-dom";
import "../../Main.css";

const NumberItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <li className="numberitem">
        <Card className="numberitem-content">
          <div className="numberitem-favorite">
            <button className="numberitem-favorite-btn"></button>
          </div>
          <div className="numberitem-name">
            <h1>{props.name}</h1>
            <StarRating rating={props.rating} />
          </div>
          <div className="numberitem-info">
            <div className="numberitem-info-value">
              <p>Value:</p>
              <h1>{props.value}$</h1>
            </div>
            <div className="numberitem-info-sale">
              <p className="numberitem-info-sale-asking">Asking:</p>
              <input type="text" name="asking" value="Temp $" />
              {props.isForSale ? (
                <p className="numberitem-info-sale-onsale">In Market</p>
              ) : (
                <p className="numberitem-info-sale-suggest">
                  Suggesting: {props.value * props.value}$
                </p>
              )}
            </div>
            <div className="numberitem-info-btn">
              <button className="numberitem-info-btn-sellnow">Sell Now</button>
              {props.isForSale ? (
                <button className="numberitem-info-btn-sell">
                  Sell on Market
                </button>
              ) : (
                <button className="numberitem-info-btn-takeoff">
                  Take Off Market
                </button>
              )}
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default NumberItem;
