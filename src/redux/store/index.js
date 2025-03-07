import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice"; // Import the default export (the reducer)
import customerReducer from "../api/customer/customerSlice";
import productReducer from "../api/product/productSlice";
import brandReducer from "../api/brand/brandSlice";
import productsCategoryReducer from "../api/product-categories/categoriesSlice";
import colorReducer from "../api/color/colorSlice";
import couponReducer from "../api/coupon/couponSlice";
import blogReducer from "../api/blog/blogSlice";
import blogCategoryReducer from "../api/blog-category/blogCategorySlice";
import enquiryReducer from "../api/enquiry/enquirySlice";
import UploadReducer from "../api/upload/uploadSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer,
        products: productReducer,
        brands: brandReducer,
        productsCategory: productsCategoryReducer,
        colors: colorReducer,
        coupons: couponReducer,
        blogs: blogReducer,
        blogCategory: blogCategoryReducer,
        enquiries: enquiryReducer,
        upload: UploadReducer
    }
});
