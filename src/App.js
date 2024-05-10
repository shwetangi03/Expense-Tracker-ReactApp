import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignupPage from "./components/pages/SignupPage";
import Navbar from "./components/navbar/Navbar";
import WelcomePage from "./components/pages/WelcomePage";
import UserDetailsUpdate from "./components/pages/UserDetailsUpdate";
import ResetPassword from "./components/pages/ResetPassword";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <SignupPage path="/auth" />

        <Route path="/welcome">
          <WelcomePage />
        </Route>

        <Route path={"/user"}>
          <UserDetailsUpdate />
        </Route>

        <Route path={"/resetPassword"}>
          <ResetPassword />
        </Route>

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
