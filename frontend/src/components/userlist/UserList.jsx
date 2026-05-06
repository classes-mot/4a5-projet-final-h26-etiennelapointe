import UserItem from "../useritem/UserItem";
import Card from "../UIElements/Card";
import "../../Main.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="userslist">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          value={user.value}
          favorite={user.favorite}
        />
      ))}
    </ul>
  );
};

export default UserList;