import {userConstant} from './constants';
import axios from '../../containers/helpers/axios';


export const signupUser =(firstname,lastname,email,password)=>{
    return async dispatch=>{

        dispatch({
            type:userConstant.SIGNUP_REQUEST

        })


    const res = await axios.post('/admin/signup',{
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password
});
        if(res.status === 201){
            console.log(res);
            const msg=res.data.msg;
            dispatch({
             type:userConstant.SIGNUP_SUCCESS,
             payload:{
                 msg:msg
             }
         })
        }
         else{
             if(res.status === 400){
                dispatch({
                    type:userConstant.SIGNUP_FAILURE,
                   payload:{
                        error:'Registration Failed'
                   }
                   })
             }
         }  
       
    }
}
