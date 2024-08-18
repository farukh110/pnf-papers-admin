import { Button, ColorPicker, Form } from 'antd';
import './index.scss';

const AddColor = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='row'>

            <h4 className='mt-md-2'> Add Color </h4>

            <div className='col-md-12'>

                <Form
                    className="mt-md-3"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <div className="row">

                        <div className="col-md-3">
                            <label>
                                Color
                            </label>

                            <Form.Item
                                name="title"
                                className="mt-md-1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Color',
                                    },
                                ]}
                            >
                                <ColorPicker />
                            </Form.Item>
                        </div>

                        <div className="col-md-3">
                            <Form.Item>
                                <Button className="mt-md-4" type="primary" htmlType="submit">
                                    Add Color
                                </Button>
                            </Form.Item>

                        </div>

                    </div>

                </Form>
            </div>

        </div>
    )
}

export default AddColor;