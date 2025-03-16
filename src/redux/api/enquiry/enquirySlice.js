import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_ENQUIRY, GET_ALL_ENQUIRIES, RESET_ALL } from "../../../app-constants";
import enquiryService from "./enquiryService";

const initialState = {

    enquiries: [],
    totalRecords: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

};

export const getAllEnquiries = createAsyncThunk(GET_ALL_ENQUIRIES, async (params, thunkAPI) => {

    try {

        const response = await enquiryService.getAllEnquiries(params);
        return response;

    } catch (error) {

        return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }

});

export const deleteEnquiry = createAsyncThunk(DELETE_ENQUIRY, async (enquiryId, thunkAPI) => {

    try {

        return await enquiryService.deleteEnquiry(enquiryId);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }

});

export const resetState = createAction(RESET_ALL);

export const enquirySlice = createSlice({

    name: 'enquiries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get all enquiries
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
            // delete enquiry
            .addCase(deleteEnquiry.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(deleteEnquiry.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            })
            .addCase(deleteEnquiry.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);

    }
});

export default enquirySlice.reducer;

