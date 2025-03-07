import { Form, Input, notification } from "antd";
import { Calendar } from 'primereact/calendar';
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCoupon, resetState } from "../../redux/api/coupon/couponSlice";

const AddCoupon = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {

        try {

            console.log('form submit: ', values);

            dispatch(createCoupon(values));

            notification.success({
                message: 'Coupon Created',
                description: 'The Coupon has been created successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/coupons');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Creation Failed',
                description: 'An error occurred while creating the Coupon. Please try again.',
                duration: 1,
            });
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='row'>

                <h4 className='mt-md-2'> Add Coupon </h4>

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
                                    Coupon Title
                                </label>

                                <Form.Item
                                    name="name"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Coupon name',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        placeholder="Please enter title"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-2">
                                <label>
                                    Expiry Date
                                </label>

                                <Form.Item
                                    name="expiry"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Expiry date',
                                        },
                                    ]}
                                >
                                    <Calendar
                                        inputClassName="form-control"
                                        placeholder="Please select date"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3">
                                <label>
                                    Discount
                                </label>

                                <Form.Item
                                    name="discount"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Discount between 0 to 99',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter enter discount %"
                                        maxLength={3}
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-4">
                                <Form.Item>

                                    <CustomButton
                                        severity="help"
                                        type="submit"
                                        className="rounded p-2 ps-3 pe-3"
                                        label="Add Coupon"
                                    />
                                </Form.Item>

                            </div>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default AddCoupon;