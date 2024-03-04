import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/user/sign-in", {
    email: userEmail,
    password: userPassword,
  });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/user/getAll?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/user/sign-up", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/user/delete-user", {
    data: { id: userId },
  });
};

const editUserService = (data) => {
  return axios.put("/api/user/update-user", data);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
};
