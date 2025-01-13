import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const getAllBlogCategories = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/blog-category?${queryString}`);

    if (response?.data) {
        return response?.data;
    }
}

const getAllBlogCategoryOption = async () => {

    try {

        const response = await axios.get(`${BACKEND}/blog-category/options`);

        if (response?.data) {
            return response?.data;
        }

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const createBlogCategory = async (blogCategory) => {

    const response = await axios.post(`${BACKEND}/blog-category`, blogCategory, config);
    return response.data;
}

const blogCategoryService = {

    getAllBlogCategories,
    getAllBlogCategoryOption,
    createBlogCategory
}

export default blogCategoryService;