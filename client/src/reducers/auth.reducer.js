import { LOADING, LOGIN_USER } from "../actions/types";
const initialState = {
  user: undefined,
  message: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        success: action.payload.success,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

export default authReducer;
