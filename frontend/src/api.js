import axios from 'axios';

const API_URL = 'https://your-backend-url.com/api';

export const calculatePortfolio = async (inputs) => {
    const response = await axios.post(`${API_URL}/calculate`, inputs);
    return response.data;
};
