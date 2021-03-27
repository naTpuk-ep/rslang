import React from "react";
import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/auth.hook";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import "./App.scss";

const App: React.FunctionComponent = () => {
  const {
    token,
    refreshToken,
    login,
    logout,
    userId,
    name,
    email,
    userImage,
  } = useAuth();
  const isAuthenticated = !!token;
  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          refreshToken,
          login,
          logout,
          userId,
          name,
          email,
          userImage,
          isAuthenticated,
        }}
      >
        <Registration />
        {/* <Login /> */}
      </AuthContext.Provider>
    </>
  );
};

export default App;
