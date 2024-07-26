import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface CartItem {
  id: string;
  pID: string;
  quantity: number;
  size: string;
  date: string;
}
interface OrderItem {
  addressId?: string;
  totalPrice?: number;
  discountedPrice?: number;
}

interface CartState {
  cartItems: CartItem[];
  orderData: OrderItem | null;
}

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string) => {
    const cartCollection = collection(db, "cart");
    const cartQuery = query(cartCollection, where("uID", "==", userId));
    const cartSnapshot = await getDocs(cartQuery);
    const cartList = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CartItem[];
    return cartList;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    userId,
    quantity,
    size,
  }: {
    productId: string;
    userId: string;
    quantity: number;
    size: string;
  }) => {
    const docRef = await addDoc(collection(db, "cart"), {
      pID: productId,
      uID: userId,
      quantity: quantity,
      size: size,
      date: new Date().toISOString(),
    });
    return {
      id: docRef.id,
      pID: productId,
      quantity: quantity,
      size: size,
      date: new Date().toISOString(),
    };
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string) => {
    await deleteDoc(doc(db, "cart", id));
    return id;
  }
);

const initialState: CartState = {
  cartItems: [],
  orderData: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderItem>) => {
      if (state.orderData) {
        state.orderData = {
          ...state.orderData,
          ...action.payload,
        };
      } else {
        state.orderData = action.payload as OrderItem;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCartItems.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.cartItems = action.payload;
      }
    );
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        state.cartItems.push(action.payload);
      }
    );
    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        );
      }
    );
  },
});

export const { setOrderData } = cartSlice.actions;
export default cartSlice.reducer;
