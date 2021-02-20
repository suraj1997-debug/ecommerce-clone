import {userConstant} from '../action/constants';

const initialState = {
    loading:false,
    address:[],
    error:null,
    orders:[],
    orderFetching: false,
    orderDetails:{},
    placedOrderId:null
}

const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case userConstant.ADD_USER_ADDRESS_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case userConstant.ADD_USER_ADDRESS_SUCCESS:
            state={
                ...state,
                address:action.payload.address,
                loading:false
            }
            break;
        case userConstant.ADD_USER_ADDRESS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case userConstant.GET_USER_ADDRESS_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case userConstant.GET_USER_ADDRESS_SUCCESS:
            state={
                ...state,
                address:action.payload.address,
                loading:false
            }
            break;
        case userConstant.GET_USER_ADDRESS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case userConstant.GET_USER_ORDERS_REQUEST:
            state = {
                ...state,
                orderFetching:true
            }
            break;
        case userConstant.GET_USER_ORDERS_SUCCESS:
            state={
                ...state,
                orders:action.payload.orders,
                orderFetching:false
            }
            break;
        case userConstant.GET_USER_ORDERS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                orderFetching:false
            }
            break;
        case userConstant.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                placedOrderId: action.payload.order._id,
            }
            break;
        case userConstant.GET_USER_ORDER_DETAILS_REQUEST:
            break;
            case userConstant.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
            };
            break;
        case userConstant.GET_USER_ORDER_DETAILS_FAILURE:
            state={
                ...state,
                error:action.payload.error
            }
            break;
    
    }
    return state;
}

export default userReducer;