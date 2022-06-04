
//Redux main terminology
/*
    1.state
    2.dispatch action
    3.reducer
    4.store-getState(),dispatch(),subscribe();

*/

const {createStore,applyMiddleware}=require("redux");
const {logger} = require("redux-logger");
const {default:thunk} = require("redux-thunk");
const {default:axios} = require("axios");

//define constant
const GET_TODOS_REQUEST="GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS="GET_TODOS_SUCCESS";
const GET_TODOS_FAILED="GET_TODOS_FAILED";
const API_URL="https://jsonplaceholder.typicode.com/users/1/todos";

//define initial state
const initialTodosState={
    todos:[],
    isLoading:false,
    error:null
};

//define action
const getTodosRequest=()=>{
    return{
        type:GET_TODOS_REQUEST,
    }
};
const getTodosFailed=(error)=>{
    return{
        type:GET_TODOS_REQUEST,
        payload:error
    }
};
const getTodosSuccess=(todos)=>{
    return{
        type:GET_TODOS_SUCCESS,
        payload:todos
    }
};



//define reducer
const todosReducer= (state=initialTodosState,action) => {
  switch (action.type) {
      case GET_TODOS_REQUEST:
          return {
             ...state,
              isLoading: true
          };
      case GET_TODOS_SUCCESS:
          return{
              ...state,
              isLoading: false,
              todos: action.payload
          };
      case GET_TODOS_FAILED:
          return {
            ...state,
              isLoading: false,
              error: action.payload
          };
      default:
        return state;
  }
};

//fetch data
const fetchData = ()=>{
    return(dispatch)=>{
        dispatch(getTodosRequest());
        axios
            .get(API_URL)
            .then(response=>{
                const todos=response.data;
                const titles=todos.map(todo=>todo.title);
                dispatch(getTodosSuccess(titles))
                // console.log(titles)
            })
            .catch(error=> {
                // dispatch(getTodosFailed(error.errorMessage))
            })
    }
}


//store
const store = createStore(todosReducer,applyMiddleware(thunk));
store.subscribe(()=>{
    console.log(store.getState());
});

//action dispatch
store.dispatch(fetchData());




