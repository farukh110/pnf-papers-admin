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
            <Route path='add-blog' element={<AddBlog />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='add-blog-category' element={<AddBlogCategory />} />
            <Route path='blogs-categories' element={<BlogsCategories />} />
            <Route path='orders' element={<Orders />} />
            <Route path='customers' element={<Customers />} />
            <Route path='add-color' element={<AddColor />} />
            <Route path='colors' element={<Colors />} />
            <Route path='categories' element={<ProductsCategories />} />
            <Route path='brands' element={<Brands />} />
            <Route path='products' element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
