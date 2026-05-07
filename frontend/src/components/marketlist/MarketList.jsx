import React from "react";
import Card from "../UIElements/Card";
import MarketItem from "../marketitem/MarketItem";
import "../../Main.css";

const MarketList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="marketlist center">
        <Card>
          <p>An empty market ...</p>
        </Card>
      </div>
    );
  }

  return (
    <ul className="marketlist">
      {props.items.map((sale) => (
        <MarketItem
          key={sale.id}
          id={sale.id}
          ownerId={sale.ownerId}
          name={sale.name}
          price={sale.price}
          rating={sale.rating}
        />
      ))}
    </ul>
  );
};

export default MarketList;
