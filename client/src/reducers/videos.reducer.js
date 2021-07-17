import { ADD_VIDEO, LOADING } from "../actions/types";

const initialState = {
  videos: [],
  loading: false,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.video],
        loading: false,
      };
    default:
      return state;
  }
};

export default videoReducer;
