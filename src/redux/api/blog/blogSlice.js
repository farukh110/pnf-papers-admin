import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_BLOG, GET_ALL_BLOGS } from "../../../app-constants";
import blogService from "./blogService";

const initialState = {

    blogs: [],
    createdBlog: "",
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllBlogs = createAsyncThunk(GET_ALL_BLOGS, async (params, thunkAPI) => {

    try {

        const response = await blogService.getAllBlogs(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const createBlog = createAsyncThunk(CREATE_BLOG, async (blogData, thunkAPI) => {

    try {

        return await blogService.createBlog(blogData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const blogSlice = createSlice({

    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // get all blogs
            .addCase(getAllBlogs.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllBlogs.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // create blog
            .addCase(createBlog.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createBlog.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })

    }
});

export default blogSlice.reducer;

