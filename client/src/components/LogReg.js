import React from 'react';
export default class LogReg extends React.Component{
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}
	handleLogin() {
		this.props.handlePage("Login");
	}
	handleRegister() {
		this.props.handlePage("Register");
	}
	render() {
		return (
			<div>
				<br></br><br></br><br></br><br></br>
				<button class = "welcome" onClick = {this.handleLogin}>Login</button>
				<br></br><br></br><br></br><br></br>
				<button class = "welcome" onClick = {this.handleRegister}>Register</button>
			</div>
		)
	}
}