import { post } from "../services/httpService";

export const login = async (userData) => {
  const response = await post("/user/login", userData);
  return response;
};

export const register = async (userData) => {
  const response = await post("/user/register", userData);
  return response;
};
