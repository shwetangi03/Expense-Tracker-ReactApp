import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExpenseContext from "./store/expense-context";

import SignupPage from "./components/pages/SignupPage";
import Navbar from "./components/navbar/Navbar";
import WelcomePage from "./components/pages/WelcomePage";
import UserDetailsUpdate from "./components/pages/UserDetailsUpdate";
import ResetPassword from "./components/pages/ResetPassword";
import Expenses from "./components/pages/expenses/Expenses";

const App = () => {
  const ctx = useContext(ExpenseContext);

  return (
    <div>
      {ctx.isLogin &&<Navbar />}
      <Switch>
        {!ctx.isLogin && (
          <Route path="/auth">
            <SignupPage />
          </Route>
        )}

        {ctx.isLogin && (
          <Route path="/welcome">
            <WelcomePage />
          </Route>
        )}

        {ctx.isLogin && (
          <Route path={"/user"}>
            <UserDetailsUpdate />
          </Route>
        )}

        {!ctx.isLogin && (
          <Route path={"/resetPassword"}>
            <ResetPassword />
          </Route>
        )}

        {ctx.isLogin && (
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
