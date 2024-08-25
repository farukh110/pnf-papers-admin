import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice"; // Import the default export (the reducer)

export const store = configureStore({
    reducer: {
        auth: authReducer // Use the correct reducer
    }
});
