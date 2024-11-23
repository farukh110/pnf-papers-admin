import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllBrands = async (params) => {

    try {

        const { page, limit, sortBy, sortOrder, filters } = params;

        const queryString = new URLSearchParams({

            page,
            limit,
            sortBy,
            sortOrder,
            filters: JSON.stringify(filters)

        }).toString();

        const response = await axios.get(`${BACKEND}/brand?${queryString}`);

        if (response?.data) {
            return response?.data;
        }

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const getAllBrandsOption = async () => {

    try {

        const response = await axios.get(`${BACKEND}/brand/options`);

        if (response?.data) {
            return response?.data;
        }

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const brandService = {

    getAllBrands,
    getAllBrandsOption
}

export default brandService;