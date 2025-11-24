// src/lib/axios.ts
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://web-production-65a22.up.railway.app',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default axios;
