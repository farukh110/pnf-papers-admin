import { useEffect, useState } from "react";
import { Form } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import './index.scss';
import { Dropdown } from "primereact/dropdown";
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsOption } from './../../redux/api/brand/brandSlice';

const AddProduct = () => {

    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    // const [brandsOption, setBrandsOption] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const { brands = [] } = useSelector(state => state.brands);

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
    ];

    useEffect(() => {

        dispatch(getAllBrandsOption());

    }, []);

    console.log('brands: ', brands);

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
        setDescription(e);

    }

    const handleKeyPress = (e) => {

        const charCode = e.which ? e.which : e.keyCode;
        if (
            (charCode >= 48 && charCode <= 57) ||
            (charCode === 46 && e.target.value.indexOf('.') === -1)
        ) {
            return;
        }

        e.preventDefault();
    };

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <div className='row'>

                <h4 className='mt-md-2'> Add Product </h4>

                <div className='col-md-12'>

                    <Form
                        className="mt-md-3"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <div className="row">

                            <div className="col-md-4">

                                <label>
                                    Product Title
                                </label>

                                <Form.Item
                                    name="title"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Product title',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        placeholder="Please enter product name"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-2">

                                <label>
                                    Price
                                </label>

                                <Form.Item
                                    name="price"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Price',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter price"
                                    />
                                </Form.Item>

                            </div>

                            <div className="col-md-3">
                                <label>
                                    Product Brand
                                </label>

                                <Form.Item
                                    name="product_brand"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Product brand',
                                        },
                                    ]}
                                >

                                    <Dropdown
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.value)}
                                        options={countries}
                                        optionLabel="name"
                                        placeholder="Select Product Brand"
                                        filter
                                        showClear
                                        className="w-full custom-dropdown"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-3">
                                <label>
                                    Product Category
                                </label>

                                <Form.Item
                                    name="product_category"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Product category',
                                        },
                                    ]}
                                >

                                    <Dropdown
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.value)}
                                        options={countries}
                                        optionLabel="name"
                                        placeholder="Select product category"
                                        filter
                                        showClear
                                        className="w-full custom-dropdown"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-12 mt-md-2">
                                <label>
                                    Product Description
                                </label>

                                <Form.Item
                                    name="blog_description"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Product description',
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

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Color
                                </label>

                                <Form.Item
                                    name="color"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Color',
                                        },
                                    ]}
                                >

                                    <Dropdown
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.value)}
                                        options={countries}
                                        optionLabel="name"
                                        placeholder="Select color"
                                        filter
                                        showClear
                                        className="w-full custom-dropdown"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Length
                                </label>

                                <Form.Item
                                    name="length"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Length',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter length"
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Width
                                </label>

                                <Form.Item
                                    name="width"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Width',
                                        },
                                    ]}
                                >

                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter width"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Height
                                </label>

                                <Form.Item
                                    name="height"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Height',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter height"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-12">
                                <Form.Item
                                    name="upload_images"
                                    className="mt-md-4"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please upload images',
                                        },
                                    ]}
                                >

                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                            banned files.
                                        </p>
                                    </Dragger>

                                </Form.Item>
                            </div>

                        </div>

                        <div className="row mt-md-3">

                            <Form.Item>
                                {/* <Button type="primary" htmlType="submit">
                                    Add Product
                                </Button> */}
                                <CustomButton
                                    severity="help"
                                    type="submit"
                                    className="rounded"
                                    label="Add Product"
                                />

                            </Form.Item>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default AddProduct;