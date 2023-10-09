import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartsubTotal : 0,
  cartQuantity : 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.itemQuantity++;
        toast.info(
          `${
            action.payload.title.length > 14
              ? action.payload.title.slice(0, 14) + "..."
              : action.payload.title
          } quantity increased`,
          { position: "bottom-left" }
        );
      } else {
        state.cartItems.push({ ...action.payload, itemQuantity: 1 });
        toast.success(
          `${
            action.payload.title.length > 14
              ? action.payload.title.slice(0, 14) + "..."
              : action.payload.title
          } added to Cart`,
          { position: "bottom-left" }
        );
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      const filteredCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = filteredCart;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} removed from Cart`, {
        position: "bottom-left",
      });
    },
    decreaseItem(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
    if (state.cartItems[itemIndex].itemQuantity > 1) {
        state.cartItems[itemIndex].itemQuantity--
        toast.info(
          `${state.cartItems[itemIndex].title} quantity decreased to ${state.cartItems[itemIndex].itemQuantity}`,
          { position: "bottom-left" }
        )
    } else {
        const removedItem = state.cartItems[itemIndex];
        const filteredCart = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = filteredCart;
        toast.error(`${removedItem.title} removed`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    increaseItem(state, action) {
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

        state.cartItems[itemIndex].itemQuantity ++
        localStorage.setItem('cartItem', JSON.stringify(state.cartItems))
    },
    getTotal(state){
      let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) =>{
        const {price, itemQuantity} = cartItem
        const itemTotal = itemQuantity * price
        cartTotal.total += itemTotal
        cartTotal.quantity += itemQuantity
        return cartTotal
      },{
        total : 0,
        quantity : 0
      })
      state.cartsubTotal = total
      state.cartQuantity = quantity
    }    
   },
});
export default cartSlice.reducer;
export const { addToCart, removeItem, increaseItem, decreaseItem, getTotal } =
  cartSlice.actions;
export const getCartItems = (state) => state.cart.cartItems;

