import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

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

const productService = {
    getAllProducts
};

export default productService;
