import React from 'react';
import Post from './Post.js';
export default class ClassFeed extends React.Component {
	constructor(props) {
		super(props);
		this.handleReturn = this.handleReturn.bind(this);
		this.handleNewQuestion = this.handleNewQuestion.bind(this);
		this.handleNewPost = this.handleNewPost.bind(this);
	}
	handleNewPost() {
		this.props.handlePage("PostForm");
	}
	handleNewQuestion() {
		this.props.handlePage("PostQuestion");
	}
	handleReturn() {
		this.props.handlePage("Feed");
		this.props.handleClass("");
	}
	render() {
		console.log(this.props.user);
		let rows = [];
		for(let x of this.props.Class.posts) {
			rows.push(<Post post = {x} uType = {this.props.uType} handlePage = {this.props.handlePage} handlePost = {this.props.handlePost}/>)
		}
		let question = [];
		var GPA;
		if(this.props.user.answered.length == 0) GPA = "N/A";
		else GPA = (this.props.user.corrects/this.props.user.answered.length) * 100 + "%";
		
		if(this.props.uType == "Teacher") question.push(<button onClick = {this.handleNewQuestion}>New Question</button>)
		else question.push(<p>GPA: {GPA}</p>)
		return(<div>
				<p>Welcome to {this.props.Class.name}</p>
				{question}
				<button onClick = {this.handleNewPost}>New Post</button>

				<br></br>
				<table>
					<tbody>{rows}</tbody>
					</table>
				<br></br>
				<button onClick = {this.handleReturn}>back</button>
			</div>
		)

	}
}