import { Form, notification } from "antd";
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategory, resetState, updateCategory } from "../../redux/api/product-categories/categoriesSlice";
import { useEffect } from "react";

const UpdateProductCategory = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const categoryId = params.id;

    // console.log('categoryId: ', categoryId);

    const { isSuccess, isError, isLoading, categoryName } = useSelector(state => state.productsCategory);

    useEffect(() => {

        if (categoryId !== undefined) {

            dispatch(getCategory(categoryId));

        } else {

            // dispatch(resetState());
        }

    }, [categoryId, dispatch]);

    useEffect(() => {
        if (categoryName) {
            form.setFieldsValue({ title: categoryName });
        }
    }, [categoryName, form]);

    const onFinish = (values) => {

        try {

            if (!categoryId) {
                console.error("Error: Category ID is undefined");
                return;
            }

            const categoryData = { id: categoryId, title: values.title };

            dispatch(updateCategory(categoryData));

            notification.success({
                message: 'Category Updated',
                description: 'The category has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/categories');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Updation Failed',
                description: 'An error occurred while updating the category. Please try again.',
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

                <h4 className='mt-md-2'> Update Product Category </h4>

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
                                        label="Update Product Category"
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

export default UpdateProductCategory;