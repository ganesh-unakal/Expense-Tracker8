import { useState, useEffect } from "react";
import classes from "./WelcomePage.module.css";
import { useHistory } from "react-router-dom";
// import AuthContext from "../../store/Auth-context";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpesneList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authentication";
import { expenseActions } from "../../store/expense";
import { saveAs } from "file-saver";

const WelcomePage = () => {
  // const authctx = useContext(AuthContext);
  const history = useHistory();
  const [editItem, setEditItem] = useState(null)
  const dispatch = useDispatch();


  const receivedData = useSelector(state => state.expense?.data)
  let [isPremiumClicked, setIsPremiumClicked] = useState(false);

  const premium = useSelector(state => state.expense?.showPremium)


  const token = useSelector(state => state.authentication.token)

  const routeChange = () => {
    history.push("/welcome/profile");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.replace("/login");
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
          idToken: token,
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





  const darkHandler = () => {
    dispatch(expenseActions.toggle())
  }



  useEffect(() => {
    const premiumClickedStatus = localStorage.getItem("isPremiumClicked");
    if (premiumClickedStatus) {
      setIsPremiumClicked(JSON.parse(premiumClickedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isPremiumClicked", JSON.stringify(isPremiumClicked));
  }, [isPremiumClicked]);


  const premiumHandler = () => {
    localStorage.setItem('isPremiumClicked', true)
    window.location.reload()
  }


  const downloadHandler = () => {
    const csv =
      "Category,Description,Amount\n" +
      Object.values(receivedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");

    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv")
  }


  const editHandler = (item) => {
    console.log('receving edit id in welcome file', item)
    setEditItem(item);
  }
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


        {premium && <button style={{
          backgroundColor: "salmon",
          height: "25px",
          marginTop: "20px",
          borderRadius: "8px",

        }} onClick={premiumHandler}
        >Active Premium</button>}

        <button
          style={{
            backgroundColor: "red",
            height: "25px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
          onClick={logoutHandler}
        >
          Logout
        </button>

        {premium && isPremiumClicked && <button style={{
          backgroundColor: 'ThreeDFace',
          height: "45px",
          maxWidth: "120px",
          marginTop: "10px",
          borderRadius: "8px",
        }} onClick={darkHandler}>dark Theme/light Theme</button>}


        {premium && isPremiumClicked &&
          <button style={{
            backgroundColor: "cadetblue",
            height: "45px",
            maxWidth: "120px",
            marginTop: "10px",
            borderRadius: "8px"
          }}
            onClick={downloadHandler}>Download Expense</button>}



        <p>
          your profile is incomplete.
          <button onClick={routeChange}>Complete now</button>
        </p>
      </span>
      <ExpenseForm editItem={editItem} />
      <ExpenseList onEdit={editHandler} />
    </div>
  );
};
export default WelcomePage;
