import { Link } from "react-router-dom";
import Avatar from "../UIElements/Avatar";
import Card from "../UIElements/Avatar";
import "../../Main.css";

const FormatNumber = ({ value }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);

  return <span>{formatted}</span>;
};

const UserItem = (props) => {
  return (
    <li className="useritem">
      <Card className="useritem-content">
        <div className="useritem-image">
          <Avatar image={props.image} color={props.color} alt="Ø" />
        </div>
        <div className="useritem-info">
          <h1>{props.name}</h1>
          <h2>
            Value: <FormatNumber value={props.value} />
          </h2>
        </div>
        <div className="useritem-favorites">
          {props.favorites[0] == "" ? (
            <div className="useritem-favorite-empty">Ø</div>
          ) : (
            <div className="useritem-favorite-full">
              <div className="useritem-favorite-number">
                {props.favorites[0].name}
              </div>
              <div className="useritem-favorite-value">
                {props.favorites[0].value}
              </div>
            </div>
          )}
          {props.favorites[1] == "" ? (
            <div className="useritem-favorite-empty">Ø</div>
          ) : (
            <div className="useritem-favorite-full">
              <div className="useritem-favorite-number">
                {props.favorites[1].name}
              </div>
              <div className="useritem-favorite-value">
                {props.favorites[1].value}
              </div>
            </div>
          )}
          {props.favorites[2] == "" ? (
            <div className="useritem-favorite-empty">Ø</div>
          ) : (
            <div className="useritem-favorite-full">
              <div className="useritem-favorite-number">
                {props.favorites[2].name}
              </div>
              <div className="useritem-favorite-value">
                {props.favorites[2].value}
              </div>
            </div>
          )}
        </div>
      </Card>
    </li>
  );
};

export default UserItem;

/* 
add :
    <Link to={`/sales/${props.id}`}>

around the components of the Card if sales/uid exists

*/
