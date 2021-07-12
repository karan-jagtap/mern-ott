import { LOADING, LOGIN_USER, LOAD_USER_DETAILS } from "../actions/types";

const initialState = {
  user: null,
  id: localStorage.getItem("id") || null,
  token: localStorage.getItem("token") || null,
  message: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_DETAILS:
    case LOGIN_USER:
      console.log("reducer - ", action);
      return {
        ...state,
        token: action.token,
        user: action.user || undefined,
        success: action.success,
        message: action.message,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
