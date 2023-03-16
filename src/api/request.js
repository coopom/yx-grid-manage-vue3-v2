import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API;

const request = axios.create({
    baseURL: BASE_API,
    timeout: 3 * 60 * 1000
});

request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (resp) => {
        if (!resp || !resp.data) {
            return Promise.reject(resp);
        }


        const { code, success, status, retCode, describe } = resp.data;
        if (status === 200) {
            return resp.data?.data;
        }

        if (code === 200) {
            return resp.data?.obj ?? resp.data?.data;
        }

        if (retCode === "000") {
            return resp.data?.data;
        }

        if (describe === "success") {
            return resp.data;
        }

        return Promise.reject(resp.data);
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;