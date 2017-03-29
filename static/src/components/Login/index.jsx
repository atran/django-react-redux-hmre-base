import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';

import * as actionCreators from '../../actions/auth';

class LoginView extends React.Component {
	static propTypes = {
		location: React.PropTypes.objectOf(React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.string,
		])),
		isAuthenticated: React.PropTypes.bool,
		dispatch: React.PropTypes.func,
		actions: React.PropTypes.objectOf(React.PropTypes.func),
		statusText: React.PropTypes.string,
	}

	constructor(props) {
		super(props);

		this.redirectTo = this.props.location ? this.props.location.query.next || '/' : '/';
		this.state = {
			email: '',
			password: '',
		};
	}

	componentWillMount() {
		if (this.props.isAuthenticated) {
			this.props.dispatch(push('/'));
		}
	}

	handleChange = (e) => {
		const { target } = e;
		const { value, name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.actions.authLoginUser(this.state.email, this.state.password, this.redirectTo);
	}

	render() {
		const copyWithWeirdSyntax = 'Don\'t have an account? ';
		const copyWithWeirdSyntax2 = 'Forgot your login information?';

		let statusText = null;
		if (this.props.statusText) {
			const statusTextClassNames = classNames({
				alert: true,
				'alert--danger': this.props.statusText.indexOf('Authentication Error') === 0,
				'alert--success': this.props.statusText.indexOf('Authentication Error') !== 0,
			});

			if (this.props.statusText && this.props.statusText.indexOf('Authentication Error') === 0) {
				statusText = (
					<div className={statusTextClassNames}>
						{this.props.statusText}
					</div>
				);
			}
		}

		return (
			<div className="container container--login">
				<div className="splash-image" />
				<section className="form--login">
					<div className="form--login__header">
						<h1 className="heading--xl">Log into your account</h1>
						<p className="copy">
							{copyWithWeirdSyntax}
							<Link to="/register"> Sign Up </Link>
						</p>
						<p className="copy">
							{copyWithWeirdSyntax2}
							<Link to="/reset"> Resend your password. </Link>
						</p>
					</div>
					{statusText}
					<form onSubmit={this.handleSubmit} >
						<div className="input-list--login">
							<div className="full-width">
								<input
									type="email" placeholder="* Email"
									name="email" className="copy"
									required
									onChange={this.handleChange}
								/>
							</div>
							<div className="full-width">
								<input
									type="password" placeholder="* Password"
									name="password" className="copy"
									required pattern=".{4,}" title="At least 4 characters"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<input type="submit" label="Submit" />
					</form>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isAuthenticating: state.auth.isAuthenticating,
	statusText: state.auth.statusText,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };
