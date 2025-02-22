import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_BRAND, GET_ALL_BRANDS, GET_ALL_BRANDS_OPTION, GET_BRAND, RESET_ALL, UPDATE_BRAND } from "../../../app-constants";
import brandService from "./brandService";

const initialState = {

    brands: [],
    createdBrand: "",
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllBrands = createAsyncThunk(GET_ALL_BRANDS, async (params, thunkAPI) => {

    try {

        const response = await brandService.getAllBrands(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getAllBrandsOption = createAsyncThunk(GET_ALL_BRANDS_OPTION, async (thunkAPI) => {

    try {

        const response = await brandService.getAllBrandsOption();
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getBrand = createAsyncThunk(GET_BRAND, async (brandId, thunkAPI) => {

    try {

        const response = await brandService.getBrand(brandId);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
});

export const createBrand = createAsyncThunk(CREATE_BRAND, async (brandData, thunkAPI) => {

    try {

        return await brandService.createBrand(brandData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const updateBrand = createAsyncThunk(UPDATE_BRAND, async (brand, thunkAPI) => {

    try {

        return await brandService.updateBrand(brand);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

export const brandSlice = createSlice({

    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // get all brands
            .addCase(getAllBrands.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllBrands.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllBrands.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // get all brands option
            .addCase(getAllBrandsOption.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllBrandsOption.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;

            })
            .addCase(getAllBrandsOption.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // get brand
            .addCase(getBrand.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getBrand.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandName = action.payload.title;

            })
            .addCase(getBrand.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // create brand
            .addCase(createBrand.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createBrand.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // update brand
            .addCase(updateBrand.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateBrand.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
            })
            .addCase(updateBrand.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);

    }
});

export default brandSlice.reducer;

