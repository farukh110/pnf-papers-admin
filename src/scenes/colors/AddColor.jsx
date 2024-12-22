import { Form, notification } from 'antd';
import { ColorPicker } from 'primereact/colorpicker';
import CustomButton from '../../components/global/custom-web-controls/custom-button';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createColor } from '../../redux/api/color/colorSlice';

const AddColor = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {

        try {

            dispatch(createColor(values));

            notification.success({
                message: 'Color Created',
                description: 'The color has been created successfully!',
                duration: 1,
            });

            setTimeout(() => {

                navigate('/admin/colors');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Creation Failed',
                description: 'An error occurred while creating the color. Please try again.',
                duration: 1,
            });
        }

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

                        <div className="col-md-2">
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

                        <div className="col-md-3 mt-md-4">
                            <Form.Item>
                                <CustomButton
                                    severity="help"
                                    type="submit"
                                    className="rounded p-2 ps-3 pe-3"
                                    label="Add Color"
                                />
                            </Form.Item>

                        </div>

                    </div>

                </Form>
            </div>

        </div>
    )
}

export default AddColor;