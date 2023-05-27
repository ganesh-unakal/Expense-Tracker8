import React from "react";
import classes from "./ExpesneList.module.css";

const ExpenseList = (props) => {

const deleteHandler = async(id) =>{
  const response = await fetch(`https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense/${id}.json`,
  {
    method: "DELETE"
  })
  const  data = response
  console.log('delete expense', data)

  props.onDelete(id)
}

const editHandler =async(item) =>{
  const response = await fetch(`https://ecommerce-6aa66-default-rtdb.firebaseio.com/expense/${item.id}.json`)


  const data = await response.json()
  console.log('edit handler', data)
  props.onEdit(item)
  deleteHandler(item.id)
}

  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {props.items.map((item) => (
          <li key={item.id}>
            <span>{item.amount}</span>
            <span>{item.description}</span>
            <span>{item.category}</span>
            <button className={classes.button1} onClick={()=>editHandler(item)} >Edit</button>
            <button className={classes.button2} onClick={() => deleteHandler(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;
