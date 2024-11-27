export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};
