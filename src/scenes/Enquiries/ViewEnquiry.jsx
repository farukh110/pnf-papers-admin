import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnquiry } from '../../redux/api/enquiry/enquirySlice';
import { Dropdown } from 'primereact/dropdown';

const ViewEnquiry = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const enquiryId = params.id;

    const { isSuccess, isError, isLoading, enquiryDetail } = useSelector(state => state.enquiries);

    const [selectedStatus, setSelectedStatus] = useState(null);

    const statuses = [
        { name: 'Submitted', code: '1' },
        { name: 'Contacted', code: '2' },
        { name: 'In Progress', code: '3' },
        { name: 'Resolved', code: '4' },
    ];

    useEffect(() => {
        dispatch(getEnquiry(enquiryId));
    }, [enquiryId, dispatch]);

    const { comment, email, mobile, name, status } = enquiryDetail || {};

    useEffect(() => {
        if (status) {
            const matchedStatus = statuses.find(s => s.name === status);
            setSelectedStatus(matchedStatus || null);
        }
    }, [status]);

    console.log('enquiryDetail: ', enquiryDetail);

    return (
        <>
            <div className='row'>
                <h4 className='mt-md-2'> View Enquiry </h4>
                <div className='row mt-md-4'>
                    <div className='col-md-10'>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Comment</th>
                                    <th>Mobile</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{comment}</td>
                                    <td>{mobile}</td>
                                    <td>{status}</td>
                                    <td>
                                        <Dropdown
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.value)}
                                            options={statuses}
                                            optionLabel="name"
                                            placeholder="Select Status"
                                            className="w-full md:w-14rem"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEnquiry;
