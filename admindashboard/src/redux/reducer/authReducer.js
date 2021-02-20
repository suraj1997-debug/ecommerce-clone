
import {authConstant} from '../action/constants';

const initialState = {
  token:null,
  user:{
      firstname:'',
      lastname:'',
      email:'',
      pictures:''
  },
  authenticate:false,
  authenticating:false,
  error:null,
  msg:'',
  loading:false
    
}


const authReducer = (state = initialState,action)=>{
    switch(action.type){
        case authConstant.LOGIN_REQUEST:
            state={
            ...state,
            authenticating:true
        }
        break;
        case authConstant.LOGIN_SUCCESS:
            state={
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            authenticate:true
        }
        break;
        case authConstant.LOGIN_FAILURE:
            state={
            ...state,
            error:action.payload.error,
            isloggedIn:false
        }
        break;
        case authConstant.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true
           
        }
        break;
        case authConstant.LOGOUT_SUCCESS:
            state={
            ...initialState
        }
        break;
        case authConstant.LOGOUT_FAILURE:
            state={
            ...state,
            error:action.payload.error,
            loading:false
        }
        break;
    }
    return state;
}

export default authReducer;