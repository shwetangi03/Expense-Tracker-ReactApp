import React from "react";
import SignupPage from "./components/pages/SignupPage";
import Navbar from "./components/navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import UserDetailsUpdate from "./components/pages/UserDetailsUpdate";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <SignupPage path="/auth" />

        <Route path="/welcome">
          <WelcomePage />
        </Route>

        <Route path="/user">
          <UserDetailsUpdate />
        </Route>

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;