import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_LOGIN, GET_ALL_USER_ORDERS, GET_ORDER_BY_USER_ID } from "../../../app-constants";
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
    }

});

export default authSlice.reducer; 