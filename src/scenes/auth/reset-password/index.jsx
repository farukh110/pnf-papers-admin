import { Button, Form, Input } from 'antd';
import './index.scss';

const ResetPassword = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="reset-page">

                <div className='row'>

                    <div className='col-md-6 reset-left-area'>

                    </div>

                    <div className='col-md-6 reset-right-area p-5'>

                        <div className='container'>

                            <div className='row'>

                                <div className='col-md-10 py-5 align-items-center'>

                                    <h2> Reset Password? </h2>

                                    <Form
                                        layout="vertical"
                                        className='reset-form mt-md-3'
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >

                                        <label> New Password </label>
                                        <Form.Item
                                            name="newPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'New Password is required',
                                                },
                                            ]}
                                        >
                                            <Input.Password placeholder='Please enter your new password' className='custom-input-password' />
                                        </Form.Item>

                                        <label> Confirm Password </label>
                                        <Form.Item
                                            name="confirmPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Confirm Password is required',
                                                },
                                            ]}
                                        >
                                            <Input.Password placeholder='Please enter your confirm password' className='custom-input-password' />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" className='btn-reset mt-md-3 w-100' htmlType="submit">
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

export default ResetPassword;