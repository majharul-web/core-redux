
//Redux main terminology
/*
    1.state
    2.dispatch action
    3.reducer
    4.store-getState(),dispatch(),subscribe();

*/

const {createStore,combineReducers}=require("redux");

//define constant
const GET_PRODUCTS="GET_PRODUCTS";
const ADD_PRODUCTS="ADD_PRODUCTS";

const GET_CART="GET_CART";
const ADD_TO_CART="ADD_TO_CART";

//define initial state
const initialProductsState={
    products:["sugar","salt"],
    totalProducts:2
};
const initialCartState={
    cart:["am","kola"],
    cartQuantity:2
}

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

const getCart=()=>{
    return{
        type:GET_CART,
    }
};
const addToCart=(product)=>{
    return{
        type:ADD_TO_CART,
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

const cartReducer= (state=initialCartState,action) => {
  switch (action.type) {
      case GET_CART:
          return{
              ...state
          };
      case ADD_TO_CART:
          return {
              cart: [...state.cart,action.payload],
              cartQuantity: state.cartQuantity + 1
          };
      default:
         return  state;
  }
};

//combine multiple reducer
const rootReducer =combineReducers({
    products:productReducer,
    cart:cartReducer
})

//store
const store = createStore(rootReducer);
store.subscribe(()=>{
    console.log(store.getState());
});

//action dispatch
// store.dispatch(addProduct("oil"));
store.dispatch(getProducts());
// store.dispatch(addToCart("oil"));
store.dispatch(getCart());


