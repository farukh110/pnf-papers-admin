import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_BLOGS } from "../../../app-constants";
import enquiryService from "./enquiryService";

const initialState = {

    enquiries: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllEnquiries = createAsyncThunk(GET_ALL_BLOGS, async (params, thunkAPI) => {

    try {

        const response = await enquiryService.getAllEnquiries(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const enquirySlice = createSlice({

    name: 'enquiries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllEnquiries.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(getAllEnquiries.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload.data;
                state.totalRecords = action.payload.totalRecords;

            })
            .addCase(getAllEnquiries.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;

            })

    }
});

export default enquirySlice.reducer;

