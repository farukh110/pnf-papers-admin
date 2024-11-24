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

export const getAllColorsOption = async () => {

    try {

        const response = await axios.get(`${BACKEND}/color/options`);

        if (response?.data) {
            return response?.data;
        }

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }

}

const colorService = {

    getAllColors,
    getAllColorsOption
}

export default colorService;