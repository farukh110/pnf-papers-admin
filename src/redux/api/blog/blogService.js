import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllBlogs = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/blog?${queryString}`);

    if (response?.data) {
        return response?.data;
    }
}

const blogService = {

    getAllBlogs
}

export default blogService;