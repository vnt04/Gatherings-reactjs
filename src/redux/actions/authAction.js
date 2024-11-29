export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const updateSuccess = () => {
  return {
    type: UPDATE_SUCCESS,
  };
};
