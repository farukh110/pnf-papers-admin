import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_USERS } from "../../../app-constants";
import customerService from "./customerService";

const initialState = {
    customers: [],
    totalRecords: 0, // Add this to store the total records count
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const getAllUsers = createAsyncThunk(GET_ALL_USERS, async (params, thunkAPI) => {
    try {
        const response = await customerService.getAllUsers(params);
        return response; // Return the whole response object
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const customerSlice = createSlice({
    name: "customers", // Adjusted to match state structure
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
                state.customers = action.payload.data; // Set customers
                state.totalRecords = action.payload.totalRecords; // Set totalRecords
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export default customerSlice.reducer;
