import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

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

const getCategory = async (id) => {

    try {

        const response = await axios.get(`${BACKEND}/category/${id}`, config);
        return response.data;

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const createCategory = async (category) => {

    const response = await axios.post(`${BACKEND}/category`, category, config);
    return response.data;
}

const updateCategory = async (category) => {

    const response = await axios.put(`${BACKEND}/category/${category.id}`, { title: category.title }, config);
    return response.data;
}

const deleteCategory = async (categoryId) => {

    const response = await axios.delete(`${BACKEND}/category/${categoryId}`, config);
    return response.data;
}

const categoriesService = {

    getAllProductsCategory,
    getAllCategoryOption,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

export default categoriesService;