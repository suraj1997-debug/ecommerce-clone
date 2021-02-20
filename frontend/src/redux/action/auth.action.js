import {authConstant,cartConstant} from './constants';
import axios from '../../components/helpers/axios';

export const signup = (user) => {
    return async (dispatch) => {
      let res;
      try {
        dispatch({ type: authConstant.SIGNUP_REQUEST });
        res = await axios.post(`/signup`, user);
        if (res.status === 201) {
          dispatch({ type: authConstant.SIGNUP_SUCCESS });
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstant.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        } else {
          const { error } = res.data;
          dispatch({ type: authConstant.SIGNUP_FAILURE, payload: { error } });
        }
      } catch (error) {
        const { data } = error.response;
        dispatch({
          type: authConstant.SIGNUP_FAILURE,
          payload: { error: data.error },
        });
      }
    };
  };


export const loginUser=({email,password})=>{

    return async dispatch=>{
       
        
        dispatch({
            type:authConstant.LOGIN_REQUEST
        })
       
       
      const res = await axios.post('/signin',{
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



export const logoutUser = () => {
    return async (dispatch) => {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      localStorage.clear();
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
      dispatch({ type: cartConstant.RESET_CART });
      //const res = await axios.post(`/admin/signout`);
      // if(res.status === 200){
  
      // }else{
      //     dispatch({
      //         type: authConstants.LOGOUT_FAILURE,
      //         payload: { error: res.data.error }
      //     });
      // }
    };
  };