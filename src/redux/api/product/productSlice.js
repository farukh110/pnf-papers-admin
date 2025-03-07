import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, RESET_ALL } from "../../../app-constants";
import productService from './productService';

const initialState = {
    products: [],
    createProduct: "",
    totalRecords: 0, // Add this to store the total records count
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// get all products

export const getAllProducts = createAsyncThunk(GET_ALL_PRODUCTS, async (params, thunkAPI) => {

    try {

        const response = await productService.getAllProducts(params);
        return response;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }

});

// create product

export const createProduct = createAsyncThunk(CREATE_PRODUCT, async (productData, thunkAPI) => {

    try {

        return await productService.createProduct(productData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

// product slice

export const productSlice = createSlice({

    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // get all products
            .addCase(getAllProducts.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllProducts.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(getAllProducts.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // create product
            .addCase(createProduct.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createProduct.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(resetState, () => initialState);

    }
});

export default productSlice.reducer; 
