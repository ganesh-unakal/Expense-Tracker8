import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authentication';
import ExpenseSlice from './expense'


const Store = configureStore({
  reducer: { authentication: authSlice, expense: ExpenseSlice }
});


export default Store;