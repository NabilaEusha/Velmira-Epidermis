import axios from 'axios';

// const BASE_URL = "http://localhost:8000/api/v1";

const BASE_URL = "https://velmira-epidermis-backend.onrender.com/api/v1";

export const userRequest = axios.create({
    baseURL: BASE_URL
})