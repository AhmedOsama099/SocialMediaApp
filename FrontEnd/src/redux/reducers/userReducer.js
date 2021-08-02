import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
} from "../types";

const initalState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: [],
};

export default function (state = initalState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return initalState;
		case SET_USER:
			return {
				...state,
				authenticated: true,
				loading: false,
				credentials: action.payload,
				likes: action.payload.Likes,
			};
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		case LIKE_SCREAM:
			return {
				...state,
				likes: [
					...state.likes,
					{
						userHandle: state.credentials,
						screamId: action.payload.ScreamId,
					},
				],
			};
		case UNLIKE_SCREAM:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.screamId !== action.payload.ScreamId
				),
			};
		default:
			return state;
	}
}
