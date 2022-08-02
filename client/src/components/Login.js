import React from 'react';
import axios from 'axios';
export default class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handleLogin = this.handleLogin.bind(this);
	}
	async handleLogin() {
		this.setState({message:""});
		var post = true;
		let username = document.getElementById("logUsername").value;
		let password = document.getElementById("logPassword").value;
		try {
			if(username.trim() == "") throw "You must type a username.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		try {
			if(password.trim() == "") throw "You must type a password.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		if(post) {
			const mongoLogin = {username: username, password: password, uType: this.props.uType}
			var serverMessage = "";
			await axios.post('http://localhost:8000/login', mongoLogin).then(res => {
				serverMessage = res.data;	
			})
			if(serverMessage != "Username not registered.-" && serverMessage != "Incorrect password.-") {
				this.props.handleUser(serverMessage);
				this.props.handlePage("Feed");
			} else {
				this.setState(prevState => ({message: prevState.message + serverMessage}));
			}
		}
	}
	render() {
		var messageLog = [];
		let messages = this.state.message.split("-");
		for(let x of messages) {
			if(x.length > 1) {
				messageLog.push(<message>{x}</message>);
				messageLog.push(<br></br>);
			}
		}
		return (
			<div>
				{messageLog}
				<br></br>
				<p class = "formH">Login Page</p>
				<p class = "form">Username</p>
				<input id = "logUsername" type = "text" class = "logReg"></input>
				<p class = "form">Password</p>
				<input id = "logPassword" type = "text" class = "logReg"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handleLogin}>Login</button>
			</div>
		)
	}
}