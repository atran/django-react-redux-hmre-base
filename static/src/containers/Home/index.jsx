import React from 'react';
import Login from './../../components/Login';
import Register from './../../components/Register';

class HomeView extends React.Component {
	render() {
		return (
			<div>
				Hello, world.
				<Register />
				<Login />
			</div>
		);
	}
}

export default HomeView;
