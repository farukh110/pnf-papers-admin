import { Form, Input } from "antd";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './index.scss';

const AddBrand = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='row'>

                <h4 className='mt-md-2'> Add Brand </h4>

                <div className='col-md-12'>

                    <Form
                        className="mt-md-3"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
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
                                            message: 'Please enter Brand title',
                                        },
                                    ]}
                                >
                                    {/* <Input /> */}
                                    <InputText className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="col-md-3 mt-md-4">
                                <Form.Item>
                                    <Button
                                        severity="help"
                                        type="submit"
                                        className="rounded p-2 ps-3 pe-3"
                                        label="Add Brand"
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

export default AddBrand;