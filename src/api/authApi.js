import axiosClient from "./axionClient";

const authApi = { // 48
   register: (params) => axiosClient.post("auth/register", params),
   login: (params) => axiosClient.post("auth/login", params), // 60
   verifyToken: () => axiosClient.post("auth/verify-token"), // 62
};

export default authApi;

