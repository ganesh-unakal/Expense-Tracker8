//import { createStore} from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialCounterState = {
    counter: 0,
    showCounter: true
}


const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            state.counter = state.counter + action.payload
        },
        toggle(state) {
            state.showCounter = !state.showCounter
        }
    }
})
// const counterReducer = (state ={ counter: 0}, action)=> {
// if(action.type === 'increment'){
//     return {
//         counter :state.counter + 1
//     }
// }

// if (action.type === 'decrement'){
//     return{
//         counter: state.counter - 1
//     }
// }

// return state;
const initialAuthState = {
    isAuthentication: false
}

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthentication = true
        },
        logout(state) {
            state.isAuthentication = false
        }
    }
})

// const store = createStore(counterReducer);

const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: AuthSlice.reducer }
})

export const counterActions = counterSlice.actions

export const authActions = AuthSlice.actions

export default store;


