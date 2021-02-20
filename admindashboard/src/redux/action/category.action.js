import {categoryConstant} from '../action/constants';
import axios from '../../containers/helpers/axios';

const getCategory=()=>{
    return async dispatch=>{
       
        dispatch({
            type:categoryConstant.GET_CATEGORY_REQUEST
        })

        const res= await axios.get('/category/categories');
       if(res.status === 200){
        // console.log(res);
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

export const addCat = (form)=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstant.ADD_CATEGORY_REQUEST
        })

    const res = await axios.post('/category/create',form);
    try{
        if(res.status === 201){
            dispatch({
                type:categoryConstant.ADD_CATEGORY_SUCCESS,
                payload:{
                    category:res.data.category
                }
            })
        }else{
        
                dispatch({
                    type:categoryConstant.ADD_CATEGORY_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                });
        }
    }
    catch(error){
        console.log(error)
    }

   
    }
}


export const updateCat = (form)=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstant.UPDATE_CATEGORY_REQUEST
        })

    const res = await axios.post(`/category/update`,form);
    
        if(res.status === 201){
            dispatch({
                type:categoryConstant.UPDATE_CATEGORY_SUCCESS
            })
            dispatch(getCategory());
           
        }else{
           const{ error} = res.data;
            dispatch({
                type:categoryConstant.UPDATE_CATEGORY_FAILURE,
                payload:{
                    error:error
                }
            })
              
        }
    }
}


export const deleteCat = (ids) =>{
    return async dispatch=>{
        dispatch({
            type:categoryConstant.DELETE_CATEGORY_REQUEST
        });

        const res = await axios.post(`/category/delete`,{
            payload:{
                ids
            }
        });
        if(res.status === 201){
            dispatch({
                type:categoryConstant.DELETE_CATEGORY_SUCCESS
            });
            dispatch(getCategory());
        }
        else{
            const{error} = res.data;
            dispatch({
                type:categoryConstant.DELETE_CATEGORY_FAILURE,
                payload:{
                    error: error
                }
            });
        }
    }
}
 

    export{
        getCategory
    }
