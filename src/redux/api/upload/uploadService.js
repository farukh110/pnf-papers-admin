import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const uploadImage = async (data) => {

    // try {

    const response = await axios.put(`${BACKEND}/upload/`, data, config);
    return response.data;

    // } catch (error) {

    //     console.error('Error:', error);
    //     throw new Error(error || 'api error');
    // }
};

const uploadService = {

    uploadImage
};

export default uploadService;