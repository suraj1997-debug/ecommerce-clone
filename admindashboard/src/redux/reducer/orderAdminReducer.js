import { orderConstants } from "../action/constants";

const initialState = {
  orders: []
};

 const orderAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
  }

  return state;
};

export default orderAdminReducer;