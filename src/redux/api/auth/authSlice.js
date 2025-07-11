import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_LOGIN, GET_ALL_USER_ORDERS, GET_MONTHLY_ORDERS, GET_ORDER, GET_ORDER_BY_USER_ID, GET_YEARLY_STATS, UPDATE_ORDER } from "../../../app-constants";
import authService from "./authService";

// const userDefaultState = {
//     _id: null,
//     firstname: null,
//     lastname: null,
//     email: null,
//     mobile: null,
//     token: null
// };

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {

    user: getUserFromLocalStorage,
    orders: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const login = createAsyncThunk(ADMIN_LOGIN, async (user, thunkAPI) => {

    try {

        return await authService.login(user);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const getAllOrders = createAsyncThunk(GET_ALL_USER_ORDERS, async (params, thunkAPI) => {

    try {

        const response = await authService.getAllOrders(params);

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getOrderByUser = createAsyncThunk(GET_ORDER_BY_USER_ID, async (id, thunkAPI) => {

    try {

        const response = await authService.getOrderByUser(id);

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getMonthlyOrders = createAsyncThunk(GET_MONTHLY_ORDERS, async (thunkAPI) => {

    try {

        const response = await authService.getMonthlyOrders();

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getYearlyStats = createAsyncThunk(GET_YEARLY_STATS, async (thunkAPI) => {

    try {

        const response = await authService.getYearlyStats();

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const getOrder = createAsyncThunk(GET_ORDER, async (id, thunkAPI) => {

    try {

        const response = await authService.getOrder(id);

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const updateOrder = createAsyncThunk(UPDATE_ORDER, async (id, thunkAPI) => {

    try {

        const response = await authService.updateOrder(id);

        // console.log('response authSlice: ', response);

        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // login
            .addCase(login.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(login.fulfilled, (state, action) => {

                state.isError = true;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
            })
            .addCase(login.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.user = null;

            })
            // get all orders
            .addCase(getAllOrders.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllOrders.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(getAllOrders.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // get order by user
            .addCase(getOrderByUser.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orderByUser = action.payload;
                // state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(getOrderByUser.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // get monthly orders
            .addCase(getMonthlyOrders.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getMonthlyOrders.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                // state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(getMonthlyOrders.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // get yearly stats
            .addCase(getYearlyStats.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getYearlyStats.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                // state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(getYearlyStats.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // get order
            .addCase(getOrder.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getOrder.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
                // state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(getOrder.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // update order
            .addCase(updateOrder.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(updateOrder.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateOrder = action.payload;
                // state.totalRecords = action.payload.totalRecords;
                state.message = "success";
            })
            .addCase(updateOrder.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    }

});

export default authSlice.reducer; 