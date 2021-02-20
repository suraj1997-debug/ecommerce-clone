import axios from '../../components/helpers/axios';
import { userConstant } from './constants';


export const getAddress = () => {
    return async dispatch => {
        try {
            dispatch({
                type: userConstant.GET_USER_ADDRESS_REQUEST
            })

            const res = await axios.post(`/user/getAddress`);

            if (res.status === 200) {
                const {
                    userAddress: { address }
                } = res.data;

                dispatch({
                    type: userConstant.GET_USER_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstant.GET_USER_ADDRESS_FAILURE,
                    payload: {
                        error
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try {
            dispatch({
                type: userConstant.ADD_USER_ADDRESS_REQUEST
            })
            const res = await axios.post(`/user/address/create`, { payload });

            if (res.status === 201) {
                const {
                    address: { address }
                } = res.data;
                dispatch({
                    type: userConstant.ADD_USER_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstant.ADD_USER_ADDRESS_FAILURE,
                    payload: {
                        error
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/addOrder`, payload);
            dispatch({ type: userConstant.ADD_USER_ORDER_REQUEST });
            if (res.status === 201) {
                console.log(res);
                const { order } = res.data;
                dispatch({
                    type: cartConstants.RESET_CART,
                });
                dispatch({
                    type: userConstant.ADD_USER_ORDER_SUCCESS,
                    payload: { order },
                });
                // const {
                //   address: { address },
                // } = res.data;
                // dispatch({
                //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                //   payload: { address },
                // });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstant.ADD_USER_ORDER_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const getOrders = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`/getOrders`);
        dispatch({ type: userConstant.GET_USER_ORDERS_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { orders } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDERS_SUCCESS,
            payload: { orders },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDERS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const getOrder = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(`/getOrder`, payload);
        dispatch({ type: userConstant.GET_USER_ORDER_DETAILS_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDER_DETAILS_SUCCESS,
            payload: { order },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDER_DETAILS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };