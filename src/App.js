import Loading from "./components/pages/Loading";
import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import { authActions } from "./reduxStore/auth";
import "./App.css";
const Expenses = React.lazy(() =>
  import("./components/pages/expenses/Expenses")
);
const SignupPage = React.lazy(() => import("./components/pages/SignupPage"));
const WelcomePage = React.lazy(() => import("./components/pages/WelcomePage"));
const UserDetailsUpdate = React.lazy(() =>
  import("./components/pages/UserDetailsUpdate")
);
const ResetPassword = React.lazy(() =>
  import("./components/pages/ResetPassword")
);

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    dispatch(authActions.checker());
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className={darkMode ? "invert" : ""}>
        <Navbar />
        <Switch>
          {!login && (
            <Route path="/auth" exact>
              <SignupPage />
            </Route>
          )}

          {login && (
            <Route path="/welcome" exact>
              <WelcomePage />
            </Route>
          )}

          {login && (
            <Route path={"/user"} exact>
              <UserDetailsUpdate />
            </Route>
          )}

          {!login && (
            <Route path={"/resetPassword"} exact>
              <ResetPassword />
            </Route>
          )}

          {login && (
            <Route path={"/expenses"} exact>
              <Expenses />
            </Route>
          )}

          <Route path="*">
            {!login && <Redirect to="/auth" />}
            {login && <Redirect to="/expenses" />}
          </Route>
        </Switch>
      </div>
    </Suspense>
  );
};

export default App;
