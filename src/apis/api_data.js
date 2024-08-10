import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot default port

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/`+endpoint);
        // const response = await axios.get(`${API_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};