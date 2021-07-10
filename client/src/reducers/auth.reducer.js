import { LOADING } from "../actions/types";
const initialState = {
  user: undefined,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default authReducer;
