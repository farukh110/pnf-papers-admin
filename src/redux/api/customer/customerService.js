import axios from "axios"
import { BACKEND } from "../../utilities/base_url"

const getAllUsers = async () => {

    const response = await axios.get(`${BACKEND}/user/users`);

    if (response.data) {
        return response.data;
    }
}

const customerService = {
    getAllUsers
}

export default customerService;