import { createSlice} from '@reduxjs/toolkit';


const initialExpenseState={
    data : {}
}

const ExpenseSlice = createSlice({
    name : 'expense',
    initialState : initialExpenseState,
    reducers : {
        receivedData(state,action){
            state.data = action.payload
            console.log('ex', state.data)
        }
    }
})

export const expenseActions = ExpenseSlice.actions

export default ExpenseSlice.reducer