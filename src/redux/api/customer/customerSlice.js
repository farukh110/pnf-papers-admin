import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_USERS } from "../../../app-constants";
import customerService from "./customerService";

const initialState = {

    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

}

export const getAllUsers = createAsyncThunk(GET_ALL_USERS, async (thunkAPI) => {

    try {

        return customerService.getAllUsers();

    } catch (error) {

        thunkAPI.rejectWithValue(error);
    }

});

export const customerSlice = createSlice({

    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllUsers.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.customers = action.payload;

            })
            .addCase(getAllUsers.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
    }

});

export default customerSlice.reducer; 