import { Form, notification } from "antd";
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createBrand, getBrand, resetState, updateBrand } from "../../redux/api/brand/brandSlice";
import { useEffect } from "react";

const UpdateBrand = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const brandId = params.id;

    const { isSuccess, isError, isLoading, brandName } = useSelector(state => state.brands);

    console.log('brandId: ', brandId);

    useEffect(() => {

        if (brandId !== undefined) {

            dispatch(getBrand(brandId));

        } else {

            // dispatch(resetState());
        }

    }, [brandId, dispatch]);

    useEffect(() => {
        if (brandName) {
            form.setFieldsValue({ title: brandName });
        }
    }, [brandName, form]);

    const onFinish = (values) => {

        try {

            if (!brandId) {
                console.error("Error: Brand ID is undefined");
                return;
            }

            const brandData = { id: brandId, title: values.title };

            dispatch(updateBrand(brandData));

            notification.success({
                message: 'Brand Updated',
                description: 'The brand has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/brands');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Updation Failed',
                description: 'An error occurred while updating the brand. Please try again.',
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

                <h4 className='mt-md-2'> Update Brand </h4>

                <div className='col-md-12'>

                    <Form
                        form={form}
                        className="mt-md-3"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={{
                            title: "",
                        }}
                    >
                        <div className="row">

                            <div className="col-md-3">
                                <label>
                                    Brand Title
                                </label>

                                <Form.Item
                                    name="title"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter brand title',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        placeholder="Please enter title"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-4">
                                <Form.Item>
                                    <CustomButton
                                        severity="help"
                                        type="submit"
                                        className="rounded p-2 ps-3 pe-3"
                                        label="Update Brand"
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

export default UpdateBrand;