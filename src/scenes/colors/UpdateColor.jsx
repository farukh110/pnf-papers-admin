import { Form, notification } from 'antd';
import { ColorPicker } from 'primereact/colorpicker';
import CustomButton from '../../components/global/custom-web-controls/custom-button';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, getColor, resetState, updateColor } from '../../redux/api/color/colorSlice';
import { useEffect } from 'react';

const UpdateColor = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const colorId = params.id;

    const { isSuccess, isError, isLoading, updatedColor, colorName } = useSelector(state => state.colors);

    useEffect(() => {

        if (colorId !== undefined) {

            dispatch(getColor(colorId));

        } else {

            // dispatch(resetState());
        }

    }, [colorId, dispatch]);

    useEffect(() => {
        if (colorName) {
            form.setFieldsValue({ title: colorName });
        }
    }, [colorName, form]);

    const onFinish = (values) => {

        try {

            if (!colorId) {
                console.error("Error: Color ID is undefined");
                return;
            }

            const colorData = { id: colorId, title: values.title };

            dispatch(updateColor(colorData));

            notification.success({
                message: 'Color Updated',
                description: 'The color has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/colors');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Updation Failed',
                description: 'An error occurred while updating the color. Please try again.',
                duration: 1,
            });
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='row'>

            <h4 className='mt-md-2'> Update Color </h4>

            <div className='col-md-12'>

                <Form
                    form={form}
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
                                    label="Update Color"
                                />
                            </Form.Item>

                        </div>

                    </div>

                </Form>
            </div>

        </div>
    )
}

export default UpdateColor;