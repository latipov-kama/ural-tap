import axios from "axios";

const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default makeRequest