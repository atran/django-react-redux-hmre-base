import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { calculateResponsiveState } from 'redux-responsive';
import routes from '../../routes';

import './style.scss';

export default class Root extends React.Component {

	static propTypes = {
		store: React.PropTypes.shape().isRequired,
		history: React.PropTypes.shape().isRequired,
	};

	componentDidMount() {
		const { store } = this.props;

		store.dispatch(calculateResponsiveState(window));
		window.addEventListener('resize', () => {
			store.dispatch(calculateResponsiveState(window));
		});
	}

	render() {
		const { store, history } = this.props;

		// 1. TODO: Giving Router a random key allows for
		// code splitting with HMRE, but resets all states
		// 2. TODO: Also needs to be wrapped to handle
		// error tracing correctly https://github.com/facebook/react/issues/6472
		return (
			<span>
				<Provider store={store}>
					<Router key={Math.random()} history={history}>
						{routes}
					</Router>
				</Provider>
			</span>
		);
	}
}
