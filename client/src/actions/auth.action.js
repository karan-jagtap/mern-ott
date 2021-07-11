import axios from "axios";
import { LOADING, LOGIN_USER } from "./types";

export const login_user = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  console.log("actions - login_user() - data = ", data);
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      if (res.success) {
        localStorage.setItem("id", res.data.id);
        dispatch({
          type: LOGIN_USER,
          success: true,
          user: res.data,
          message: "",
        });
      } else {
        dispatch({
          type: LOGIN_USER,
          success: false,
          user: undefined,
          message: res.message,
        });
      }
    })
    .catch((err) => {
      console.log("actions - login_user() - catch - ", err);
    });
};
