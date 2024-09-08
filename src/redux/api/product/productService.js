import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllProducts = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters), // Properly stringify the filters
    }).toString();

    const response = await axios.get(`${BACKEND}/api/product?${queryString}`);

    if (response.data) {
        return response.data;
    }
};

const productService = {

    getAllProducts

};

export default productService; 