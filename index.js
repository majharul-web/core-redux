
//Redux main terminology
/*
    1.state
    2.dispatch action
    3.reducer
    4.store-getState(),dispatch(),subscribe();

*/

const {createStore,applyMiddleware}=require("redux");
const {logger} = require("redux-logger");

//define constant
const GET_PRODUCTS="GET_PRODUCTS";
const ADD_PRODUCTS="ADD_PRODUCTS";

//define initial state
const initialProductsState={
    products:["sugar","salt"],
    totalProducts:2
};

//define action
const getProducts=()=>{
    return{
        type:GET_PRODUCTS,
    }
};
const addProduct=(product)=>{
    return{
        type:ADD_PRODUCTS,
        payload:product
    }
};


//define reducer
const productReducer= (state=initialProductsState,action) => {
  switch (action.type) {
      case GET_PRODUCTS:
          return{
              ...state
          };
      case ADD_PRODUCTS:
          return {
              products: [...state.products,action.payload],
              totalProducts: state.totalProducts + 1
          };
      default:
        return state;
  }
};


//store
const store = createStore(productReducer,applyMiddleware(logger));
store.subscribe(()=>{
    console.log(store.getState());
});

//action dispatch
store.dispatch(addProduct("oil"));
store.dispatch(getProducts());



