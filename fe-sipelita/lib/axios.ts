// src/lib/axios.ts
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // <-- INI KUNCINYA
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default axios;