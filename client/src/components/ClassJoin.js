import React from 'react';
import axios from 'axios';
export default class ClassJoin extends React.Component{
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handleClassJoin = this.handleClassJoin.bind(this);
	}
	async handleClassJoin() {
		this.setState({message:""});
		var post = true;
		let name = document.getElementById("classJoinName").value;
		try {
			if(name.trim() == "") throw "You must name the class you wish to join.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		if(post) {
			let data = this.props.data;
			var found = false;
			for(let x of data.classes) {
				if(x.name == name) {
					found = true;
					if(x.students.includes(this.props.user)) {
						this.setState(prevState => ({message: prevState.message + "You are already in this class.-"}))
					} else {
						x.students.push(this.props.user.name);
						this.props.handleData(data);
						let mongoJoin = {className:x.name, student: this.props.user.name};
						axios.post('http://localhost:8000/joinStudent', mongoJoin);
						this.props.handlePage("Feed");
					}
					break;
				}
			}
			if(!found) {
				this.setState(prevState => ({message: prevState.message + "No class with that name exists.-"}))
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
		return(
			<div>
				{messageLog}
				<br></br>
				<p class = "formH">Join Class</p>
				<p class = "form">Class Name</p>
				<input id = "classJoinName" type = "text"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handleClassJoin}>Join Class</button>
			</div>
		);
	}
}