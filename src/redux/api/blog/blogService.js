import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const getAllBlogs = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/blog?${queryString}`);

    if (response?.data) {
        return response?.data;
    }
}

const createBlog = async (blog) => {

    const response = await axios.post(`${BACKEND}/blog`, blog, config);
    return response.data;
}

const getBlog = async (id) => {

    try {

        const response = await axios.get(`${BACKEND}/blog/${id}`, config);
        return response.data;

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const updateBlog = async (blog) => {

    const response = await axios.put(`${BACKEND}/blog/${blog.id}`,
        {
            title: blog.title,
            category: blog.category,
            description: blog.description,
            images: blog.images
        }, config);

    return response.data;
}

const deleteBlog = async (blogId) => {

    const response = await axios.delete(`${BACKEND}/blog/${blogId}`, config);
    return response.data;
}

const blogService = {

    getAllBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}

export default blogService;