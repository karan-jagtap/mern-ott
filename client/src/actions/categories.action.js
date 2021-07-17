import axios from "axios";
import {
  ADD_CATEGORY,
  CATEGORY_LIST,
  EDIT_CATEGORY,
  LOADING,
  DELETE_CATEGORY,
} from "./types";

export const add_category = (data) => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .post("/api/categories/add", data, {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("action = res = /api/categories/add = ", res.data);
      if (res.data.success) {
        dispatch({
          type: ADD_CATEGORY,
          success: res.data.success,
          category: res.data.data,
          message: "",
        });
      } else {
        dispatch({
          type: ADD_CATEGORY,
          success: res.data.success,
          category: [],
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("action = res = /api/categories/add = ", err);
    });
};

export const get_category = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .get("/api/categories/", data)
    .then((res) => {
      console.log("action = res = /api/categories/ = ", res.data);
      dispatch({
        type: CATEGORY_LIST,
        success: res.data.success,
        categories: res.data.data,
        message: "",
      });
    })
    .catch((err) => {
      console.log("action = res = /api/categories/ = ", err);
    });
};

export const edit_category = (data) => (dispatch, getState) => {
  axios
    .post("/api/categories/edit", data, {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("action - /api/categories/edit - res - ", res.data);
      if (res.data.success) {
        dispatch({
          type: EDIT_CATEGORY,
          success: res.data.success,
          category: res.data.data,
          message: "",
        });
      } else {
        dispatch({
          type: EDIT_CATEGORY,
          success: res.data.success,
          category: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("action = res = /api/categories/edit - ", err);
    });
};

export const delete_category = (data) => (dispatch, getState) => {
  axios
    .post("/api/categories/delete", data, {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("action - /api/categories/delete - res - ", res.data);
      dispatch({
        type: DELETE_CATEGORY,
        success: res.data.success,
        category: data,
      });
    })
    .catch((err) => {
      console.log("action = res = /api/categories/delete = ", err);
    });
};
