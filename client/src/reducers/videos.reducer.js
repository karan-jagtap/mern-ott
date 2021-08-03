import { ADD_VIDEO, ALL_VIDEOS, LOADING } from "../actions/types";

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
    case ALL_VIDEOS:
      return {
        ...state,
        videos: [...action.videos],
        loading: false,
      };
    default:
      return state;
  }
};

export default videoReducer;
