import { Button, Form, Input } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="login-page">

                <div className='row'>

                    <div className='col-md-6 login-left-area'>

                    </div>

                    <div className='col-md-6 login-right-area p-5'>

                        <div className='container'>

                            <div className='row'>

                                <div className='col-md-10 py-5 align-items-center'>

                                    <h2> Login with your Account </h2>

                                    <Form
                                        layout="vertical"
                                        className='login-form mt-md-3'
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <label> Email </label>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your email address',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <label> Password </label>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your password',
                                                },
                                            ]}
                                        >
                                            <Input.Password className='custom-input-password' />
                                        </Form.Item>

                                        <Link className='text-decoration-none' to='/forgot-password'> Forgot Password ? </Link>

                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                className='btn-login mt-md-3 w-100'
                                                onClick={() => navigate('/admin')}
                                                htmlType="submit">
                                                Login
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Login;