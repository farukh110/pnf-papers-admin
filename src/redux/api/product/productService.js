import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getProducts = async () => {

    const response = await axios.get(`${BACKEND}/user/users?`);
    return response;
};

const productService = {

    getProducts

};

export default productService; 