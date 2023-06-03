import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import  {Fragment, useEffect} from 'react'
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let initial = true;


function App() {

const ShowCart = useSelector(state => state.ui.cartIsVisible)
const cart = useSelector(state=>state.cart)
const dispatch = useDispatch()
const notification = useSelector(state=> state.ui.notification)

 useEffect(()=>{
  const sendCartData = async() => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'sending...',
      message: 'sending cart data!'
    }))
  
  
    const response = await fetch("https://cartecommarce-default-rtdb.firebaseio.com/cart.json",
  {
    method : 'PUT',
    body: JSON.stringify(cart),
  });

  
  if(!response.ok) {
    throw new Error('sending cart data failed')
  }


    dispatch(uiActions.showNotification({
    status: 'success',
    title: 'Success',
    message: 'sending cart data successfully!'
  }))
  }


  
if(initial){
  initial = false;
  return;
}
 

  sendCartData().catch((err) =>{
    dispatch(uiActions.showNotification({
      status: 'error',
      title: 'Error...',
      message: 'sending cart data is failed!'
    }))
  });



 },[cart, dispatch ])

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
      {ShowCart && <Cart /> }
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
