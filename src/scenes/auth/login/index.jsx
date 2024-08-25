import { Button, Input } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup

const Login = () => {

    const navigate = useNavigate();

    // Define the Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Please enter your email address'),
        password: Yup.string()
            .required('Please enter your password'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => {

            console.log('submission data: ', values);

        },
    });

    return (
        <div className="login-page">
            <div className='row'>
                <div className='col-md-6 login-left-area'></div>
                <div className='col-md-6 login-right-area p-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 py-5 align-items-center'>
                                <h2>Login with your Account</h2>
                                <form
                                    className='login-form mt-md-3'
                                    onSubmit={formik.handleSubmit}
                                    autoComplete="off"
                                >
                                    <label>Email</label>
                                    <div className="form-item">
                                        <Input
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            status={formik.errors.email && formik.touched.email ? 'error' : ''}
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                            <div className="error-message">{formik.errors.email}</div>
                                        )}
                                    </div>

                                    <label>Password</label>
                                    <div className="form-item">
                                        <Input.Password
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            status={formik.errors.password && formik.touched.password ? 'error' : ''}
                                            className='custom-input-password'
                                        />
                                        {formik.errors.password && formik.touched.password && (
                                            <div className="error-message">{formik.errors.password}</div>
                                        )}
                                    </div>

                                    <Link className='text-decoration-none' to='/forgot-password'>Forgot Password?</Link>

                                    <div className="form-item">
                                        <Button
                                            type="primary"
                                            className='btn-login mt-md-3 w-100'
                                            htmlType="submit"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
