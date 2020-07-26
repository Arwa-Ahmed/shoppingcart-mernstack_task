import { createStore, combineReducers ,applyMiddleware,compose} from 'redux';
import { productListReducer,  productDetailsReducer,} from './reducers/productReducers';

import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducer';

//get cookie access and save change in qty when refresh page
const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {cart:{cartItems}};

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
})

//to see redux in browser
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );

export default store;