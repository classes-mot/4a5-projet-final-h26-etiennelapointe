import "../../Main.css";

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorMsg from "../UIElements/ErrorMsg";
import Spinner from "../UIElements/Spinner";

export default function Signup() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.username = data["username"];
    if (data.password !== data["confirm-password"]) {
      setPasswordNotEqual(true);
      return;
    }
    try {
      setIsLoading(true);
      const reponse = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //pour que le bodyParser sache comment faire le parse
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      setError(err.message || "Une erreur est survenue, essayez plus tard.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    event.target.reset();
  }

  return (
    <>
      <div>
        {isLoading && <Spinner />}
        <ErrorMsg message={error} onClose={() => setError(null)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="register-title">Login</h1>
          <div className="register-input-container">
            <div className="register-input">
              <label htmlFor="username">Username</label>
              <input id="username" type="username" name="username" />
            </div>
            <div className="register-input">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" />
            </div>
            <div className="register-input">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                name="confirm-password"
              />
              {passwordNotEqual && (
                <div className="register-confirm-error">
                  <p>Passwords must match</p>
                </div>
              )}
            </div>
            <div className="register-btn-container">
              <Link to="/login">
                <button className="register-btn-signup">Login</button>
              </Link>
              <button className="register-btn-login">Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
