import { LOGIN_SUCCESS, UPDATE_SUCCESS } from "../actions/authAction";

const initState = {
  userData: {},
  updateTimestamp: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: { ...action.payload },
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updateTimestamp: Date.now(),
      };
    default:
      return state;
  }
};

export default authReducer;
