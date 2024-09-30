// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducer/rootReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
// export default store;
import { createStore } from 'redux';
import rootReducer from './reducer/rootReducer';  

const store = createStore(rootReducer); 

export default store;  