import { Fragment, useContext } from "react";
import "./App.css";

import WelcomePage from './components/pages/WelcomePage'
import Login from "./components/login/Login";
import Profile from "./components/pages/Profile";
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
        <Route path="/welcome" exact>
          <WelcomePage />
        </Route>
      )}

 {authCntx.isLoggedIn && <Route path='/welcome/profile'>
  <Profile />
</Route>}


      <Route path="*">
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
}

export default App;
