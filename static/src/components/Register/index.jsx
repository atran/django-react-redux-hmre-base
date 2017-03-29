import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import * as actionCreators from '../../actions/auth';

class RegisterView extends React.Component {
	static propTypes = {
		isCreated: React.PropTypes.bool,
		statusText: React.PropTypes.string,
		errorFields: React.PropTypes.arrayOf(React.PropTypes.string),
		actions: React.PropTypes.shape({
			authCreateUser: React.PropTypes.func.isRequired,
		}),
	}

	constructor(props) {
		super(props);

		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
		};
	}

	handleChange = (e) => {
		const { target } = e;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.actions.authCreateUser(this.state);
	}

	render() {
		const { isCreated, errorFields } = this.props;
		const copyWithWeirdSyntax = 'Already have an account? ';

		const headerCls = classNames({
			'form--register__header': true,
			hide: isCreated,
		});
		const formCls = classNames({
			hide: isCreated,
		});

		const inputClasses = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
		};

		let statusText = null;
		if (this.props.statusText) {
			const statusTextClassNames = classNames({
				alert: true,
				'alert--danger': this.props.statusText.indexOf('Account Error') === 0,
				'alert--success': this.props.statusText.indexOf('Account Error') !== 0,
			});

			if (this.props.statusText && this.props.statusText.indexOf('Account') === 0) {
				statusText = (
					<div className={statusTextClassNames}>
						{this.props.statusText}
					</div>
				);
			}
		}

		return (
			<div className="container container--register">

				<div className="splash-image" />
				<section className="form--register">
					<div className={headerCls}>
						<h1 className="heading--xl">Create your account</h1>
						<p className="copy">
							{copyWithWeirdSyntax}
							<Link to="/login"> Log in </Link>
						</p>
					</div>
					{statusText}
					<form onSubmit={this.handleSubmit} className={formCls}>
						<div className="input-list--register" >
							<div className="half-width-container">
								<div className="half-width">
									<input
										type="text" placeholder="* First Name"
										required name="first_name"
										onChange={this.handleChange}
										className={inputClasses.first_name}
									/>
								</div>
								<div className="half-width">
									<input
										type="text" placeholder="* Last Name"
										required name="last_name"
										onChange={this.handleChange}
										className={inputClasses.last_name}
									/>
								</div>
							</div>
							<div className="full-width">
								<input
									type="email" placeholder="* Email"
									required name="email"
									onChange={this.handleChange}
									className={inputClasses.email}
								/>
							</div>
							<div className="full-width">
								<input
									type="password" placeholder="* Password"
									required name="password" pattern=".{4,}" title="At least 4 characters"
									onChange={this.handleChange}
									className={inputClasses.password}
								/>
							</div>
						</div>

						<input type="submit" label="Sign Up"/>

					</form>
				</section>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	isCreated: state.auth.isCreated,
	isAuthenticating: state.auth.isCreating,
	statusText: state.auth.statusText,
	errorFields: state.auth.errorFields,
});
const mapDispatchToProps = dispatch => ({
	dispatch,
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
