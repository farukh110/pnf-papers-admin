import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_LOGIN } from "../../../app-constants";
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

                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;

            })
    }

});

export default authSlice.reducer; 