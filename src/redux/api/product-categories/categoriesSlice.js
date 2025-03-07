import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_CATEGORY_OPTION, GET_PRODUCTS_CATEGORY, RESET_ALL, UPDATE_PRODUCT_CATEGORY } from "../../../app-constants";
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

export const getCategory = createAsyncThunk(GET_PRODUCTS_CATEGORY, async (categoryId, thunkAPI) => {

    try {

        const response = await categoriesService.getCategory(categoryId);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
});

export const createCategory = createAsyncThunk(CREATE_PRODUCT_CATEGORY, async (categoryData, thunkAPI) => {

    try {

        return await categoriesService.createCategory(categoryData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCategory = createAsyncThunk(UPDATE_PRODUCT_CATEGORY, async (categoryData, thunkAPI) => {

    try {

        return await categoriesService.updateCategory(categoryData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const deleteCategory = createAsyncThunk(DELETE_PRODUCT_CATEGORY, async (categoryId, thunkAPI) => {

    try {

        return await categoriesService.deleteCategory(categoryId);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});


export const resetState = createAction(RESET_ALL);

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
            // get category
            .addCase(getCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;

            })
            .addCase(getCategory.rejected, (state, action) => {

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
            // update category
            .addCase(updateCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProductCategory = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // delete category
            .addCase(deleteCategory.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(deleteCategory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProductCategory = action.payload;
            })
            .addCase(deleteCategory.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }

});

export default categoriesSlice.reducer;