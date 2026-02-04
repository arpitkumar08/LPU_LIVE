import axios from 'axios';

export const api = axios.create({
    baseURL: "https://lpulive.lpu.in/api",
    headers: {
        "Content-Type": "application/json",
    },
})