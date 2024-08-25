import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const login = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND}/user/admin-login`, userData);

        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

    } catch (error) {
        console.error('Error during login:', error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

const authService = {

    login

};

export default authService; 