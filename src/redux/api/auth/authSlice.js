import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_LOGIN, GET_ALL_USER_ORDERS } from "../../../app-constants";
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

export const getAllOrders = createAsyncThunk(GET_ALL_USER_ORDERS, async (thunkAPI) => {

    try {

        const response = await authService.getAllOrders();
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
            .addCase(getAllOrders.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllOrders.fulfilled, (state, action) => {

                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            })
            .addCase(getAllOrders.rejected, (state, action) => {

                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;

            })
    }

});

export default authSlice.reducer; 