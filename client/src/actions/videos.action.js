import axios from "axios";
import { LOADING, ADD_VIDEO } from "./types";

export const add_video = (data) => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .post("/api/videos/add", data, {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("/upload - action res -", res.data);
      if (res.data.success) {
        dispatch({
          type: ADD_VIDEO,
          video: res.data.video,
          message: "",
        });
      } else {
        dispatch({
          type: ADD_VIDEO,
          video: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("/upload - action err-", err);
    });
};
