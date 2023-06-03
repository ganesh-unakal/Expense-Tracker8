import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react'

import Notification from './components/UI/Notification';

import { sendCartData, fetchcartData } from './store/cart-actions';
let initial = true;


function App() {

  const ShowCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
 dispatch(fetchcartData())
  },[dispatch] )

  useEffect(() => {

    if (initial) {
      initial = false;
      return;
    }

    if(cart.fetchcartData){
      dispatch(sendCartData(cart))
    }

   
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification &&
        (<Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
        )}
      <Layout>
        {ShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
