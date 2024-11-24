import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllProductsCategory = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/category?${queryString}`);

    if (response?.data) {

        return response?.data;
    }
}

const getAllCategoryOption = async () => {

    try {

        const response = await axios.get(`${BACKEND}/category/options`);

        if (response?.data) {
            return response?.data;
        }

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const categoriesService = {

    getAllProductsCategory,
    getAllCategoryOption
}

export default categoriesService;