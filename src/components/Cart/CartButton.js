import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';



const CartButton = (props) => {

  const cartQunty = useSelector(state => state.cart.totalQnty)

  const dispatch = useDispatch()

  const cartHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQunty}</span>
    </button>
  );
};

export default CartButton;
