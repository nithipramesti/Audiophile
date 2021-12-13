const INITIAL_STATE = {
  overlay: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OVERLAY_TRUE":
      return {
        ...state,
        overlay: true,
      };
    case "OVERLAY_FALSE":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
