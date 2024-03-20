import axios from "axios";
const createAxiosInstance = (token, image) => {
    const axiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BASE_API_URL});

    axiosInstance.interceptors.request.use(
      (config) => {

          // config.headers['Content-Type'] = 'application/json';
          if (image) {
              // Laissez Axios définir automatiquement `Content-Type` pour les FormData
              delete config.headers['Content-Type'];
          } else {
              config.headers['Accept'] = 'application/json';
              config.headers['Content-Type'] = 'application/json';
          }

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