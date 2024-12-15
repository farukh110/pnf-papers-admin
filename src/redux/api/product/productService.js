import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const getAllProducts = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters),
    }).toString();

    try {
        const response = await axios.get(`${BACKEND}/product?${queryString}`);

        console.log('products response: ', response);

        return response.data;

    } catch (error) {
        throw new Error('Error: ', error);
    }
};

const createProduct = async (product) => {

    const response = await axios.post(`${BACKEND}/product/`, product, config);
    return response.data;
};

const productService = {
    getAllProducts,
    createProduct
};

export default productService;
