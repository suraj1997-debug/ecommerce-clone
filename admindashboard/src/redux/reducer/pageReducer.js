import {pageConstant} from '../action/constants';

const initialState ={
    loading:false,
    error:null,
    page:{}
}


const pageReducer = (state = initialState,action) =>{
    switch(action.type){
        case pageConstant.CREATE_PAGE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case pageConstant.CREATE_PAGE_SUCCESS:
            state={
                ...state,
                page:action.payload.page,
                loading:false
            }
            break;
        case pageConstant.CREATE_PAGE_FAILURE:
            state={
                ...state,
                loading:false
            }
            break;
    }
    return state;
}


export default pageReducer;
