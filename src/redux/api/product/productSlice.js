import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS } from "../../../app-constants";

const initialState = {
    products: [],
    totalRecords: 0, // Add this to store the total records count
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const getAllProducts = createAsyncThunk(GET_ALL_PRODUCTS, async (params, thunkAPI) => {

});

