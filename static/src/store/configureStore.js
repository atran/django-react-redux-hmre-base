/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createResponsiveStoreEnhancer } from 'redux-responsive';

import createReducer from './../reducers';

export default function configureStore(initialState, history) {
	const middlewares = [
		thunk,
		routerMiddleware(history),
	];

	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line no-underscore-dangle
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; // eslint-disable-line no-underscore-dangle

	const enhancers = composeEnhancers(
		createResponsiveStoreEnhancer(),
		applyMiddleware(...middlewares),
	);

	const store = createStore(
		createReducer(),
		initialState,
		enhancers,
	);

	// Make reducers hot reloadable, see http://mxs.is/googmo
	if (module.hot) {
		module.hot.accept('./../reducers', () => {
			System.import('./../reducers').then((reducerModule) => {
				const createReducers = reducerModule.default;
				const nextReducers = createReducers(store.asyncReducers);

				store.replaceReducer(nextReducers);
			});
		});
	}

	return store;
}
