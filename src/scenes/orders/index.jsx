import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import './index.scss';
import { useEffect } from 'react';
import { getAllOrders } from '../../redux/api/auth/authSlice';

const Orders = () => {

    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const orderState = useSelector((state) => state.auth.orders);

    console.log('orderState: ', orderState);

    // Ensure orderState is not null before using .map
    const dataSource = (orderState ?? []).map((item, index) => ({
        key: index + 1,
        name: item.name,
        product: item.product,
        status: item.status,
    }));

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className='mt-md-2'> Orders List </h4>
                    <Table
                        className='mt-md-3'
                        columns={columns}
                        dataSource={dataSource}
                    />
                </div>
            </div>
        </>
    );
};

export default Orders;
