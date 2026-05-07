import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NumberList from "../components/numberlist/NumberList";
import ErrorMsg from "../components/UIElements/ErrorMsg";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import Spinner from "../components/UIElements/Spinner";

const UserCollection = () => {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);

  const [loadedNumbers, setLoadedNumbers] = useState([]);
  const [deletedNumber, setDeletedNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNumbers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/numbers/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setLoadedNumbers(data.numbers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNumbers();
  }, [userId, deletedNumber]);

  async function deleteNumberHandler(numberId) {
    if (!auth.token) {
      setError("You must be logged in to sell a number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/numbers/${numberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete number.");
      }

      setDeletedNumber(numberId);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div>
        {isLoading && <Spinner />}
        <ErrorMsg message={error} onClose={() => setError(null)} />
      </div>
      <NumberList items={loadedNumbers} onDeleteNumber={deleteNumberHandler} />
    </>
  );
};

export default UserCollection;
