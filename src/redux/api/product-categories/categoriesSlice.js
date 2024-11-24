import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_CATEGORY_OPTION } from "../../../app-constants";
import categoriesService from "./categoriesService";

const initialState = {

    categories: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllProductsCategory = createAsyncThunk(GET_ALL_PRODUCTS_CATEGORY, async (params, thunkAPI) => {

    try {

        const response = categoriesService.getAllProductsCategory(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }

});

export const getAllCategoryOption = createAsyncThunk(GET_ALL_PRODUCTS_CATEGORY_OPTION, async (thunkAPI) => {

    try {

        const response = categoriesService.getAllCategoryOption();
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }

});

export const categoriesSlice = createSlice({

    name: "productsCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // get all products category
            .addCase(getAllProductsCategory.pending, (state) => {

                state.isLoading = true;
            })
            .addCase(getAllProductsCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(getAllProductsCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // get all products category option
            .addCase(getAllCategoryOption.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllCategoryOption.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;

            })
            .addCase(getAllCategoryOption.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
    }

});

export default categoriesSlice.reducer;