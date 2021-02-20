import {cartConstant} from '../action/constants';

const initialState = {
    cartItems:{},
    error:null,
    updatingCart:false
};

const cartReducer = (state = initialState,action) =>{
    switch(action.type){
        case cartConstant.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart:true
            }
            break;
        case cartConstant.ADD_TO_CART_SUCCESS:
            state={
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstant.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                updatingCart: false
            }
            break;
        case cartConstant.RESET_CART:
            state = {
                ...initialState
            }
            break;
    }
    return state;
}

export default cartReducer;