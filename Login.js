import { useRef, useState, useContext } from "react";
import classes from "./Login.module.css";
// import AuthContext from "../../store/Auth-context";
import { useHistory } from "react-router-dom";
import  {useDispatch} from 'react-redux'
import {authActions} from '../../store/authentication'

const Login = () => {
  const [isLogin, setIslogin] = useState(true);
  // const authCntx = useContext(AuthContext);
  const history = useHistory();
  const dispatch= useDispatch()


  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conPasswordInputRef = useRef();

  const switchHandler = () => {
    setIslogin((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enterdEmail = emailInputRef.current.value;
    const enterdPassowrd = passwordInputRef.current.value;
    const enterdConPassowrd = conPasswordInputRef.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enterdEmail,
            password: enterdPassowrd,
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
            return res.json().then((data) => alert(data.error.message));
          }
        })
        .then((data) => {
          console.log("gandu rohan", data);
          if (data) {
            // authCntx.login(data.idToken);
            dispatch(authActions.login({token: data.idToken, email: data.email}))
            history.replace("/welcome");
          }
        });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enterdEmail,
            password: enterdPassowrd,
            returnSecureToken: true,
          }),
        }
      ).then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            //   alert(data.error.message)
          });
        }
      });
    }
  };

  const forPasHandler = () =>{
    history.push('/forget')
  }


  return (
    <section className={classes.login}>
      <form onSubmit={submitHandler}>
        <h1>{isLogin ? "login" : "Sign Up"}</h1>
        <div>
          <label>Email Id</label>
          <input type="email" required ref={emailInputRef} />

          <label>Password</label>
          <input type="password" required ref={passwordInputRef} />

          <label>Confirm Password</label>
          <input type="password" required ref={conPasswordInputRef} />

          <button type="submit" className={classes.button1}>
            {isLogin ? "login" : "Sign Up"}
          </button>

          {isLogin && (
            <button className={classes.button3} type="button"
            onClick={forPasHandler}>
              
              Forget Password
            </button>
          )}

          <button
            type="button"
            className={classes.button2}
            onClick={switchHandler}
          >
            {isLogin ? "Have an account? Login" : " Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
