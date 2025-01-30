import { Form, notification } from "antd";
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory, resetState } from "../../redux/api/product-categories/categoriesSlice";

const AddProductCategory = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {

        try {

            dispatch(createCategory(values));

            notification.success({
                message: 'Product Category Created',
                description: 'The product category has been created successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/categories');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Creation Failed',
                description: 'An error occurred while creating the product category. Please try again.',
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

                <h4 className='mt-md-2'> Add Product Category </h4>

                <div className='col-md-12'>

                    <Form
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
                                    Product Category Title
                                </label>

                                <Form.Item
                                    name="title"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Product category title',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        placeholder="Please enter category title"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-4">
                                <Form.Item>
                                    <CustomButton
                                        severity="help"
                                        type="submit"
                                        className="rounded p-2 ps-3 pe-3"
                                        label="Add Product Category"
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

export default AddProductCategory;