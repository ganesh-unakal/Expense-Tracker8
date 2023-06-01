import { Fragment, useContext } from "react";
import "./App.css";

import WelcomePage from './components/pages/WelcomePage'
import Login from "./components/login/Login";
import Profile from "./components/pages/Profile";
import { Route, Switch, Redirect } from "react-router-dom";

import ForgetPassword from "./components/pages/ForgetPassword";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function App() {
  // const authCntx = useContext(AuthContext);

  const isLoggedIn = useSelector(state => state.authentication.isAuthenticated)
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      {isLoggedIn && (
        <Route path="/welcome" exact>
          <WelcomePage />
        </Route>
      )}

      {isLoggedIn && <Route path='/welcome/profile'>
        <Profile />
      </Route>}

      <Route path='/forget' exact>
        <ForgetPassword />
      </Route>


      <Route path="*">
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
}

export default App;
