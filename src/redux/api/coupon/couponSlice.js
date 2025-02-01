import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_COUPON, GET_ALL_COUPONS, RESET_ALL } from "../../../app-constants";
import couponService from "./couponService";

const initialState = {

    coupons: [],
    createdCoupon: "",
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllCoupons = createAsyncThunk(GET_ALL_COUPONS, async (params, thunkAPI) => {

    try {

        const response = await couponService.getAllCoupons(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const createCoupon = createAsyncThunk(CREATE_COUPON, async (couponData, thunkAPI) => {

    try {

        return await couponService.createCoupon(couponData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

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
            .addCase(createCoupon.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(createCoupon.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);

    }
});

export default couponSlice.reducer;

