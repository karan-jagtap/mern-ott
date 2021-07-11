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
      console.log("reducer - ", action);
      return {
        ...state,
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
