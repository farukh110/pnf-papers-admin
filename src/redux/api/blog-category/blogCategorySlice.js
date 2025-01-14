import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_BLOG_CATEGORY, GET_ALL_BLOGS_CATEGORY, GET_ALL_BLOGS_CATEGORY_OPTION } from "../../../app-constants";
import blogCategoryService from "./blogCategoryService";

const initialState = {

    blogCategory: [],
    createBlogCategory: "",
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllBlogCategories = createAsyncThunk(GET_ALL_BLOGS_CATEGORY, async (params, thunkAPI) => {

    try {

        const response = await blogCategoryService.getAllBlogCategories(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getAllBlogCategoryOption = createAsyncThunk(GET_ALL_BLOGS_CATEGORY_OPTION, async (thunkAPI) => {

    try {

        const response = await blogCategoryService.getAllBlogCategoryOption();
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const createBlogCategory = createAsyncThunk(CREATE_BLOG_CATEGORY, async (blogCategoryData, thunkAPI) => {

    try {

        return await blogCategoryService.createBlogCategory(blogCategoryData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }
});

export const blogCategorySlice = createSlice({

    name: 'blogCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // get all blog categories
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
            // get all blog category option
            .addCase(getAllBlogCategoryOption.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllBlogCategoryOption.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategory = action.payload;
            })
            .addCase(getAllBlogCategoryOption.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // create category
            .addCase(createBlogCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createBlogCategory = action.payload;

            })
            .addCase(createBlogCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
});

export default blogCategorySlice.reducer;

