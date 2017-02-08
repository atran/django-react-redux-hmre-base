import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requireAuthentication() {
	class AuthenticatedComponent extends React.Component {

		static propTypes = {
			isAuthenticated: React.PropTypes.bool.isRequired,
			location: React.PropTypes.shape({
				pathname: React.PropTypes.string.isRequired,
			}).isRequired,
			dispatch: React.PropTypes.func.isRequired,
		}

		componentWillMount() {
			this.checkAuth();
		}

		componentWillReceiveProps() {
			this.checkAuth();
		}

		checkAuth() {
			if (!this.props.isAuthenticated) {
				const redirectAfterLogin = this.props.location.pathname;
				this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true
						? <Component {...this.props} /> // eslint-disable-line react/jsx-no-undef
						: null
          }
				</div>
			);
		}
    }

	const mapStateToProps = state => ({
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
	});

	return connect(mapStateToProps)(AuthenticatedComponent);
}
