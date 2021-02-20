import { userConstant } from '../action/constants';

const initialState = {
   error:null,
    msg:'',
    loading:false
}

const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case userConstant.SIGNUP_REQUEST:
            state={
            ...state,
            loading:true
        }
        break;
        case userConstant.SIGNUP_SUCCESS:
            state={
            ...state,
            msg:action.payload.msg,
            loading:false
        }
        break;
        case userConstant.SIGNUP_FAILURE:
            state={
            ...state,
            error:action.payload.error,
            loading:false
        }
    }
    return state;
}

export default userReducer;