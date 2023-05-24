import { Fragment, useContext } from "react";
import "./App.css";

import Login from "./components/login/Login";
import Home from "./components/pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./components/store/Auth-context";

function App() {
  const authCntx = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      {authCntx.isLoggedIn && (
        <Route path="/home">
          <Home />
        </Route>
      )}

      <Route path="*">
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
}

export default App;
