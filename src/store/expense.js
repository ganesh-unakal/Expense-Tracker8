import { createSlice } from '@reduxjs/toolkit';


const initialExpenseState = {
    data: {},
    showPremium: localStorage.getItem('isPremium') === true,
    showDark: localStorage.getItem('darktheme') === 'true'
}

const ExpenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        receivedData(state, action) {
            state.data = action.payload
            console.log('ex', state.data)
        },

        Premium(state) {
            state.showPremium = true
            localStorage.setItem("ispremium", false)
        },
        notPremium(state) {
            state.showPremium = false
            localStorage.setItem("isPremium", false)
        },
        toggle(state) {
            state.showDark = !state.showDark
            localStorage.setItem("darktheme", state.showDark)
            window.location.reload()
        }

    }
})

export const expenseActions = ExpenseSlice.actions

export default ExpenseSlice.reducer