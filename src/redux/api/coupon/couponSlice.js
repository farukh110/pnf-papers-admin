import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_COUPON, DELETE_COUPON, GET_ALL_COUPONS, GET_COUPON, RESET_ALL, UPDATE_COUPON } from "../../../app-constants";
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

export const getCoupon = createAsyncThunk(GET_COUPON, async (couponId, thunkAPI) => {

    try {

        const response = await couponService.getCoupon(couponId);
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

export const updateCoupon = createAsyncThunk(UPDATE_COUPON, async (couponData, thunkAPI) => {

    try {

        return await couponService.updateCoupon(couponData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const deleteCoupon = createAsyncThunk(DELETE_COUPON, async (couponId, thunkAPI) => {

    try {

        return await couponService.deleteCoupon(couponId);

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

        // get all coupons
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
            // get coupon
            .addCase(getCoupon.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getCoupon.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.couponDetails = action.payload;

            })
            .addCase(getCoupon.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })
            // create coupon
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
            // update coupon
            .addCase(updateCoupon.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateCoupon.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
            })
            .addCase(updateCoupon.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // delete coupon
            .addCase(deleteCoupon.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteCoupon = action.payload;
            })
            .addCase(deleteCoupon.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);

    }
});

export default couponSlice.reducer;

