const redux = require("redux");

const counterReducer =(state = {counter:0} , action) =>{
    if(action.type === 'incrementby2') {
        return{
        counter : state.counter + 2
    };
};


if(action.type === 'decrementby2') {
    return{
        conter: state.counter -2
    }
}
}

const store = redux.createStore(counterReducer)


const counterSunbscriber = () => {
const latestState = store.getState();
console.log(latestState)
}

store.subscribe(counterSunbscriber)

store.dispatch({ type : 'incrementby2'})

store.dispatch({type:'decrementby2'})