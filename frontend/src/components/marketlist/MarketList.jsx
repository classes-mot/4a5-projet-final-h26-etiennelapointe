import Card from "../UIElements/Card";
import MarketItem from "../marketitem/MarketItem";
import "../../Main.css";

const MarketList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="marketlist center">
        <Card>
          <h1>
            Let`s go <a href="/pull">PULL</a> your first market item!
          </h1>
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
