import AuthContext from "../store/Auth-context";
import classes from "./Profile.module.css";
import { useContext, useRef } from "react";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const auth = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idToken: auth.token,
          returnSecureToken: true,
          displayName: enteredName,
          photoUrl: enteredUrl,
        }),
      }
    )
      .then((res) => {
        console.log("gandu kiran", res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("gani", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <span className={classes.profile}>
        <h3>winners never quite. quitters never win</h3>

        <p>
          your profile is 64% completed. A complete Profile has
          <br />
          higher chances of landing a job <button>Complete now</button>{" "}
        </p>
      </span>

      <section className={classes.section}>
        <span className={classes.details}>
          <h3>Contact Details</h3>

          <button>Cancel</button>
        </span>

        <form className={classes.form} onSubmit={submitHandler}>
          <label>Full Name: </label>
          <input type="text" ref={nameRef} />

          <label>Profile Photo URL: </label>
          <input type="url" ref={urlRef} />

          <button type="submit">Upload</button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
