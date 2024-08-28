import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice"; // Import the default export (the reducer)
import customerReducer from "../api/customer/customerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer
    }
});
