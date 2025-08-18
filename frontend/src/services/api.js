// frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance with a base URL.
// This points to your FastAPI backend.
// You might need to adjust the port depending on how you run your backend.
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Corresponds to your api_router in FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;