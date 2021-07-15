import { ADD_CATEGORY, CATEGORY_LIST, LOADING } from "../actions/types";

const initialState = {
  categories: [],
  loading: false,
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      console.log("reducer = ", action);
      return {
        categories: [...state.categories, action.category],
        loading: false,
      };
    case CATEGORY_LIST:
      return {
        categories: action.categories,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default CategoriesReducer;
