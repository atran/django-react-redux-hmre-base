import { createReducer } from '../utils';
import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGOUT_USER,
	AUTH_CREATE_USER_REQUEST,
	AUTH_CREATE_USER_FAILURE,
	AUTH_CREATE_USER_SUCCESS,
} from '../constants';


const initialState = {
	token: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
};

export default createReducer(initialState, {
	[AUTH_LOGIN_USER_REQUEST]: state => Object.assign({}, state, {
		isAuthenticating: true,
		statusText: null,
	}),
	[AUTH_LOGIN_USER_SUCCESS]: (state, payload) => Object.assign({}, state, {
		isAuthenticating: false,
		isAuthenticated: true,
		token: payload.token,
		user: payload.user,
		statusText: 'You have been successfully logged in.',
	}),
	[AUTH_LOGIN_USER_FAILURE]: (state, payload) => Object.assign({}, state, {
		isAuthenticating: false,
		isAuthenticated: false,
		token: null,
		userName: null,
		statusText: `Authentication Error: ${payload.statusText}`,
	}),
	[AUTH_LOGOUT_USER]: state => Object.assign({}, state, {
		isAuthenticated: false,
		token: null,
		userName: null,
		statusText: 'You have been successfully logged out.',
	}),
	[AUTH_CREATE_USER_REQUEST]: state => Object.assign({}, state, {
		isCreating: true,
		statusText: null,
	}),
	[AUTH_CREATE_USER_SUCCESS]: state => Object.assign({}, state, {
		isCreating: false,
		isCreated: true,
		statusText: 'Account successfully created. Sign in by clicking the link we sent.',
	}),
	[AUTH_CREATE_USER_FAILURE]: (state, payload) => Object.assign({}, state, {
		isCreating: false,
		isCreated: false,
		statusText: `Account Error: ${payload.statusText}`,
		errorFields: payload.errorFields,
	}),
});
