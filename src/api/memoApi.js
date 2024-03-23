import axiosClient from "./axionClient";

const memoApi = { // 80
   create: () => axiosClient.post("memo"),
   getAll: () => axiosClient.get("memo"),
   getOne: (id) => axiosClient.get(`memo/${id}`),
   update: (id, params) => axiosClient.put(`memo/${id}`, params), // 92 
   delete: (id) => axiosClient.delete(`memo/${id}`), 
};

export default memoApi;

