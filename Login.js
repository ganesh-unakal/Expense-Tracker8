import { useRef, useState } from "react";
import classes from "./Login.module.css";

const Login = () => {
  const [isLogin, setIslogin] = useState(false);

  const switchHandler = () => {
    setIslogin((prev) => !prev);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enterdEmail = emailInputRef.current.value;
    const enterdPassowrd = passwordInputRef.current.value;
    const enterdConPassowrd = conPasswordInputRef.current.value;

    console.log("3", enterdPassowrd, enterdConPassowrd);

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enterdEmail,
            password: enterdPassowrd,
            confirmPassword: enterdConPassowrd,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              alert(data.error.message);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("2", err);
          alert("Aunthentication failed");
        });
    }
  };

  return (
    <section className={classes.login}>
      <form onSubmit={submitHandler}>
        <h1>{!isLogin ? "login" : "Sign Up"}</h1>
        <div>
          <label>Email Id</label>
          <input type="email" required ref={emailInputRef} />

          <label>Password</label>
          <input type="password" required ref={passwordInputRef} />

          <label>Confirm Password</label>
          <input type="password" required ref={conPasswordInputRef} />

          <button type="submit" className={classes.button1}>
            {!isLogin ? "login" : "Sign Up"}
          </button>

          <button
            type="button"
            className={classes.button2}
            onClick={switchHandler}
          >
            {isLogin ? "existing account" : "Have an account? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
