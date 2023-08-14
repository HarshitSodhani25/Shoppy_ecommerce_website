import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductByFilter, fetchBrands, fetchCategories, fetchProductById, createProduct, updateProduct } from './productlistAPI';

const initialState = {
  products: [],
  status: 'idle',
  brands: [],
  categories: [],
  selectedProduct: null,
  totalItems: 0,
};

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({filter, sort, pagination}) =>{
    const response = await fetchProductByFilter(filter, sort, pagination);
    return response.data;
  }
)

export const createProductAsync = createAsyncThunk(
  'product/createProduct', 
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
)

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct', 
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
)


export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state)=> {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
      })
      .addCase(updateProductAsync.pending, (state, action)=>{
        state.status = 'loading'
      })
      .addCase(updateProductAsync.fulfilled, (state, action)=>{
        let index = state.products.findIndex(product=>product.id===action.payload.id)
        state.products[index] = action.payload;
      });

  },
});
export const {clearSelectedProduct} = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
