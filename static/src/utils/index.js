import fetch from 'isomorphic-fetch';
import { SERVER_URL, API_URL } from './config';

export function createReducer(initialState, reducerMap) {
	return (state = initialState, action) => {
		const reducer = reducerMap[action.type];
		return reducer ? reducer(state, action.payload) : state;
	};
}

function checkHttpStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

function parseJSON(response) {
	return response.json();
}

export function request({ host = 'server', path, method = 'get', payload, headers = {} }) {
	Object.assign(headers, {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	});

	const url = (host === 'server') ? `${SERVER_URL}/api/v1` : API_URL;
	const body = payload ? JSON.stringify(payload) : null;
	const data = body ? { method, headers, body } : { method, headers };

	return new Promise((resolve, reject) => {
		fetch(`${url}${path}`, data)
		.then(checkHttpStatus)
		.then(parseJSON)
		.then(resolve)
		.catch(reject);
	});
}
