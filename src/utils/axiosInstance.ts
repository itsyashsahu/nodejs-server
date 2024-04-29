import axios from "axios";
import config from "../config";

const AxiosInstance = axios.create({
    // Base URL for all requests
    baseURL: config.RICK_MONTY_API, 

    // Request timeout in milliseconds
    timeout: 5000, 
    
    // Header if a 3rd party service requires authentication
    // not required in this case
    // headers: {
    //     'Authorization': 'Bearer <token>',
    //     'Content-Type': 'application/json' 
    // }
});

export default AxiosInstance