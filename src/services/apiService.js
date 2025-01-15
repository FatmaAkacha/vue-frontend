import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9001", // URL du backend
});

export default {
  login(username, password) {
    return api.post("/login", { username, password });
  },
};
