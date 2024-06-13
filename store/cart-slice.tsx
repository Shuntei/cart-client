import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
// import { JWT_CART_POST } from "@/components/config/api-path";

interface CartItem {
  authId: number;
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  authId: number;
}

const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedItems = localStorage.getItem("myCart");
    return storedItems ? JSON.parse(storedItems) : [];
  }
  return [];
};

const initialState: CartState = {
  // items: [],
  items: loadCartFromLocalStorage(),
  authId: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (v) => v.authId === newItem.authId && v.id === newItem.id
      );
      console.log(existingItem);
      if (!existingItem) {
        state.items.push({
          authId: newItem.authId,
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.totalPrice,
          description: newItem.description,
        });
        // console.log("state.items: ", state.items);
        // axios.post(JWT_CART_POST, state.items); // 後端路由為 /api/cart
      } else {
        existingItem.quantity = newItem.quantity;
        existingItem.totalPrice = newItem.quantity * existingItem.price;

        // axios.post(JWT_CART_POST, state.items);
      }

      if (typeof window !== "undefined") {
        let storedItem = localStorage.getItem("myCart");
        // console.log(Boolean(storedItem));
        // 先確認是否有資料
        if (storedItem) {
          const copyStoredItem = JSON.parse(storedItem);
          // console.log("copyStoredItem", copyStoredItem);
          // console.log("newItem", newItem);
          // 在確認是否重複(使用者和商品都要)
          const isRepeat = copyStoredItem.filter(
            (v: any) => v.authId === newItem.authId && v.id === newItem.id
          );
          // console.log("removeRepeat", removeRepeat);
          // console.log("removeRepeatlength", removeRepeat.length);
          if (isRepeat.length > 0) {
            // 有重複資料存在，使用更新狀態並且加入其他使用者
            console.log("length>0");
            const othersCart = copyStoredItem.filter(
              (v: any) => v.authId !== newItem.authId
            );
            const mergeArray = othersCart.concat(state.items);
            localStorage.setItem("myCart", JSON.stringify(mergeArray));
          } else {
            // 沒重複資料存在，加入新資料並且加入原有資料
            console.log("length===0");
            const mergeArray = copyStoredItem.concat(newItem);
            localStorage.setItem("myCart", JSON.stringify(mergeArray));
          }
        } else {
          localStorage.setItem("myCart", JSON.stringify(state.items));
        }
      }
    },
    addQtyInCart(state, action) {
      const thisItem = action.payload;

      // console.log(thisItem);
      const existingItem = state.items.find(
        (v) => v.id === thisItem.id && v.authId === thisItem.authId
      );
      console.log(existingItem);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += thisItem.price;
      }
      if (typeof window !== "undefined") {
        let storedItem = localStorage.getItem("myCart");
        // console.log(Boolean(storedItem));
        // 先確認是否有資料
        if (storedItem) {
          const copyStoredItem = JSON.parse(storedItem);
          // console.log("copyStoredItem", copyStoredItem);
          // console.log("newItem", newItem);
          // 確認是否重複(使用者和商品都要)
          const isRepeat = copyStoredItem.filter(
            (v: any) => v.authId === thisItem.authId && v.id === thisItem.id
          );
          // console.log("removeRepeat", removeRepeat);
          // console.log("removeRepeatlength", removeRepeat.length);
          if (isRepeat.length > 0) {
            // 有重複資料存在，使用更新狀態並且加入其他使用者
            console.log("length>0");
            const othersCart = copyStoredItem.filter(
              (v: any) => v.authId !== thisItem.authId
            );
            const mergeArray = othersCart.concat(state.items);
            localStorage.setItem("myCart", JSON.stringify(mergeArray));
          } else {
            // 沒重複資料存在，加入新資料並且加入原有資料
            console.log("length===0");
            const mergeArray = copyStoredItem.concat(thisItem);
            localStorage.setItem("myCart", JSON.stringify(mergeArray));
          }
        } else {
          localStorage.setItem("myCart", JSON.stringify(state.items));
        }
      }
    },
    removeItemFromCart(state, action) {
      const thisItem = action.payload;
      const existingItem = state.items.find(
        (v) => v.id === thisItem.id && v.authId === thisItem.authId
      );
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          // (v) => v.id !== thisItem.id && v.authId !== thisItem.authId
          (v) => v !== existingItem
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem?.price;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("myCart", JSON.stringify(state.items));
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart.items;
export const cartActions = cartSlice.actions;
export default cartSlice;
