import {createStore,applyMiddleware,combineReducers} from 'redux';
import authReducer from '../reducer/authReducer';
import cartReducer from '../reducer/cartReducer';
import CategoryReducer from '../reducer/categoryReducer'; 
import ProductReducer from '../reducer/productReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../reducer/userReducer';

const thunkMiddleware = require('redux-thunk').default;

const rootReducer = combineReducers({
   
    category:CategoryReducer,
    product:ProductReducer,
    auth:authReducer,
    cart: cartReducer,
    user: userReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;