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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImages } from "../../redux/api/upload/uploadSlice";
import { getAllBlogCategoryOption } from "../../redux/api/blog-category/blogCategorySlice";
import { createBlog, resetState } from "../../redux/api/blog/blogSlice";

const AddBlog = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');

    const [categoryOption, setCategoryOption] = useState(null);

    const images = useSelector((state) => state.upload.images);

    const { blogCategory = [] } = useSelector(state => state.blogCategory);

    // console.log('blogCategory: ', blogCategory);

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

    const onFinish = (values) => {

        const blogData = {
            ...values,
            description,
            images,
            category: values?.blog_category?.name,

        };

        console.log('Success:', blogData);

        try {

            dispatch(createBlog(blogData));

            notification.success({
                message: 'Blog Created',
                description: 'The Blog has been created successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/blogs');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Creation Failed',
                description: 'An error occurred while creating the blog. Please try again.',
                duration: 1,
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

                <h4 className='mt-md-2'> Add Blog </h4>

                <div className='col-md-12'>

                    <Form
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
                                        value={categoryOption}
                                        onChange={(e) => setCategoryOption(e.value)}
                                        options={blogCategory.map((item) => ({ name: item?.title, code: item?._id }))}
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
                                    label="Add Blog"
                                />
                            </Form.Item>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default AddBlog;