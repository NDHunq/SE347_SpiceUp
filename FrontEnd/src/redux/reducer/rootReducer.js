import { createStore, combineReducers } from 'redux';
import qtyInCartReducer from './qtyInCart';

const rootReducer = combineReducers({
  qtyInCart:qtyInCartReducer ,
});

export default rootReducer;