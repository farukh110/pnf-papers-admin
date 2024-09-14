import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_BRANDS } from "../../../app-constants";
import brandService from "./brandService";

const initialState = {

    brands: [],
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

export const brandSlice = createSlice({

    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
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

    }
});

export default brandSlice.reducer;

