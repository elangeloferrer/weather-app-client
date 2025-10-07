import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:5173",
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // handle logout or token refresh here
        }

        const customError = {
            message:
                error.response?.data?.message || "Unexpected error occurred.",
            status: error.response?.status || 500,
            internal: error.response?.data?.internal || false,
            details: error.response?.data,
        };

        return Promise.reject(customError);
    },
);

export default api;
