import axios from "axios";
import { LOADING, LOGIN_USER, LOAD_USER_DETAILS } from "./types";

export const login_user = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  console.log("actions - login_user() - data = ", data);
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      console.log("actions - login - res = ", res.data);
      if (res.data.success) {
        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("token", res.data.token);
        console.log("inside if");
        dispatch({
          type: LOGIN_USER,
          success: true,
          token: res.data.token,
          user: res.data.user,
          message: "",
        });
      } else {
        console.log("inside else");
        dispatch({
          type: LOGIN_USER,
          success: false,
          token: null,
          user: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("actions - login_user() - catch - ", err);
    });
};

export const login_user_google = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .post("/api/auth/login_google", data)
    .then((res) => {
      console.log("actions - login_user_google - res = ", res.data);
      if (res.data.success) {
        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("token", res.data.token);
        console.log("inside if");
        dispatch({
          type: LOGIN_USER,
          success: true,
          token: res.data.token,
          user: res.data.user,
          message: "",
        });
      } else {
        console.log("inside else");
        dispatch({
          type: LOGIN_USER,
          success: false,
          token: null,
          user: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("actions - login_user_google() - catch - ", err);
    });
};

export const get_user_details = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .get("/api/auth/user_details", {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("action - /user_details - res - ", res);
      if (res.data.success) {
        console.log("action - /user_details - res - if()");
        dispatch({
          type: LOAD_USER_DETAILS,
          success: res.data.success,
          token: getState().auth.token,
          user: res.data.user,
          message: null,
        });
      } else {
        console.log("action - /user_details - res - else()");
        dispatch({
          type: LOAD_USER_DETAILS,
          success: res.data.success,
          token: null,
          user: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("action - /user_details - err - ", err);
    });
};
