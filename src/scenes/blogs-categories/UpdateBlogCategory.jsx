import { Form, notification } from "antd";
import './index.scss';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlogCategory, getBlogCategory, resetState, updateBlogCategory } from "../../redux/api/blog-category/blogCategorySlice";
import { useEffect } from "react";

const UpdateBlogCategory = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const blogCategoryId = params.id;

    const { isSuccess, isError, isLoading, blogCategoryName } = useSelector(state => state.blogCategory);

    useEffect(() => {

        if (blogCategoryId !== undefined) {

            dispatch(getBlogCategory(blogCategoryId));

        } else {

            // dispatch(resetState());
        }

    }, [blogCategoryId, dispatch]);

    useEffect(() => {
        if (blogCategoryName) {
            form.setFieldsValue({ title: blogCategoryName });
        }
    }, [blogCategoryName, form]);

    const onFinish = (values) => {

        try {

            if (!blogCategoryId) {
                console.error("Error: blog Category ID is undefined");
                return;
            }

            const blogCategoryData = { id: blogCategoryId, title: values.title };

            dispatch(updateBlogCategory(blogCategoryData));

            notification.success({
                message: 'Blog Category Updated',
                description: 'The blog category has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/blogs-categories');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Updation Failed',
                description: 'An error occurred while updating the blog category. Please try again.',
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

                <h4 className='mt-md-2'> Update Blog Category </h4>

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
                                    Blog Category Title
                                </label>

                                <Form.Item
                                    name="title"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Blog category title',
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
                                        label="Update Blog Category"
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

export default UpdateBlogCategory;