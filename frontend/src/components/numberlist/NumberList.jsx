import Card from "../UIElements/Card";
import NumberItem from "../numberitem/NumberItem";
import "../../Main.css";

const NumberList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="numberlist center">
        <Card>
          <h1>
            Let`s go <a href="/pull">PULL</a> your first number!
          </h1>
        </Card>
      </div>
    );
  }

  return (
    <ul className="numberlist">
      {props.items.map((number) => (
        <NumberItem
          key={number.id}
          id={number.id}
          ownerId={number.ownerId}
          name={number.name}
          value={number.value}
          rating={number.rating}
          isForSale={number.isForSale}
        />
      ))}
    </ul>
  );
};
