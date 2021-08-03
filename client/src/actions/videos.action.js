import axios from "axios";
import { LOADING, ADD_VIDEO, ALL_VIDEOS } from "./types";

export const add_video = (data) => (dispatch, getState) => {
  dispatch({ type: LOADING });
  console.log("action - add_videos - data = ", data);
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

export const get_videos = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  console.log("action - get_videos");
  axios
    .get("/api/videos/", {
      headers: { "auth-token": getState().auth.token },
    })
    .then((res) => {
      console.log("/api/videos/ - action res -", res.data);
      if (res.data.success) {
        console.log(res.data.data);
        dispatch({
          type: ALL_VIDEOS,
          success: true,
          videos: res.data.data,
          message: "",
        });
      } else {
        dispatch({
          type: ALL_VIDEOS,
          success: false,
          videos: [],
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("/api/videos/ - action err-", err);
    });
};
