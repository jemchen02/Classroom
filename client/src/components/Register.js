import React from 'react';
import axios from 'axios';
export default class Register extends React.Component{
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handleRegister = this.handleRegister.bind(this);
	}
	async handleRegister() {
		this.setState({message:""});
		var post = true;
		let name = document.getElementById("regName").value;
		let username = document.getElementById("regUsername").value;
		let password = document.getElementById("regPassword").value;
		try {
			if(name.trim() == "") throw "You must type a name.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
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
			const mongoRegister = {name: name, username: username, password: password, uType: this.props.uType};
			var confirmPost = false;
			await axios.post('http://localhost:8000/register', mongoRegister).then(res => {
				confirmPost = res.data;
			});
			if(confirmPost == "accepted") {
				this.props.handlePage("Login");
			} else if(confirmPost == "badUser"){
				this.setState(prevState => ({message: prevState.message + "Username already in use"}));
			} else {
				this.setState(prevState => ({message: prevState.message + "Name already in use"}));
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
				<p class = "formH">Register Page</p>
				<p class = "form">Name</p>
				<input id = "regName" type = "text" class = "logReg"></input>
				<p class = "form">Username</p>
				<input id = "regUsername" type = "text" class = "logReg"></input>
				<p class = "form">Password</p>
				<input id = "regPassword" type = "text" class = "logReg"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handleRegister}>Register</button>
			</div>
		)
	}
}