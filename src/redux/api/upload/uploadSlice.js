import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_IMAGE, UPLOAD_IMAGES } from "../../../app-constants";
import uploadService from "./uploadService";

const initialState = {

    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const uploadImages = createAsyncThunk(UPLOAD_IMAGES, async (data, thunkAPI) => {
    try {

        const formData = new FormData();

        for (let i = 0; i < data.length; i++) {

            formData.append("images", data[i]);
        }

        return await uploadService.uploadImage(formData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);

    }
});

export const deleteImage = createAsyncThunk(DELETE_IMAGE, async (id, thunkAPI) => {

    try {

        return await uploadService.deleteImage(id);

    } catch (error) {

        return thunkAPI.rejectWithValue(error);

    }

});

export const uploadSlice = createSlice({
    name: "uploadImages",
    initialState,
    reducers: {
        setUploadedImages: (state, action) => {
            state.images = action.payload;
        },
        resetImages: (state) => {
            state.images = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {


        builder
            // upload images
            .addCase(uploadImages.pending, (state) => {

                state.isLoading = true;

            })
            .addCase(uploadImages.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = [...state.images, ...action.payload];
            })
            .addCase(uploadImages.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // delete image
            .addCase(deleteImage.pending, (state) => {

                state.isLoading = true;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;

                console.log('state.images: ', state.images);

                state.images = state.images.filter(image => image.public_id !== action.meta.arg);
            })
            .addCase(deleteImage.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    }
});

export const { setUploadedImages, resetImages } = uploadSlice.actions;
export default uploadSlice.reducer;