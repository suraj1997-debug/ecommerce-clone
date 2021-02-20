import axios from '../../components/helpers/axios';
import {productConstant} from './constants';

export const getProduct = (slug)=>{
    return async dispatch=>{
     
        const res = await axios.get(`/getProductBySlug/${slug}`);
        
        if(res.status === 200){
            dispatch({
                type:productConstant.GET_PRODUCT_SUCCESS,
                payload:res.data
            })
        }
        else{
            console.log(res);
            dispatch({
                type:productConstant.GET_PRODUCT_FAILURE,
                payload:error
            })
       
        }
    }
} 


export const getProductPage = (payload)=>{
    return async dispatch=>{
        try{
            dispatch({
                type:productConstant.GET_PRODUCT_PAGE_REQUEST
            })
       
        const { cid , type } = payload.params;
        const res = await axios.get(`/page/${cid}/${type}`);
        
        if(res.status === 200){
            dispatch({
                type:productConstant.GET_PRODUCT_PAGE_SUCCESS,
                payload:res.data
            })
        }
        else{
            dispatch({
                type:productConstant.GET_PRODUCT_PAGE_FAILURE,
                payload:res.data
            })
       
        }
    }
    catch(error){
        console.log(error);
    }
    }
} 

export const getProductDetails = (payload) =>{

   
      return async dispatch=>{
        dispatch({
            type:productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST
        })
        const {productId} = payload.params;

        const res = await axios.get(`/product/${productId}`);

        if(res.status === 200){
            dispatch({
                type:productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: {
                    productDetails: res.data.product
                }
            })
        }
        else{
            dispatch({
                type:productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: {
                    error: res.data.error
        }
    })
}
}
}