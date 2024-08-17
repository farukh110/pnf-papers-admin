import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {

    const [description, setDescription] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleDescription = (e) => {

        console.log('description: ', e);

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
                                    <Input />
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

                                    <Select
                                        defaultValue="lucy"
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: 'jack',
                                                label: 'Jack',
                                            },
                                            {
                                                value: 'lucy',
                                                label: 'Lucy',
                                            },
                                            {
                                                value: 'Yiminghe',
                                                label: 'yiminghe',
                                            },
                                        ]}
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-12">
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
                                        onChange={(e) => handleDescription(e)}
                                    />

                                </Form.Item>

                            </div>

                        </div>

                        <div className="row">

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default AddBlog;