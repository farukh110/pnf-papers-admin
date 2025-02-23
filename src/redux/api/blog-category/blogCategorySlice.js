import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_BLOG_CATEGORY, DELETE_BLOG_CATEGORY, GET_ALL_BLOGS_CATEGORY, GET_ALL_BLOGS_CATEGORY_OPTION, GET_BLOG_CATEGORY, RESET_ALL, UPDATE_BLOG_CATEGORY } from "../../../app-constants";
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

export const getBlogCategory = createAsyncThunk(GET_BLOG_CATEGORY, async (blogCategoryId, thunkAPI) => {

    try {

        const response = await blogCategoryService.getBlogCategory(blogCategoryId);
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

export const updateBlogCategory = createAsyncThunk(UPDATE_BLOG_CATEGORY, async (brandData, thunkAPI) => {

    try {

        return await blogCategoryService.updateBlogCategory(brandData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const deleteBlogCategory = createAsyncThunk(DELETE_BLOG_CATEGORY, async (categoryId, thunkAPI) => {

    try {

        return await blogCategoryService.deleteBlogCategory(categoryId);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

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
            // get blog category
            .addCase(getBlogCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategoryName = action.payload.title;

            })
            .addCase(getBlogCategory.rejected, (state, action) => {

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
            // update category
            .addCase(updateBlogCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateBlogCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlogCategory = action.payload;
            })
            .addCase(updateBlogCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // delete category
            .addCase(deleteBlogCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(deleteBlogCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlogCategory = action.payload;
            })
            .addCase(deleteBlogCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});

export default blogCategorySlice.reducer;

