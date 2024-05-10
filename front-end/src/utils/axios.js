import axios from "axios";
import { BASE_BACKEND_URL } from "../config";

const createAxiosInstance = (token) => {
    const axiosInstance = axios.create({baseURL: BASE_BACKEND_URL});

    axiosInstance.interceptors.request.use(
        (config) => {
            // Ajoutez les en-têtes statiques
            config.headers['Accept'] = 'application/json';
            config.headers['Content-Type'] = 'application/json';

            // Ajoutez le jeton d'autorisation (Bearer) de manière dynamique
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) =>
            Promise.reject((error.response && error.response.data) || "Something went wrong")
    );

    return axiosInstance;
};

export default createAxiosInstance;
