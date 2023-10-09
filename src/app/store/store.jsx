import { configureStore } from "@reduxjs/toolkit";
import ecomReducer, { fetchData } from "../slice/slice";
import cartReducer, { getTotal } from "../slice/cartSlice";
import electReducer from "../slice/electSlice";
import jewelReducer from "../slice/jewelSlice";
import womenCReducer from "../slice/womenCSlice";
import menCReducer from "../slice/menCSlice";

export const store = configureStore({
  reducer: {
    ecom: ecomReducer,
    cart: cartReducer,
    elect: electReducer,
    jewel: jewelReducer,
    womenC: womenCReducer,
    menC: menCReducer,
  },
});

store.dispatch(getTotal());
store.dispatch(fetchData());
