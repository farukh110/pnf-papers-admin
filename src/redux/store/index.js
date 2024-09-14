import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice"; // Import the default export (the reducer)
import customerReducer from "../api/customer/customerSlice";
import productReducer from "../api/product/productSlice";
import brandReducer from "../api/brand/brandSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer,
        products: productReducer,
        brands: brandReducer
    }
});
