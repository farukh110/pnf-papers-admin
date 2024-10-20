import axios from "axios";
import { BACKEND } from "../../utilities/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

console.log('getTokenFromLocalStorage: ', getTokenFromLocalStorage);

const config = {

    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
        Accept: "application/json"
    }
};

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

const getAllOrders = async () => {

    try {

        console.log('getTokenFromLocalStorage: ', getTokenFromLocalStorage.token);

        const response = await axios.get(`${BACKEND}/user/all-orders`, config);

        return response.data;

    } catch (error) {

        console.error('Error during login:', error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

const authService = {

    login,
    getAllOrders

};

export default authService; 
