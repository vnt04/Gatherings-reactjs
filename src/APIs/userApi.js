import requestApi from "../helpers/api";

export const getUserInfo = async (id) => {
  try {
    const response = await requestApi(`user/${id}`, "GET");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, newUpdate) => {
  try {
    const response = await requestApi(`user/${id}`, "PATCH", newUpdate);
  } catch (error) {
    console.log(error);
  }
};
