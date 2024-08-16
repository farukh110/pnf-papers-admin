import { BsArrowDownRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import './index.scss';

const Dashboard = () => {

    const data = [
        { type: 'January', sales: 40 },
        { type: 'February', sales: 20 },
        { type: 'March', sales: 30 },
        { type: 'April', sales: 50 },
        { type: 'May', sales: 70 },
        { type: 'June', sales: 100 },
        { type: 'July', sales: 50 },
        { type: 'August', sales: 95 },
        { type: 'September', sales: 24 },
        { type: 'October', sales: 85 },
        { type: 'November', sales: 25 },
        { type: 'December', sales: 60 },
    ];

    const config = {

        data,
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
                alias: "Income"
            }
        }
    };

    return (
        <>
            <div className='dashboard'>
                <div className='row'>

                    <div className='col-md-4'>

                        <div className='dashboard-card card-light-gray rounded-3 p-3'>

                            <div className='row'>

                                <div className='col-md-6'>

                                    <p className='mb-0'>
                                        Total
                                    </p>
                                    <h4 className='mb-0'> 500 </h4>
                                </div>

                                <div className='col-md-6 align-self-end'>

                                    <h6 className='mb-0 float-end'> <BsArrowDownRight className='text-success' /> 40% </h6>
                                    <br />
                                    <p className='mb-0 float-end'>
                                        Compare to August 2024
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='col-md-4'>

                        <div className='dashboard-card card-light-green rounded-3 p-3'>

                            <div className='row'>

                                <div className='col-md-6'>

                                    <p className='mb-0'>
                                        Total
                                    </p>
                                    <h4 className='mb-0'> 500 </h4>
                                </div>

                                <div className='col-md-6 align-self-end'>

                                    <h6 className='mb-0 float-end'> <BsArrowDownRight className='text-success' /> 40% </h6>
                                    <br />
                                    <p className='mb-0 float-end'>
                                        Compare to August 2024
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='col-md-4'>

                        <div className='dashboard-card card-light-sky rounded-3 p-3'>

                            <div className='row'>

                                <div className='col-md-6'>

                                    <p className='mb-0'>
                                        Total
                                    </p>
                                    <h4 className='mb-0'> 500 </h4>
                                </div>

                                <div className='col-md-6 align-self-end'>

                                    <h6 className='mb-0 float-end'> <BsArrowDownRight className='text-success' /> 40% </h6>
                                    <br />
                                    <p className='mb-0 float-end'>
                                        Compare to August 2024
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='row'>
                    <div className='col-md-12'>

                        <h4 className='mt-md-3'> Income Statistics </h4>

                        <Column className="mt-md-3" {...config} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;