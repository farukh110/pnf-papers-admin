import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_COLORS } from "../../../app-constants";
import colorService from "./colorService";

const initialState = {

    colors: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllColors = createAsyncThunk(GET_ALL_COLORS, async (params, thunkAPI) => {

    try {

        const response = await colorService.getAllColors(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const colorSlice = createSlice({

    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllColors.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllColors.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllColors.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })

    }
});

export default colorSlice.reducer;

