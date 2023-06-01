import React from "react";
import classes from "./ExpesneList.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";

const ExpenseList = (props) => {
  const [receivedExpense, setreceivedExpense] = useState([])
  const dispatch = useDispatch();


  useEffect(() => {
    fetch('https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense.json')
      .then((res) => {
        console.log('expenseList', res)
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error.message)
          })
        }
      }
      ).then((data) => {
        console.log('el', data)
        setreceivedExpense(data)
        console.log(receivedExpense)
        dispatch(expenseActions.receivedData(data))
      })
  }, [dispatch])


  const deleteHandler = async (id) => {
    const response = await fetch(`https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense/${id}.json`,
      {
        method: "DELETE"
      })
    // const  data = response
    // console.log('delete expense', data)
    console.log(response)

    if (response.ok) {
      setreceivedExpense((prevExpense) => {
        const updatedExpense = { ...prevExpense };
        // console.log(updatedExpense)
        delete updatedExpense[id];
        return updatedExpense
      })
    }
  }

  const editHandler = async (key) => {
    const response = await fetch(`https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense/${key}.json`)


    const data = await response.json()
    console.log('edit handler', data)

    const { amount, description, category } = receivedExpense[key]

    const obj = {
      amount: amount,
      description: description,
      category: category
    }

    props.onEdit(obj)
    deleteHandler(key)
    console.log(obj)
  }

  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {Object.keys(receivedExpense).map((key) => (
          // <li key={item.id}>
          <li key={key}>
            <span>{receivedExpense[key].amount}</span>
            <span>{receivedExpense[key].description}</span>
            <span>{receivedExpense[key].category}</span>
            <button className={classes.button1} onClick={() => editHandler(key)} >Edit</button>
            <button className={classes.button2} onClick={() => deleteHandler(key)}>Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;
