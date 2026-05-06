import "../../Main.css";

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import ErrorMsg from "../UIElements/ErrorMsg";
import Spinner from "../UIElements/Spinner";

export default function Login() {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [entredValues, setEntredValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (identifier, value) => {
    setEntredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify(entredValues),
        {
          "Content-Type": "application/json",
        },
      );
      auth.login(response.userId, response.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        {isLoading && <Spinner />}
        <ErrorMsg message={error} onClose={() => clearError()} />
      </div>
      <form onSubmit={authSubmitHandler}>
        <div>
          <h1 className="register-title">Login</h1>
          <div className="register-input-container">
            <div className="register-input">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="username"
                name="username"
                onChange={(event) =>
                  handleInputChange("username", event.target.value)
                }
                value={entredValues.username}
              />
            </div>
            <div className="register-input">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={(event) =>
                  handleInputChange("password", event.target.value)
                }
                value={entredValues.password}
              />
            </div>
            <div className="register-btn-container">
              <Link to="/signup">
                <button className="register-btn-signup">Sign Up</button>
              </Link>
              <button className="register-btn-login">Login</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
