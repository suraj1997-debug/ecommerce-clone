import {createStore,applyMiddleware,combineReducers} from 'redux';
import authReducer from '../reducer/authReducer';
import CategoryReducer from '../reducer/categoryReducer';
import productReducer from '../reducer/productReducer';
import userReducer from '../reducer/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import pageReducer from '../reducer/pageReducer';
import orderAdminReducer from '../reducer/orderAdminReducer';

const thunkMiddleware = require('redux-thunk').default;

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category:CategoryReducer,
    product:productReducer,
    page:pageReducer,
    order:orderAdminReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;