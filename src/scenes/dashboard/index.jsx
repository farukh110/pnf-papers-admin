import { Table } from 'antd';
import { BsArrowDownRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMonthlyOrders, getYearlyStats } from '../../redux/api/auth/authSlice';
import RecentOrders from '../recent-orders';

const Dashboard = () => {

    const dispatch = useDispatch();

    const monthlyDataState = useSelector(state => state?.auth?.monthlyData);
    const yearlyDataState = useSelector(state => state?.auth?.yearlyData);

    const [dataMonthly, setDataMonthly] = useState([]);
    const [dataMonthlySales, setDataMonthlySales] = useState([]);

    useEffect(() => {

        dispatch(getMonthlyOrders());
        dispatch(getYearlyStats());

    }, []);

    useEffect(() => {

        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let data = [];
        let monthlyOrderCount = [];

        for (let index = 0; index < monthlyDataState?.length; index++) {

            const element = monthlyDataState[index];

            data.push({ type: monthNames[element?._id?.month], income: element?._id?.amount });
            monthlyOrderCount.push({ type: monthNames[element?._id?.month], sales: element?._id?.count });
        }

        console.log('data: ', data);

        setDataMonthly(data);
        setDataMonthlySales(monthlyOrderCount);


    }, [monthlyDataState]);


    const config = {

        data: dataMonthly,
        xField: 'type',
        yField: 'income',
        style: {
            fill: () => {
                return '#2989FF';
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false
            }
        },
        legend: true,
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income"
            }
        }
    };

    const config2 = {

        data: dataMonthlySales,
        xField: 'type',
        yField: 'sales',
        style: {
            fill: () => {
                return '#2989FF';
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false
            }
        },
        legend: true,
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Sales"
            }
        }
    };

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
            <div className='dashboard'>
                <div className='row justify-content-center'>

                    <div className='col-md-4'>

                        <div className='dashboard-card card-light-gray rounded-3 p-3'>

                            <div className='row'>

                                <div className='col-md-5'>

                                    <p className='mb-0'>
                                        Total Income
                                    </p>
                                    <h4 className='mb-0'> {yearlyDataState?.length > 0 ? yearlyDataState[0]?.amount : 'Loading...'} </h4>
                                </div>

                                <div className='col-md-7 align-self-end'>

                                    {/* <h6 className='mb-0 float-end'> <BsArrowDownRight className='text-success' /> 40% </h6> */}
                                    <br />
                                    <p className='mb-0 float-end'>
                                        Income in Last Year from Today
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='col-md-4'>

                        <div className='dashboard-card card-light-green rounded-3 p-3'>

                            <div className='row'>

                                <div className='col-md-5'>

                                    <p className='mb-0'>
                                        Total Sales
                                    </p>
                                    <h4 className='mb-0'> {yearlyDataState?.length > 0 ? yearlyDataState[0].count : 'Loading...'} </h4>
                                </div>

                                <div className='col-md-7 align-self-end'>

                                    {/* <h6 className='mb-0 float-end'> <BsArrowDownRight className='text-success' /> 40% </h6> */}
                                    <br />
                                    <p className='mb-0 float-end'>
                                        Sales in Last Year from Today
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                </div>

                <div className='row'>
                    <div className='col-md-6'>

                        <h4 className='mt-md-3'> Income Statistics </h4>

                        <Column className="mt-md-3" {...config} />
                    </div>
                    <div className='col-md-6'>

                        <h4 className='mt-md-3'> Sales Statistics </h4>

                        <Column className="mt-md-3" {...config2} />
                    </div>
                </div>

                <RecentOrders />

            </div>
        </>
    )
}

export default Dashboard;