import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS } from "../../../app-constants";
import productService from './productService';

const initialState = {
    products: [],
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

// product slice

export const productSlice = createSlice({

    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
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
            });
    }
});

export default productSlice.reducer; 
