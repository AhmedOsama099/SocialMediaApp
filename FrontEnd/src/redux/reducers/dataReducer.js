import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.ScreamId === action.payload.ScreamId
      );
      state.screams[index] = action.payload;
      if (state.scream.ScreamId === action.payload.ScreamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_SCREAM:
      let screamIndex = state.screams.findIndex(
        (scream) => scream.ScreamId === action.payload
      );
      state.screams.splice(screamIndex, 1);
      return {
        ...state,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          Comments: [action.payload, ...state.scream.Comments],
        },
      };
    default:
      return state;
  }
}
