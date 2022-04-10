import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const regularRequest = axios.create({
  baseURL: BASE_URL,
});
