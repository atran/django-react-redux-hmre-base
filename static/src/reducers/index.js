import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import authReducer from './auth';

export default function createReducer() {
	return combineReducers({
		auth: authReducer,
		routing: routerReducer,
		browser: createResponsiveStateReducer({
			small: 320,
			break: 667,
			medium: 768,
			large: 1024,
			xlarge: 1440,
		}, {
			extraFields: () => ({
				width: window.innerWidth,
				height: window.innerHeight,
			}),
		}),
	});
}
