import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_COLORS } from "../../../app-constants";
import couponService from "./couponService";

const initialState = {

    coupons: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllCoupons = createAsyncThunk(GET_ALL_COLORS, async (params, thunkAPI) => {

    try {

        const response = await couponService.getAllCoupons(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const couponSlice = createSlice({

    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllCoupons.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllCoupons.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllCoupons.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })

    }
});

export default couponSlice.reducer;

