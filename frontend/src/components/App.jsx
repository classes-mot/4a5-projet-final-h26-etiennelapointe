import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useState, useCallback, Suspense } from "react";
import Users from "../Containers/Users";
import RootLayout from "../Containers/Roots";
import ErrorPage from "../Containers/ErrorPage";
import { AuthContext } from "../context/auth-context";

const Market = React.lazy(() => import("../Containers/Market"));
const UserCollection = React.lazy(() => import("../Containers/UserCollection"));
const Pull = React.lazy(() => import("../Containers/Pull"));
const Users = React.lazy(() => import("../Containers/Users"));
const Login = React.lazy(() => import("../Containers/Login"));
const Signup = React.lazy(() => import("../Containers/Signup"));

const routerLogin = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Market /> },
      { path: "/signup", element: <Navigate to="/market" replace /> },
      { path: "/login", element: <Navigate to="/market" replace /> },
      { path: "/market", element: <Market /> },
      { path: "/collection/:userId", element: <UserCollection /> },
      { path: "/pull", element: <Pull /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);

const routerLogout = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Market /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/market", element: <Market /> },
      { path: "/users", element: <Users /> },
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