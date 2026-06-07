 import api from "./axios";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
  updateProfile: (payload) => api.put("/auth/profile", payload)
};

export const resourceApi = (path) => ({
  list: () => api.get(path),
  create: (payload) => api.post(path, payload),
  update: (id, payload) => api.put(`${path}/${id}`, payload),
  remove: (id) => api.delete(`${path}/${id}`)
});

export const analyticsApi = {
  summary: () => api.get("/analytics/summary"),
  progress: () => api.get("/analytics/progress")
};