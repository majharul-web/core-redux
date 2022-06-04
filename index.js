
//Redux main terminology
/*
    1.state
    2.dispatch action
    3.reducer
    4.store-getState(),dispatch(),subscribe();

*/

const {createStore}=require("redux");

//define const
const INCREMENT="INCREMENT";
const DECREMENT="DECREMENT";
const RESET="RESET";
const INCREMENT_BY_VALUE="INCREMENT_BY_VALUE";

//define state
const initialCounterState={
    count:0,
};

//define action-Object-type-payload
const incrementCounter=()=>{
    return{
        type: INCREMENT,
    }
};
const decrementCounter=()=>{
    return{
        type: DECREMENT,
    }
};
const resetCounter=()=>{
    return{
        type: RESET,
    }
};
const incrementByValue=(value)=>{
    return{
        type: INCREMENT_BY_VALUE,
        payload:value
    }
};


//creat reducer for counter
const counterReducer=(state=initialCounterState,action)=>{
    switch (action.type) {
        case INCREMENT:
            return{
                ...state,
                count: state.count+1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count-1
            }
        case RESET:
            return {
                ...state,
                count: 0
            }
        case INCREMENT_BY_VALUE:
            return {
                ...state,
                count: state.count+action.payload
            }
    //
        default:
            state;
    }
};

//store
const store=createStore(counterReducer);

store.subscribe(()=>{
    console.log(store.getState())
});

//dispatch action
store.dispatch(incrementCounter());
store.dispatch(decrementCounter());
store.dispatch(incrementByValue(10));
store.dispatch(resetCounter());