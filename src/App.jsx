import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './scenes/auth/login'
import ResetPassword from './scenes/auth/reset-password'
import ForgotPassword from './scenes/auth/forgot-password'
import MainLayout from './components/global/layout/MainLayout';
import Dashboard from './scenes/dashboard';
import './App.css'
import Enquiries from './scenes/Enquiries';
import Blogs from './scenes/blogs';

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
            <Route path='blogs' element={<Blogs />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
