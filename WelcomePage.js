import { useContext, useState } from "react";
import Profile from "./Profile";
import classes from "./WelcomePage.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/Auth-context";

const WelcomePage = () => {
  const authctx = useContext(AuthContext);
  const history = useHistory();

  const routeChange = () => {
    history.push("/welcome/profile");
  };

  const varifyEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authctx.token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("received loda ", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <span className={classes.welcome}>
        <h3>welcome to the page</h3>

        <button
          style={{
            backgroundColor: "yellow",
            height: "25px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
          onClick={varifyEmail}
        >
          Varify Email
        </button>

        <p>
          your profile is incomplete.
          <button onClick={routeChange}>Complete now</button>
        </p>
      </span>
    </div>
  );
};
export default WelcomePage;
