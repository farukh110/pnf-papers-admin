import { useEffect, useState } from "react";
import { Form, notification } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import { Dropdown } from "primereact/dropdown";
import CustomButton from "../../components/global/custom-web-controls/custom-button";
import CustomInputText from "../../components/global/custom-web-controls/custom-input-text";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsOption } from '../../redux/api/brand/brandSlice';
import { getAllCategoryOption } from "../../redux/api/product-categories/categoriesSlice";
import { DropdownList, Multiselect } from "react-widgets";
import "react-widgets/styles.css";
import { getAllColorsOption } from "../../redux/api/color/colorSlice";
import Dropzone from 'react-dropzone'
import { deleteImage, setUploadedImages, uploadImages } from "../../redux/api/upload/uploadSlice";
import { createProduct, getProduct, resetState, updateProduct } from "../../redux/api/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [form] = Form.useForm();
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [brandsOption, setBrandsOption] = useState(null);
    const [categoryOption, setCategoryOption] = useState(null);
    const [colorsOption, setColorsOption] = useState(null);
    const [tagsOption, setTagsOption] = useState({ tag: "Featured", id: "featured" });

    const { brands = [] } = useSelector(state => state.brands);
    const { categories = [] } = useSelector(state => state.productsCategory);
    const { colors = [] } = useSelector(state => state.colors);
    const images = useSelector((state) => state.upload.images);

    const { isSuccess, isError, isLoading, productDetails } = useSelector(state => state.products);


    const productId = params.id;

    useEffect(() => {

        if (productId !== undefined) {

            dispatch(getProduct(productId));

        } else {

            // dispatch(resetState());
        }

    }, [productId, dispatch]);

    console.log('productDetails: ', productDetails);

    useEffect(() => {

        if (productDetails && productId && brands.length > 0 && categories.length > 0 && colors.length) {

            const matchedBrand = brands.find(item => item.title === productDetails.brand);

            console.log('matchedBrand:', matchedBrand);
            console.log('productDetails.brand: ', productDetails.brand);
            console.log('productDetails.tags: ', productDetails.tags);
            console.log('productDetails.color: ', productDetails.color);

            const brandValue = matchedBrand
                ? { name: matchedBrand.title, code: matchedBrand._id }
                : null;

            const matchedCategory = categories.find(item => item.title === productDetails.category);

            const categoryValue = matchedCategory
                ? { name: matchedCategory.title, code: matchedCategory._id }
                : null;

            const matchedTag = [
                { tag: "Featured", id: "featured" },
                { tag: "Popular", id: "popular" },
                { tag: "Special", id: "special" }
            ].find(item => item.tag === productDetails.tags) || { tag: "Featured", id: "featured" };

            console.log('matchedTag: ', matchedTag);
            setTagsOption(matchedTag);

            // Handle color selection from API response
            const selectedColors = productDetails.color && productDetails.color.length > 0
                ? productDetails.color.map(item => ({ color: item.color, id: item.id }))
                : [];

            console.log('selectedColors: ', selectedColors);
            setColorsOption(selectedColors);

            form.setFieldsValue({
                title: productDetails.title,
                price: productDetails.price,
                product_description: productDetails.description,
                product_brand: brandValue,
                product_category: categoryValue,
                tags: matchedTag,
                color: selectedColors,
                length: productDetails.length,
                width: productDetails.width,
                height: productDetails.height,
                quantity: productDetails.quantity,
                weight: productDetails.weight
            });

            setDescription(productDetails.description);
            setBrandsOption(brandValue);
            setCategoryOption(categoryValue);

            if (productDetails.images && productDetails.images.length > 0) {
                dispatch(setUploadedImages(productDetails.images));
            }
        }
    }, [productDetails, form, productId, brands, categories, colors, dispatch]);

    useEffect(() => {

        dispatch(getAllBrandsOption());
        dispatch(getAllCategoryOption());
        dispatch(getAllColorsOption());

    }, []);

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

        const productData = {
            ...values,
            description,
            images,
            brand: values?.product_brand?.name,
            category: values?.product_category?.name,
            tags: values?.tags?.tag

        };

        console.log('Success:', productData);

        try {

            dispatch(updateProduct(productData));

            notification.success({
                message: 'Product Updated',
                description: 'The product has been updated successfully!',
                duration: 1,
            });

            setTimeout(() => {

                dispatch(resetState());
                navigate('/admin/products');

            }, 1000);

        } catch (error) {

            console.log("error: ", error);
            notification.error({
                message: 'Creation Failed',
                description: 'An error occurred while updating the product. Please try again.',
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

                <h4 className='mt-md-2'> Update Product </h4>

                <div className='col-md-12'>

                    <Form
                        form={form}
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
                                        value={brandsOption}
                                        onChange={(e) => {
                                            setBrandsOption(e.value);
                                            form.setFieldsValue({ product_brand: e.value });
                                        }}
                                        options={brands.map((item) => ({ name: item?.title, code: item?._id }))}
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
                                        value={categoryOption}
                                        onChange={(e) => {
                                            setCategoryOption(e.value);
                                            form.setFieldsValue({ product_category: e.value });
                                        }}
                                        options={categories.map((item) => ({ name: item?.title, code: item?._id }))}
                                        optionLabel="name"
                                        placeholder="Select Product Category"
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
                                    name="product_description"
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

                                    <Multiselect
                                        name="color"
                                        dataKey="id"
                                        onChange={(e) => {
                                            console.log(e);
                                            setColorsOption(e);
                                            form.setFieldsValue({ color: e });
                                        }}
                                        textField="color"
                                        value={colorsOption}
                                        data={colors.map((item) => ({ color: item?.title, id: item?._id }))}
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Tags
                                </label>

                                <Form.Item
                                    name="tags"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Tags',
                                        },
                                    ]}
                                >

                                    <DropdownList
                                        name="tags"
                                        dataKey="id"
                                        textField="tag"
                                        value={tagsOption}
                                        data={[
                                            { tag: "Featured", id: "featured" },
                                            { tag: "Popular", id: "popular" },
                                            { tag: "Special", id: "special" },
                                        ]}
                                        onChange={(e) => {
                                            console.log(e);
                                            setTagsOption(e);
                                        }}
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

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Quantity
                                </label>

                                <Form.Item
                                    name="quantity"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Quantity',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter quantity"
                                    />

                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-3">
                                <label>
                                    Weight
                                </label>

                                <Form.Item
                                    name="weight"
                                    className="mt-md-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Weight',
                                        },
                                    ]}
                                >
                                    <CustomInputText
                                        className="form-control"
                                        keyfilter="pint"
                                        placeholder="Please enter weight"
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

                        <div className="row mt-md-4">

                            <Form.Item>
                                {/* <Button type="primary" htmlType="submit">
                                    Add Product
                                </Button> */}
                                <CustomButton
                                    severity="help"
                                    type="submit"
                                    className="rounded"
                                    label="Update Product"
                                />

                            </Form.Item>

                        </div>

                    </Form>
                </div>

            </div>
        </>
    )
}

export default UpdateProduct;