import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IECommerce } from "../types/generalTypes";

// const initialState: IECommerce = {
//   id: 0,
//   title: "",
//   price: 0,
//   description: "",
//   category: "",
//   image: "",
//   rating: {
//     rate: 0,
//     count: 0,
//   },
// };

const initialState: {
  products: IECommerce[];
  status: "idle" | "loading" | "failed";
} = {
  products: [],
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  }
);

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
