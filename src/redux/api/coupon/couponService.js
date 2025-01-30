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

const createCoupon = async (coupon) => {

    const response = await axios.post(`${BACKEND}/coupon`, coupon, config);
    return response.data;
}

const couponService = {

    getAllCoupons,
    createCoupon
}

export default couponService;