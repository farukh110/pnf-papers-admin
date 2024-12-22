import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_PRODUCT_CATEGORY, GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_CATEGORY_OPTION } from "../../../app-constants";
import categoriesService from "./categoriesService";

const initialState = {

    categories: [],
    createdCategory: "",
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

export const createCategory = createAsyncThunk(CREATE_PRODUCT_CATEGORY, async (categoryData, thunkAPI) => {

    try {

        return await categoriesService.createCategory(categoryData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
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
            // create product category
            .addCase(createCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload;

            })
            .addCase(createCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }

});

export default categoriesSlice.reducer;