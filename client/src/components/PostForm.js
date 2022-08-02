import React from 'react';
import axios from 'axios';
export default class PostForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {message:""}
		this.handlePostCreate = this.handlePostCreate.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}
	async handlePostCreate() {
		this.setState({message:""});
		var post = true;
		let content = document.getElementById("postContent").value;
		try {
			if(content.trim() == "") throw "You must write something in your post.-"
		}
		catch(err) {
			this.setState(prevState => ({message: prevState.message + err}));
			post = false;
		}
		if(post) {
			var newPost;
			const mongoPost = {postedBy: this.props.user.name, content:content, answer:"", className: this.props.Class.name}
			await axios.post('http://localhost:8000/addPost', mongoPost).then(res => {
				newPost = res.data;
			});
			let data = this.props.data;
			for(let x of data.classes) {
				if(x.name == this.props.Class.name) {
					x.posts.push(newPost);
					this.props.handleData(data);
					this.props.handlePage("ClassFeed");
					break;
				}
			}
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
				<p class = "formH">New Post</p>
				<p class = "form">Post Contents</p>
				<input id = "postContent" type = "text"></input>
				<br></br>
				<br></br>
				<button class = "form" onClick = {this.handlePostCreate}>Post</button>
				<button class = "form" onClick = {this.handleBack}>back</button>
			</div>
		);
	}
}