import axios from '../../containers/helpers/axios';
import {categoryConstant,productConstant,orderConstants} from './constants';

export const getinitialData = () =>{
    return async dispatch=>{
        const res = await axios.post('/initialData');

        if(res.status === 200){
            const { categories, products, orders } = res.data;
        
            
            dispatch({
                type:categoryConstant.GET_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({
                type:productConstant.GET_PRODUCTS_SUCCESS,
                payload:{ products }
            })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders },
              });
           

          
        }
      }
       
        
    }
