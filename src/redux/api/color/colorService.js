import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

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

const getAllColorsOption = async () => {

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

const createColor = async (color) => {

    const response = await axios.post(`${BACKEND}/color`, color, config);
    return response.data;

}

const colorService = {

    getAllColors,
    getAllColorsOption,
    createColor
}

export default colorService;