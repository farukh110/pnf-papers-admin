import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_BLOGS } from "../../../app-constants";
import blogCategoryService from "./blogCategoryService";

const initialState = {

    blogCategory: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllBlogCategories = createAsyncThunk(GET_ALL_BLOGS, async (params, thunkAPI) => {

    try {

        const response = await blogCategoryService.getAllBlogCategories(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const blogCategorySlice = createSlice({

    name: 'blogCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllBlogCategories.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllBlogCategories.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategory = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllBlogCategories.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })

    }
});

export default blogCategorySlice.reducer;

