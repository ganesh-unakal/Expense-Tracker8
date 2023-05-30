import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/Index';


const Counter = () => {

  const counter = useSelector(state => state.counter.counter)

  const dispatch = useDispatch()

  const show = useSelector(state => state.counter.showCounter)

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(2)) // {type : some_id, payload : 2}
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }


  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };



  // const decrementHandler = () =>{
  // dispatch({type : 'decrement'})
  // }

  //   const toggleCounterHandler = () => {}; 


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {!show && <div className={classes.value}>{counter}</div>}
      <button onClick={incrementHandler}>increment</button>
      <button onClick={decrementHandler}>decrement</button>
      <button onClick={increaseHandler}>Increment by 2</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}




export default Counter;
