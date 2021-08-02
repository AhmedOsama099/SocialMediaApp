import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	axios
		.post("https://localhost:44392/Login", userData, config)
		.then((res) => {
			setAuthorizationHeader(res.data);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });

			history.push("/");
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const signupUser = (signupBody, loginBody, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	axios
		.post("https://localhost:44392/api/account/register", signupBody, config)
		.then((res) => {
			axios
				.post("https://localhost:44392/Login", loginBody, config)
				.then((res) => {
					setAuthorizationHeader(res.data);
					dispatch(getUserData());
					dispatch({ type: CLEAR_ERRORS });
					history.push("/");
				});
		})
		.catch((err) => {
			console.log(err.response.data);
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data.ModelState,
			});
		});
};

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.get("https://localhost:44392/api/Account/GetUser")
		.then((res) => {
			dispatch({ type: SET_USER, payload: res.data });
		})
		.catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	const config = {
		headers: {
			"content-type": "multipart/form-data",
		},
	};
	axios
		.post("https://localhost:44392/api/Account/User/Image", formData, config)
		.then((res) => {
			res.data.Response.ReasonPhrase ===
			"Profile picture must be in jpg or png extension"
				? dispatch({
						type: SET_ERRORS,
						payload: res.data.Response.ReasonPhrase,
				  })
				: dispatch({ type: CLEAR_ERRORS });
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("AuthToken");
	localStorage.removeItem("AuthTokenExpires");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const editUserDetails = (userDetails) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post("https://localhost:44392/api/Account/User/EditUser", userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
	const userToken = `Bearer ${token.access_token}`;
	localStorage.setItem("AuthToken", userToken);
	localStorage.setItem("AuthTokenExpires", `${token[".expires"]}`);
	axios.defaults.headers.common["Authorization"] = userToken;
};
