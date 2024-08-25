import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const login = async (userData) => {

    const response = await axios.post(`${BACKEND}/user/admin-login`, userData);

    console.log('response: ', response);

};

const authService = {

    login

};

export default authService; 