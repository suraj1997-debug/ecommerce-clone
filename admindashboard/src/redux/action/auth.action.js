import {authConstant} from './constants';
import axios from '../../containers/helpers/axios';


export const loginUser=(email,password)=>{

    return async dispatch=>{
       
        
        dispatch({
            type:authConstant.LOGIN_REQUEST
        })
       
       
      const res = await axios.post('/admin/signin',{
        email:email,
        password:password
      });
            if(res.status === 200){
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('token',token);
                localStorage.setItem('user',JSON.stringify(user));
 
                dispatch({
                 type:authConstant.LOGIN_SUCCESS,
                 payload:{
                     token,user
                 }
             })
            }else{
                if(res.status === 500){
                    dispatch({
                        type:authConstant.LOGIN_FAILURE,
                        payload:{
                            error:'Invalid Login'
                        }
                    })
                }
            }
    
    }
}


export const isUserLoggedIn=()=>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type:authConstant.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstant.LOGIN_FAILURE,
                payload:{
                    error:'User Needs to login'
                }
            })
        }
    }
}



export const logoutUser = ()=>{
    return async dispatch =>{
        dispatch({
            type:authConstant.LOGOUT_REQUEST
        })
       
            const res= await axios.post('/admin/signout');
        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type:authConstant.LOGOUT_SUCCESS
            })
        }
        else{
            dispatch({
                type:authConstant.LOGOUT_FAILURE,
                payload:{error:res.data.error}
               
            })
        }
        
        

    }
}