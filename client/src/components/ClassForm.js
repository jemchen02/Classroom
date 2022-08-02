import React from 'react';
import axios from 'axios';
export default class ClassForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handleClassCreate = this.handleClassCreate.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}
	async handleClassCreate() {
		this.setState({message:""});
		var post = true;
		let name = document.getElementById("className").value;
		try {
			if(name.trim() == "") throw "You must name your class.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		if(post) {
			const mongoClass = {name: name, teacher: this.props.user.name, students:[], posts:[]};
			await axios.post('http://localhost:8000/addClass', mongoClass).then(res => {
				console.log("done");
			});
			const newClass = {name: name, teacher: this.props.user.name, students:[], posts:[]};
			let data = this.props.data;
			var found = false;
			for(let x of data.classes) {
				if(x.name == name) {
					found = true;
					this.setState(prevState => ({message: prevState.message + "Class name already in use.-"}))
					break;
				}
			}
			if(!found) {
				data.classes.push(newClass);
				this.props.handleData(data);
				this.props.handlePage("Feed");
			}
		}
	}
	handleBack() {
		this.props.handlePage("Feed");
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
				<p class = "formH">Create Class</p>
				<p class = "form">Class Name</p>
				<input id = "className" type = "text"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handleClassCreate}>Create</button>
				<button class = "form" onClick = {this.handleBack}>back</button>
			</div>
		);
	}
}