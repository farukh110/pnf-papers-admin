import { BsArrowDownRight } from 'react-icons/bs';
import './index.scss';

const Dashboard = () => {
    return (
        <>
            <div className='dashboard'>
                <div className='row'>

                    <div className='col-md-4'>

                        <div className='dashboard-card bg-white rounded-3 shadow p-3'>

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
            </div>
        </>
    )
}

export default Dashboard;