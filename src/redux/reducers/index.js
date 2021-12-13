import { combineReducers } from "redux";
import cartReducer from "./cart";
import overlayReducer from "./overlay";

export default combineReducers({
  cartReducer,
  overlayReducer,
});
