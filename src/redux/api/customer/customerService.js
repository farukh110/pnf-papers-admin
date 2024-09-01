import axios from "axios"
import { BACKEND } from "../../utilities/base_url"

const getAllUsers = async (params) => {
    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters), // Properly stringify the filters
    }).toString();

    const response = await axios.get(`${BACKEND}/user/users?${queryString}`);

    if (response.data) {
        return response.data;
    }
};

const customerService = {
    getAllUsers
}

export default customerService;