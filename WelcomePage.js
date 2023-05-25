import { useState } from "react";
import Profile from "./Profile";
import classes from "./WelcomePage.module.css";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const WelcomePage = () => {
  const history = useHistory();

  const routeChange = () => {
    history.push("/welcome/profile");
  };

  return (
    <div>
      <span className={classes.welcome}>
        <h3>welcome to the page</h3>

        <p>
          your profile is incomplete.{" "}
          <button onClick={routeChange}>Complete now</button>
        </p>
      </span>
    </div>
  );
};
export default WelcomePage;
