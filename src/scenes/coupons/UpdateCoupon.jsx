import { Form, Input, notification } from "antd";
import { Calendar } from 'primereact/calendar';
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCoupon, getCoupon, resetState, updateCoupon } from "../../redux/api/coupon/couponSlice";
import { useEffect } from "react";

const UpdateCoupon = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const couponId = params.id;

    const { isSuccess, isError, isLoading, couponDetails } = useSelector(state => state.coupons);

    console.log('couponDetails: ', couponDetails);

    useEffect(() => {

        if (couponId !== undefined) {

            dispatch(getCoupon(couponId));

        } else {

            // dispatch(resetState());
        }

    }, [couponId, dispatch]);

    useEffect(() => {
        if (couponDetails) {
            form.setFieldsValue({
                name: couponDetails.name,
                expiry: couponDetails.expiry ? new Date(couponDetails.expiry) : null,
                discount: couponDetails.discount
            });
        }
    }, [couponDetails, form]);


    const onFinish = (values) => {

        try {

            if (!couponId) {
                console.error("Error: coupon ID is undefined");
                return;
            }

            const couponData = { id: couponId, name: values.name, expiry: values.expiry, discount: values.discount };

            dispatch(updateCoupon(couponData));

            notification.success({
                message: 'Coupon Updated',
                description: 'The coupon has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/coupons');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Updation Failed',
                description: 'An error occurred while updating the coupon. Please try again.',
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

                <h4 className='mt-md-2'> Update Coupon </h4>

                <div className='col-md-12'>

                    <Form
                        form={form}
                        className="mt-md-3"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={{
                            name: "",
                            expiry: null,
                            discount: null
                        }}
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
                                        label="Update Coupon"
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

export default UpdateCoupon;