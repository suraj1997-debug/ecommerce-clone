import {categoryConstant} from '../action/constants';
import axios from '../../components/helpers/axios';

export const getCategory=()=>{
    return async dispatch=>{
       
        dispatch({
            type:categoryConstant.GET_CATEGORY_REQUEST
        })

        const res= await axios.get(`/category/categories`);
       if(res.status === 200){
        console.log(res);
        const {categories} =res.data;
        dispatch({
            type:categoryConstant.GET_CATEGORY_SUCCESS,
            payload:{
                categories:categories
            }
        })
       }
       else{
           if(res.status === 400){
            dispatch({
                type:categoryConstant.GET_CATEGORY_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
           }
       }
        
    }
}

