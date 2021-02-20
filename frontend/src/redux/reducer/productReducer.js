
import { productConstant } from "../action/constants";

const initialState = {
    products:[],
    priceRange:{},
    productPrice:{},
    error:null,
    page:{},
    productDetails:{},
    pageRequest:false
}

const ProductReducer  = (state = initialState,action)=>{
    switch(action.type){
        case productConstant.GET_PRODUCT_SUCCESS:
            state={
                ...state,
                products:action.payload.products,
                priceRange:action.payload.priceRange,
                productPrice:{
                    ...action.payload.productPrice
                }
            }
            break;
        case productConstant.GET_PRODUCT_FAILURE:
            state={
                ...state,
                error: action.payload
            }
            break;
        case productConstant.GET_PRODUCT_PAGE_REQUEST:
            state={
                ...state,
                pageRequest:true
            }
            break;
        case productConstant.GET_PRODUCT_PAGE_SUCCESS:
            state={
                ...state,
                page:action.payload.page,
                pageRequest:false
            }
            break;
        case productConstant.GET_PRODUCT_PAGE_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                pageRequest:false
            }
            break;
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state={
                ...state
                }
            break;    
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state={
                ...state,
                productDetails: action.payload.productDetails,
                }
            break; 
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                }
            break;
    }
    return state;
}


export default ProductReducer;


