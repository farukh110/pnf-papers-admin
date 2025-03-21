import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnquiry, resetState, updateEnquiry } from '../../redux/api/enquiry/enquirySlice';
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

    const setEnquiryStatus = (statusObj, enquiryId) => {

        if (!statusObj || !statusObj.name) {
            console.error("Invalid status object:", statusObj);
            return;
        }

        const data = { id: enquiryId, status: statusObj.name };
        dispatch(updateEnquiry(data))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    dispatch(getEnquiry(enquiryId)); // Refresh the enquiry data
                }, 100);
            })
            .catch((error) => {
                console.error("Update failed:", error);
            });
    };

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
                                            onChange={(e) => setEnquiryStatus(e.value, enquiryId)}
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
