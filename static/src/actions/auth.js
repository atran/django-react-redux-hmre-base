import { push } from 'react-router-redux';
import { request } from '../utils';
import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGOUT_USER,
  AUTH_CREATE_USER_REQUEST,
  AUTH_CREATE_USER_FAILURE,
  AUTH_CREATE_USER_SUCCESS,
} from '../constants';


export function authLoginUserSuccess(token, user) {
	sessionStorage.setItem('token', token);
	sessionStorage.setItem('user', JSON.stringify(user));
	return {
		type: AUTH_LOGIN_USER_SUCCESS,
		payload: {
			token,
			user,
		},
	};
}

export function authLoginUserFailure(error, message) {
	sessionStorage.removeItem('token');
	return {
		type: AUTH_LOGIN_USER_FAILURE,
		payload: {
			status: error,
			statusText: message,
		},
	};
}

export function authLoginUserRequest() {
	return {
		type: AUTH_LOGIN_USER_REQUEST,
	};
}

export function authLogout() {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('user');
	return {
		type: AUTH_LOGOUT_USER,
	};
}

export function authLogoutAndRedirect() {
	return (dispatch) => {
		dispatch(authLogout());
		dispatch(push('/login'));
    // TODO: we need a promise here because of the tests, find a better way
		return Promise.resolve();
	};
}

export function authLoginUser(email, password, redirect = '/') {
	return (dispatch) => {
		dispatch(authLoginUserRequest());
		return request({
			path: '/login/',
			method: 'post',
			payload: {
				email,
				password,
			},
		})
    .then((response) => {
	dispatch(authLoginUserSuccess(response.token, response.user));
	dispatch(push(redirect));
})
    .catch((error) => {
	if (error && typeof error.response !== 'undefined') {
		const status = error.response.status;

		if (status < 500) {
			return error.response.json().then(data => dispatch(authLoginUserFailure(401, data.non_field_errors[0])));
		} else if (status >= 500) {
			dispatch(authLoginUserFailure(status, 'A server error occurred while sending your data!'));
		} else {
			dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
		}
	}
	return Promise.resolve();
});
	};
}

function authCreateUserSuccess(user) {
	return {
		type: AUTH_CREATE_USER_SUCCESS,
		payload: {
			user,
		},
	};
}

function authCreateUserFailure(error, message, errorFields) {
	return {
		type: AUTH_CREATE_USER_FAILURE,
		payload: {
			status: error,
			statusText: message,
			errorFields,
		},
	};
}

function authCreateUserRequest() {
	return {
		type: AUTH_CREATE_USER_REQUEST,
	};
}

export function authCreateUser(user) {
	return (dispatch) => {
		dispatch(authCreateUserRequest());
		return request({
			path: '/register', method: 'post', payload: user,
		})
    .then((res) => {
	dispatch(authCreateUserSuccess(res));
})
    .catch((error) => {
	if (error && typeof error.response !== 'undefined') {
		const status = error.response.status;
		if (status < 500) {
			return error.response.json().then((data) => {
				let errStatus = '';
				const errorFields = Object.keys(data);
				errorFields.forEach((field) => {
					data[field].forEach((msg) => {
						errStatus += `${msg} `;
					});
				});

				dispatch(authCreateUserFailure(status, errStatus, errorFields));
			});
		} else if (status >= 500) {
			dispatch(authCreateUserFailure(status, 'A server error occurred while sending your data!'));
		} else {
			dispatch(authCreateUserFailure('Connection Error', 'An error occurred while sending your data!'));
		}
	}

	return Promise.resolve();
});
	};
}
