import { useContext, useEffect, useState , useCallback} from "react";
import classes from "./WelcomePage.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/Auth-context";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpesneList";

const WelcomePage = () => {
  const authctx = useContext(AuthContext);
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null)


  const routeChange = () => {
    history.push("/welcome/profile");
  };

  const logoutHandler = () => {
    authctx.logout();
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

  const saveExpenseDataHandler = (expense) => {
    setItems((prev) => [...prev, expense]);
  };


  const getExpense = useCallback(async() =>{
   const response = await fetch('https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense.json')

    const data = await response.json()
    console.log('back data', data)
  

  const loadedExpense = []

  for(const key in data){
    loadedExpense.push({
      id: key,
      amount: data[key].amount,
      description : data[key].description,
      category: data[key].category
    })
  }

  setItems(loadedExpense)
},[])

  useEffect(() =>{
    getExpense()
  },[getExpense]
  
 
  
  )
  const deleteHandler =(id) =>{
    console.log('received',id)
    setItems(prev =>{
      const updatedExpense = prev.filter(item => item.id !== id)
      return updatedExpense
    })
  }

  
  const editHandler =(id)=>{
    console.log('receving edit id in welcome file',id)
    setEditId(id)
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

        <p>
          your profile is incomplete.
          <button onClick={routeChange}>Complete now</button>
        </p>
      </span>
      <ExpenseForm onSaveData={saveExpenseDataHandler} editingId={editId} items={items}/>
      <ExpenseList items={items} onDelete={deleteHandler} onEdit={editHandler}/>
    </div>
  );
};
export default WelcomePage;
