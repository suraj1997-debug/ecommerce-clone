import axios from '../../containers/helpers/axios';
import {pageConstant} from './constants';


export const createPage = (form) =>{
    return async dispatch =>{
        dispatch({
            type:pageConstant.CREATE_PAGE_REQUEST
        })
        
        try{

        const res = await axios.post(`/page/create`,form);

        if(res.status === 201){
            const {message,page} = res.data;
            dispatch({
                type:pageConstant.CREATE_PAGE_SUCCESS,
                payload:{
                    msg:message,
                    page:page
                }
            })
        }
        else {
            dispatch({
                type:pageConstant.CREATE_PAGE_FAILURE
            })
        }
    }catch(error){
        console.log(error);
    }
    }
}