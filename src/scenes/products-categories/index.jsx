import { Table } from 'antd';
import './index.scss';

const ProductsCategories = () => {

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Product',
            dataIndex: 'product',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    const dataSource = Array.from({
        length: 46,
    }).map((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        product: 'Frontlit Backlit Flex Banner',
        status: `Pending`,
    }));

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>

                    <h4 className='mt-md-2'> Products Categories List </h4>

                    <Table
                        className='mt-md-3'
                        columns={columns}
                        dataSource={dataSource}
                    />

                </div>
            </div>
        </>
    )
}

export default ProductsCategories;