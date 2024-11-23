import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import './index.scss';
import { useEffect } from 'react';
import { getAllOrders } from '../../redux/api/auth/authSlice';

const Orders = () => {

    const dispatch = useDispatch();

    const orderState = useSelector((state) => state.auth.orders);

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
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
    ];

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    // console.log('orderState: ', orderState);

    // Ensure orderState is not null before using .map
    const dataSource = Array.isArray(orderState.data)
        ? orderState.data.map((item, index) => ({
            key: index + 1,
            name: `${item?.orderBy?.firstname} ${item?.orderBy?.lastname}`,
            product: item.products.map((productItem, idx) => (
                <p key={idx}>{productItem?.product?.title}</p>
            )),
            amount: item.paymentIntent.amount,
            date: new Date(item.createdAt).toLocaleString(),
        }))
        : [];


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
