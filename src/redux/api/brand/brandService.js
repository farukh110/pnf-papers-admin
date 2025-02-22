import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

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

const getBrand = async (id) => {

    try {

        const response = await axios.get(`${BACKEND}/brand/${id}`, config);
        return response.data;

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const createBrand = async (brand) => {

    const response = await axios.post(`${BACKEND}/brand`, brand, config);
    return response.data;
}

const updateBrand = async (brand) => {

    const response = await axios.put(`${BACKEND}/brand`, brand, config);
    return response.data;
}

const brandService = {

    getAllBrands,
    getAllBrandsOption,
    getBrand,
    createBrand,
    updateBrand
}

export default brandService;