import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllColors = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/color?${queryString}`);

    if (response?.data) {
        return response?.data;
    }
}

const colorService = {

    getAllColors
}

export default colorService;