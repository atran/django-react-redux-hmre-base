import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './actions/auth';


const initialState = {};
const target = document.getElementById('root');

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const node = (
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>
);

const token = sessionStorage.getItem('token');
let user = {};
try {
	user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
	store.dispatch(authLoginUserSuccess(token, user));
}

ReactDOM.render(node, target);

if (module.hot) {
	module.hot.accept();
}
