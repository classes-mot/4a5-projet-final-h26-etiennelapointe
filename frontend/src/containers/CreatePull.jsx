import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hook/http-hook";
import ErrorMsg from "../components/UIElements/ErrorMsg";
import Spinner from "../components/UIElements/Spinner";

const Pull = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  async function addNumberSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newNumber = {
      name: data.name,
      value: data.value,
      rating: data.rating,
      isForSale: data.isForSale,
      ownerId: auth.userId,
    };

    await sendRequest(
      "http://localhost:5000/api/numbers",
      "POST",
      JSON.stringify(newNumber),
      {
        Authorization: `Bearer ${auth.token}`,
      },
    );
    event.target.reset();
  }

  return (
    <form onSubmit={addNumberSubmitHandler}>
      <div className="pull-zone">
        <button type="submit" className="pull-zone-btn">PULL</button>
      </div>
    </form>
  );
};

export default Pull;
