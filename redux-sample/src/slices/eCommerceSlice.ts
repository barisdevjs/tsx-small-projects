import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IECommerce } from "../types/generalTypes";

const initialState: {
  products: IECommerce[];
  status: "idle" | "loading" | "failed";
  singleProduct: IECommerce;
} = {
  products: [],
  status: "idle",
  singleProduct: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
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

    builder
      .addCase(fetchProductsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state) => {
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

export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async (id: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    // artifical delay for loading state
    await new Promise((resolve) => setTimeout(resolve, 300));
    const data = await response.json();
    return data;
  }
);

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
