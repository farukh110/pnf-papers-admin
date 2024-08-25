import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../api/auth/authSlice";


export const store = configureStore({

    reducer: {
        auth: authSlice
    }

});