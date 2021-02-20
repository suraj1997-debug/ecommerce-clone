import axios from '../../containers/helpers/axios';
import {productConstant} from './constants';


export const addProduct=(form)=>{
    return async dispatch=>{
        dispatch({
            type:productConstant.ADD_PRODUCT_REQUEST
        })

        try{
            const res = await axios.post('/product/create',form);
            if(res.status === 201){
                
                dispatch({
                    type:productConstant.ADD_PRODUCT_SUCCESS,
                    payload:{
                        product:res.data.product
                    }
                })
            }
               else{
                dispatch({
                    type:productConstant.ADD_PRODUCT_FAILURE
                })
            }
        }
        catch(error){
            console.log(error);
        }

   
    }

}


