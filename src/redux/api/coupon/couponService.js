import axios from "axios";
import { BACKEND, config } from "../../utilities/base_url";

const getAllCoupons = async (params) => {

    const { page, limit, sortBy, sortOrder, filters } = params;

    const queryString = new URLSearchParams({

        page,
        limit,
        sortBy,
        sortOrder,
        filters: JSON.stringify(filters)

    }).toString();

    const response = await axios.get(`${BACKEND}/coupon?${queryString}`, config);

    if (response?.data) {
        return response?.data;
    }
}

const getCoupon = async (id) => {

    try {

        const response = await axios.get(`${BACKEND}/coupon/${id}`, config);
        return response.data;

    } catch (error) {

        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'api error');
    }
}

const createCoupon = async (coupon) => {

    const response = await axios.post(`${BACKEND}/coupon`, coupon, config);
    return response.data;
}

const updateCoupon = async (coupon) => {

    const response = await axios.put(`${BACKEND}/coupon/${coupon.id}`, { name: coupon.name, expiry: coupon.expiry, discount: coupon.discount }, config);
    return response.data;
}

const deleteCoupon = async (couponId) => {

    const response = await axios.delete(`${BACKEND}/coupon/${couponId}`, config);
    return response.data;
}


const couponService = {

    getAllCoupons,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
}

export default couponService;