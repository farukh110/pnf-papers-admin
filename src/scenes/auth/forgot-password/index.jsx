import { Button, Form, Input } from 'antd';
import './index.scss';

const ForgotPassword = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="forgot-password-page">

                <div className='row'>

                    <div className='col-md-6 forgot-left-area'>

                    </div>

                    <div className='col-md-6 forgot-right-area p-5'>

                        <div className='container'>

                            <div className='row'>

                                <div className='col-md-10 py-5 align-items-center'>

                                    <h2> Forgot Password </h2>

                                    <Form
                                        layout="vertical"
                                        className='forgot-form mt-md-3'
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <label> Registered Email </label>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Registered email address is required',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Please enter your registered email to get reset password mail"
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" className='btn-forgot mt-md-2 w-100' htmlType="submit">
                                                Continue
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

export default ForgotPassword;

