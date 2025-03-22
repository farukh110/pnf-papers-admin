import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './scenes/auth/login'
import ResetPassword from './scenes/auth/reset-password'
import ForgotPassword from './scenes/auth/forgot-password'
import MainLayout from './components/global/layout/MainLayout';
import Dashboard from './scenes/dashboard';
import './App.css'
import Enquiries from './scenes/Enquiries';
import Blogs from './scenes/blogs';
import BlogsCategories from './scenes/blogs-categories';
import Orders from './scenes/orders';
import Customers from './scenes/customers';
import Colors from './scenes/colors';
import ProductsCategories from './scenes/products-categories';
import Brands from './scenes/brands';
import Products from './scenes/products';
import AddBlog from './scenes/blogs/AddBlog';
import AddBlogCategory from './scenes/blogs-categories/AddBlogCategory';
import AddColor from './scenes/colors/AddColor';
import AddProductCategory from './scenes/products-categories/AddProductCategory';
import AddBrand from './scenes/brands/AddBrand';
import Coupons from './scenes/coupons';
import AddCoupon from './scenes/coupons/AddCoupon';
import AddProduct from './scenes/products/AddProduct';
import UpdateBrand from './scenes/brands/UpdateBrand';
import UpdateColor from './scenes/colors/UpdateColor';
import UpdateBlogCategory from './scenes/blogs-categories/UpdateBlogCategory';
import UpdateCoupon from './scenes/coupons/UpdateCoupon';
import UpdateProductCategory from './scenes/products-categories/UpdateProductCategory';
import UpdateBlog from './scenes/blogs/UpdateBlog';
import ViewEnquiry from './scenes/Enquiries/ViewEnquiry';
import ViewOrder from './scenes/orders/ViewOrder';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/admin' element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='enquiries' element={<Enquiries />} />
            <Route path='enquiry/:id' element={<ViewEnquiry />} />
            <Route path='add-blog' element={<AddBlog />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='blog/:id' element={<UpdateBlog />} />
            <Route path='blogs-categories' element={<BlogsCategories />} />
            <Route path='add-blog-category' element={<AddBlogCategory />} />
            <Route path='blog-category/:id' element={<UpdateBlogCategory />} />
            <Route path='orders' element={<Orders />} />
            <Route path='order/:id' element={<ViewOrder />} />
            <Route path='customers' element={<Customers />} />
            <Route path='colors' element={<Colors />} />
            <Route path='add-color' element={<AddColor />} />
            <Route path='color/:id' element={<UpdateColor />} />
            <Route path='categories' element={<ProductsCategories />} />
            <Route path='add-category' element={<AddProductCategory />} />
            <Route path='category/:id' element={<UpdateProductCategory />} />
            <Route path='brands' element={<Brands />} />
            <Route path='add-brand' element={<AddBrand />} />
            <Route path='brand/:id' element={<UpdateBrand />} />
            <Route path='products' element={<Products />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='coupons' element={<Coupons />} />
            <Route path='add-coupon' element={<AddCoupon />} />
            <Route path='coupon/:id' element={<UpdateCoupon />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
