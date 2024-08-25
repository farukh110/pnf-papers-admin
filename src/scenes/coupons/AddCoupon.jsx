import { Form, Input } from "antd";
import { Calendar } from 'primereact/calendar';
import './index.scss';
import { InputText } from "primereact/inputtext";
import CustomButton from "../../components/global/custom-web-controls/custom-button";

const AddCoupon = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const handleKeyPress = (e) => {
    //     const charCode = e.which ? e.which : e.keyCode;
    //     // Allow only numeric characters (0-9)
    //     if (charCode < 48 || charCode > 57) {
    //         e.preventDefault();
    //     }
    // };

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
                                            message: 'Please enter Coupon title',
                                        },
                                    ]}
                                >
                                    <InputText
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
                                    name="expiry_date"
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
                                    <InputText
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