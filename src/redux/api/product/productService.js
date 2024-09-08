import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getAllProducts = async () => {

    const response = await axios.get(`${BACKEND}/api/product?`);
    return response;
};

const productService = {

    getAllProducts

};

export default productService; 