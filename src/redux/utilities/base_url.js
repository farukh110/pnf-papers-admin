export const BACKEND = import.meta.env.VITE_BACKEND_API;

const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

export const config = {

    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage?.token : ""}`,
        Accept: "application/json"
    }
};
