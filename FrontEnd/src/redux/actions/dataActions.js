import {
  LOADING_DATA,
  LOADING_UI,
  SET_SCREAMS,
  POST_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get All screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://localhost:44392/api/Screams/GetAll")
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

// get a scream

export const getScream = (id) => async (dispatch) => {
  await axios
    .get(`https://localhost:44392/api/Screams/${id}`)
    .then(async (res) => {
      await dispatch({ type: SET_SCREAM, payload: res.data[0] });
      await dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post Scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("https://localhost:44392/api/Screams/Post", newScream)
    .then((res) => {
      dispatch({ type: POST_SCREAM, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`https://localhost:44392/api/Screams/${screamId}/Like`)
    .then((res) => dispatch({ type: LIKE_SCREAM, payload: res.data[0] }))
    .catch((err) => console.log(err));
};

// Unlike a scream
export const unLikeScream = (screamId) => (dispatch) => {
  axios
    .get(`https://localhost:44392/api/Screams/${screamId}/UnLike`)
    .then((res) => dispatch({ type: UNLIKE_SCREAM, payload: res.data[0] }))
    .catch((err) => console.log(err));
};

// Submit Comment

export const submitComment = (commentData, screamId) => (dispatch) => {
  console.log(commentData);

  axios
    .post(
      `https://localhost:44392/api/Comments/SubmitCommet/${screamId}`,
      commentData
    )
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err.response.data);

      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Delete Scream
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .post(`https://localhost:44392/api/Screams/Delete/${screamId}`)
    .then((res) => {
      dispatch({ type: DELETE_SCREAM, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// Get User Data
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`https://localhost:44392/api/Account/GetUserProfile/`, userHandle)
    .then((res) => dispatch({ type: SET_SCREAMS, payload: res.data.screams }))
    .catch(() => dispatch({ type: SET_SCREAMS, payload: null }));
};

//Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
