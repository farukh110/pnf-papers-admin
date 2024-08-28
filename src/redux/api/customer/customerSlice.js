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

export const getAllUsers = createAsyncThunk(GET_ALL_USERS, async (_, thunkAPI) => {

    try {

        const response = await customerService.getAllUsers();
        return response.data;

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data || error.message);

    }

});

// Customer slice
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
                state.message = action.payload;

            });
    },
});

export default customerSlice.reducer;