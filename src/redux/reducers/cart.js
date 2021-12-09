const INITIAL_STATE = {
  totalQty: 0,
  cartData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return {
        ...state,
        cartData: action.payload.cartData,
        totalQty: action.payload.totalQty,
      };
    case "RESET_CART":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
