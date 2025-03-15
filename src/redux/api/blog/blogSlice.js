import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_BLOG, DELETE_BLOG, GET_ALL_BLOGS, GET_BLOG, RESET_ALL, UPDATE_BLOG } from "../../../app-constants";
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

export const getBlog = createAsyncThunk(GET_BLOG, async (blogId, thunkAPI) => {

    try {

        const response = await blogService.getBlog(blogId);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
});

export const updateBlog = createAsyncThunk(UPDATE_BLOG, async (blogData, thunkAPI) => {

    try {

        return await blogService.updateBlog(blogData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const deleteBlog = createAsyncThunk(DELETE_BLOG, async (blogId, thunkAPI) => {

    try {

        return await blogService.deleteBlog(blogId);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

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
            // get blog
            .addCase(getBlog.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getBlog.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getBlog = action.payload;
            })
            .addCase(getBlog.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // update blog
            .addCase(updateBlog.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateBlog.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // delete blog
            .addCase(deleteBlog.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(deleteBlog.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteBlog.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(resetState, () => initialState);

    }
});

export default blogSlice.reducer;

