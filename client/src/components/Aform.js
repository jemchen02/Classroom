import React from 'react';
import axios from 'axios';
export default class Aform extends React.Component {
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}
	handleAnswer() {
		this.setState({message:""});
		var post = true;
		let answer = document.getElementById("yourAns").value;
		try {
			if(answer.trim() == "") throw "You must answer the question.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		if(post) {
			if(answer != this.props.post.answer) window.alert("Incorrect answer");
			else window.alert("Correct!");
			if(!this.props.user.answered.includes(this.props.post._id)) {
				var correct = false;
				if(answer == this.props.post.answer) {
					this.props.user.corrects += 1;
					correct = true;
				}
				this.props.user.answered.push(this.props.post._id);
				const mongoAns = {name:this.props.user.name, content: this.props.post.content, correct:correct};
				console.log(mongoAns);
				axios.post('http://localhost:8000/addAnswered', mongoAns);
			}
			this.props.handlePage("ClassFeed");
			this.props.handlePost("");
		}
	}
	handleBack() {
		this.props.handlePage("ClassFeed");
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
				<p class = "formH">{this.props.post.content}</p>
				<p class = "form">Your Answer</p>
				<input id = "yourAns" type = "text"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handleAnswer}>Answer</button>
				<button class = "form" onClick = {this.handleBack}>back</button>
			</div>
		)
	}
}