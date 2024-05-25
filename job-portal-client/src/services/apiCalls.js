import axios from "axios";

export const profile = async ({ token }) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:4000/api/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
