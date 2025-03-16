import { useEffect, useState } from "react";
import { Form, notification } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import './index.scss';
import { Dropdown } from 'primereact/dropdown';
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import Dropzone from 'react-dropzone';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, setUploadedImages, uploadImages } from "../../redux/api/upload/uploadSlice";
import { getAllBlogCategoryOption } from "../../redux/api/blog-category/blogCategorySlice";
import { createBlog, getBlog, resetState, updateBlog } from "../../redux/api/blog/blogSlice";

const UpdateBlog = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const blogId = params.id;

    const [description, setDescription] = useState('');

    const [categoryOption, setCategoryOption] = useState(null);

    const images = useSelector((state) => state.upload.images);

    const { blogCategory = [] } = useSelector(state => state.blogCategory);

    const { isSuccess, isError, isLoading, blogDetails } = useSelector(state => state.blogs);

    useEffect(() => {

        if (blogId !== undefined) {

            dispatch(getBlog(blogId));

        } else {

            // dispatch(resetState());
        }

    }, [blogId, dispatch]);

    console.log('blogDetails: ', blogDetails);

    useEffect(() => {
        if (blogDetails && blogId && blogCategory.length > 0) {

            // ✅ Flexible matching
            const matchedCategory = blogCategory.find(cat => blogDetails.category.includes(cat.title));

            const categoryValue = matchedCategory
                ? { name: matchedCategory.title, code: matchedCategory._id }
                : null;

            console.log('blog images:', blogCategory.images);

            form.setFieldsValue({
                title: blogDetails.title,
                blog_category: categoryValue,
                blog_description: blogDetails.description,
            });

            setDescription(blogDetails.description);
            setCategoryOption(categoryValue);

            if (blogDetails.images && blogDetails.images.length > 0) {
                dispatch(setUploadedImages(blogDetails.images));
            }
        }
    }, [blogDetails, form, blogId, blogCategory, dispatch]);


    useEffect(() => {

        dispatch(getAllBlogCategoryOption());

    }, []);

    const handleDrop = (acceptedFiles) => {
        dispatch(uploadImages(acceptedFiles));
    };

    const validateImages = (_, value) => {
        if (images.length === 0) {
            return Promise.reject(new Error('Please upload images'));
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {

        const blogData = {
            id: blogId,
            title: values.title,
            description,
            images,
            category: values?.blog_category?.name,
        };

        console.log('Submitting Blog Data:', blogData);

        try {
            const resultAction = await dispatch(updateBlog(blogData));

            if (updateBlog.fulfilled.match(resultAction)) {
                notification.success({
                    message: 'Blog Updated',
                    description: 'The blog has been updated successfully!',
                    duration: 1,
                });

                setTimeout(() => {
                    navigate('/admin/blogs');
                }, 1000);
            } else {
                throw new Error('Failed to update blog');
            }

        } catch (error) {
            console.error("Update Blog Error: ", error);
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating the blog. Please try again.',
                duration: 2,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleDescription = (e) => {

        console.log('description: ', e);
        setDescription(e);

    }

    return (
        <>
            <div className='row'>

                <h4 className='mt-md-2'> Update Blog </h4>

                <div className='col-md-12'>

                    <Form
                        form={form}
                        className="mt-md-3"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <div className="row">

                            <div className="col-md-6">
                                <label>
                                    Blog Title
                                </label>

                                <Form.Item
                                    name="title"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Blog title',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        placeholder="Please enter title"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3">
                                <label>
                                    Blog Category
                                </label>

                                <Form.Item
                                    name="blog_category"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Blog category',
                                        },
                                    ]}
                                >
                                    <Dropdown
                                        value={form.getFieldValue("blog_category")} // 🚨 Ensure selected value is taken from form
                                        onChange={(e) => {
                                            setCategoryOption(e.value);
                                            form.setFieldsValue({ blog_category: e.value });
                                        }}
                                        options={blogCategory.map((item) => ({
                                            name: item?.title,
                                            code: item?._id
                                        }))}
                                        optionLabel="name"
                                        placeholder="Select Blog Category"
                                        filter
                                        showClear
                                        className="w-full custom-dropdown"
                                    />
                                </Form.Item>

                            </div>

                            <div className="col-md-12 mt-md-2">
                                <label>
                                    Blog Description
                                </label>

                                <Form.Item
                                    name="blog_description"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Blog description',
                                        },
                                    ]}
                                >

                                    <ReactQuill
                                        theme="snow"
                                        value={description}
                                        className="custom-editor"
                                        onChange={(e) => handleDescription(e)}
                                    />

                                </Form.Item>

                            </div>

                            <div className="col-md-12">
                                <Form.Item
                                    name="upload_images"
                                    className="mt-md-4 shadow p-3"
                                    rules={[
                                        {
                                            validator: validateImages,
                                        },
                                    ]}
                                >

                                    <Dropzone onDrop={handleDrop}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag and drop some files here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>

                                </Form.Item>
                            </div>

                            <div className="col-md-12 mt-md-4">

                                <div className="showing-images d-flex flex-wrap shadow p-3 gap-3">

                                    {
                                        images.map((item, index) => {

                                            return (
                                                <div key={index} className="position-relative">

                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(deleteImage(item.public_id))}
                                                        className="position-absolute btn-remove pi pi-times">

                                                    </button>
                                                    <img
                                                        src={item.url}
                                                        width="200"
                                                        height="200"
                                                    />
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                            </div>

                        </div>

                        <div className="row mt-md-3">

                            <Form.Item>
                                <CustomButton
                                    severity="help"
                                    type="submit"
                                    className="rounded p-2 ps-3 pe-3"
                                    label="Update Blog"
                                />
                            </Form.Item>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default UpdateBlog;