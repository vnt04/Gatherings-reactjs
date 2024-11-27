import { LOGIN_SUCCESS } from "../actions/authAction";

const initState = {
  userData: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: { ...action.payload },
      };
    default:
      return state;
  }
};

export default authReducer;
