import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useState, useCallback, Suspense } from "react";
import Users from "../containers/GetUsers";
import RootLayout from "../containers/Roots";
import ErrorPage from "../containers/ErrorPage";
import { AuthContext } from "../context/auth-context";

const GetMarket = React.lazy(() => import("../containers/GetMarket"));
const GetUserCollection = React.lazy(() => import("../containers/GetUserCollection"));
const CreatePull = React.lazy(() => import("../containers/CreatePull"));
const GetUsers = React.lazy(() => import("../containers/GetUsers"));
const Login = React.lazy(() => import("../containers/GetLogin"));
const Signup = React.lazy(() => import("../containers/GetSignup"));

const routerLogin = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GetMarket /> },
      { path: "/signup", element: <Navigate to="/market" replace /> },
      { path: "/login", element: <Navigate to="/market" replace /> },
      { path: "/market", element: <GetMarket /> },
      { path: "/collection/:userId", element: <GetUserCollection /> },
      { path: "/pull", element: <CreatePull /> },
      { path: "/users", element: <GetUsers /> },
    ],
  },
]);

const routerLogout = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GetMarket /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/market", element: <GetMarket /> },
      { path: "/users", element: <GetUsers /> },
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  if (token) {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={routerLogin} />
        </Suspense>
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={routerLogout} />
        </Suspense>
      </AuthContext.Provider>
    );
  }
};

export default App;