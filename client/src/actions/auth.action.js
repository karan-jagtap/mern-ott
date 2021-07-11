import axios from "axios";
import { LOADING, LOGIN_USER } from "./types";

export const login_user = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  console.log("actions - login_user() - data = ", data);
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      console.log("actions - login - res = ", res.data);
      if (res.data.success) {
        localStorage.setItem("id", res.data.user.id);
        console.log("inside if");
        dispatch({
          type: LOGIN_USER,
          success: true,
          user: res.data.user,
          message: "",
        });
      } else {
        console.log("inside else");
        dispatch({
          type: LOGIN_USER,
          success: false,
          user: undefined,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("actions - login_user() - catch - ", err);
    });
};
