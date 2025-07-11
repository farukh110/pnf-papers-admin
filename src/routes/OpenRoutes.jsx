import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {

    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));

    console.log('getTokenFromLocalStorage: ', getTokenFromLocalStorage);

    return getTokenFromLocalStorage?.token === undefined ? children : (<Navigate to='/admin' replace={true} />)
};