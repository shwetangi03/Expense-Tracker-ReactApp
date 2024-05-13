import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignupPage from "./components/pages/SignupPage";
import Navbar from "./components/navbar/Navbar";
import WelcomePage from "./components/pages/WelcomePage";
import UserDetailsUpdate from "./components/pages/UserDetailsUpdate";
import ResetPassword from "./components/pages/ResetPassword";
import Expenses from "./components/pages/expenses/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./reduxStore/auth";

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(authActions.checker());
  }, []);

  return (
    <div>
      <Navbar />
      <Switch>
        {!login && (
          <Route path="/auth">
            <SignupPage />
          </Route>
        )}

        {login && (
          <Route path="/welcome">
            <WelcomePage />
          </Route>
        )}

        {login && (
          <Route path={"/user"}>
            <UserDetailsUpdate />
          </Route>
        )}

        {!login && (
          <Route path={"/resetPassword"}>
            <ResetPassword />
          </Route>
        )}

        {login && (
          <Route path={"/expenses"}>
            <Expenses />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
