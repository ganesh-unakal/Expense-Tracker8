import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalQnty: 0
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQnty++
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.title,

                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemToCart(state, action) {
            const id = action.payload; //my payload is based on id
            const existingItem = state.items.find(item => item.id === id);
            state.totalQnty--

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice
            }
        }
    },

})

export const cartActions = cartSlice.actions

export default cartSlice