import axios from 'axios';
// import config from './../../../../config/config.production'
const axios_api = axios.create({
    baseURL: 'http://localhost/ANF_Laravel/public/api',
});
// axios_api.defaults.baseURL = 'http://localhost/sistes/public/api'
axios_api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios_api.defaults.headers.get['Accepts'] = 'application/json';
// axios_api.pending = null
const reqInt = axios_api.interceptors.request.use((config) => {
    // if (Vue.prototype.$store.site.user) {
    //   config.headers.Authorization = 'Bearer ' + Vue.prototype.$store.site.jwt
    // }
    return config;
});
const respInt = axios_api.interceptors.response.use((res) => {
    return res;
}, (error) => {
    error = error.response
        ? error
        : {
            response: {
                data: {
                    message: 'Cors error,Check preflight request, there is not response from server',
                },
                statusText: 'Cors Errors , There no status text',
            },
        };
    throw error;
});
// axios_api.interceptors.request.eject(reqInt)
// axios_api.interceptors.response.eject(respInt)
export default axios_api;
export const Axios = axios_api;
