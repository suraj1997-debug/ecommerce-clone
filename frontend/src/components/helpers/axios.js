import axios from 'axios';
import {BaseUrl} from '../../urlConfig';
import {authConstant} from '../../redux/action/constants';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL:BaseUrl,
    headers:{
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosInstance.interceptors.request.use((req)=>{
    const{auth} = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})


axiosInstance.interceptors.response.use((res)=>{
   
    return res;
},(error)=>{
    const status = error.response ? error.response.status : 500;
    if(status){
    if(status === 500){
        localStorage.clear();
        store.dispatch({
            type:authConstant.LOGOUT_SUCCESS
        })
    }
}
    return Promise.reject(error);
})

export default axiosInstance;