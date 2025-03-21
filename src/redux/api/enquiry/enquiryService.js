import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const getAllEnquiries = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/enquiry?${queryString}`);

    if (response?.data) {
        return response?.data;
    }
}

const deleteEnquiry = async (enquiryId) => {

    const response = await axios.delete(`${BACKEND}/enquiry/${enquiryId}`, config);
    return response.data;
}

const getEnquiry = async (enquiryId) => {

    const response = await axios.get(`${BACKEND}/enquiry/${enquiryId}`);
    return response.data;
}

const updateEnquiry = async (enquiry) => {
    console.log("Sending Payload:", { status: enquiry.status }); // Debugging
    const response = await axios.put(`${BACKEND}/enquiry/${enquiry.id}`, { status: enquiry.status }, config);
    return response.data;
};


const enquiryService = {

    getAllEnquiries,
    deleteEnquiry,
    getEnquiry,
    updateEnquiry
}

export default enquiryService;