import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchcartData = () => {
    return async(dispatch) => {
        const fetchData = async() => {
            const response  = await fetch('https://cartecommarce-default-rtdb.firebaseio.com/cart.json')
        

        if(!response.ok) {
            throw new Error ('could not fetch cart data')
        }
        const data = await response.json()

        return data 
    };

    try{
       const cartData = await fetchData();
       dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQunty,
      })
       );
    }catch (error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Error...',
            message: 'fetching cart data is failed!'
        }))
    }
}}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending...',
            message: 'sending cart data!'
        }))

        const sendrequest = async () => {
            const response = await fetch("https://cartecommarce-default-rtdb.firebaseio.com/cart.json",
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQnty
                    }),
                });


            if (!response.ok) {
                throw new Error('sending cart data failed')
            }
        }

        try {
            await sendrequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'sending cart data successfully!'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'sending cart data is failed!'
            }))
        }

    }
}
