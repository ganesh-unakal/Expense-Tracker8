import React, { Fragment, useRef, useEffect } from "react";
import classes from "./ExpenseForm.module.css";
import { useState } from "react";


const ExpenseForm = (props) => {
  const inputPrice = useRef();
  const inputDesc = useRef();
  const inputCat = useRef();
  const [receivedExpense, setReceivedExpense] = useState([])




  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPrice = inputPrice.current.value;
    const enteredDesc = inputDesc.current.value;
    const enteredCat = inputCat.current.value;

    const obj = {
      amount: enteredPrice,
      description: enteredDesc,
      category: enteredCat,
    };

    const response = await fetch(
      "https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("sending data", data);
    //setReceivedExpense([...receivedExpense, obj])
    console.log('aaaaaaaaaaa', receivedExpense)
    window.location.reload();
    // props.onSaveData(obj);
  };


  useEffect(() => { //this for editing 
    if (props.editItem) {
      inputPrice.current.value = props.editItem.amount;
      inputDesc.current.value = props.editItem.description;
      inputCat.current.value = props.editItem.category;
    }
  }, [props.editItem])




  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" ref={inputPrice} required />

        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" required ref={inputDesc} />

        <label htmlFor="cat">Category</label>
        <select id="cat" ref={inputCat}>
          <option value="food">Food</option>
          <option value="electricity">Electricity</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>

        <button>Add Expense</button>
      </form>
    </Fragment>
  );
};

export default ExpenseForm;
