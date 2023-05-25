import { useRef } from 'react';
import classes from './ForgetPassword.module.css';

const ForgetPassword = () =>{

const inputEmail= useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = inputEmail.current.value

        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBgkuX71lzEFVeBFr_IbWeurMbYJwus4SI",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail
            }),
            headers: {
              "content-type": "application/json",
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
            console.log("received loda ", data);
          })
          .catch((err) => console.log(err));
    }


     return(
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
            <label>Enter the email with which you have registered</label>
            <input type='text' ref={inputEmail}/>

            <button >Send Link</button>
            
            </form>
        </div>
     )
}

export default ForgetPassword; 