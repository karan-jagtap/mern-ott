import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoriesReducer from "./categories.reducer";
import videoReducer from "./videos.reducer";

export default combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  videos: videoReducer,
});
