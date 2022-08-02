import React from 'react';
export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.handleAnswer = this.handleAnswer.bind(this);
	}
	handleAnswer() {
		this.props.handlePage("aForm");
		this.props.handlePost(this.props.post);
	}
	render() {
		let ansB = [];
		if(this.props.post.answer != "" && this.props.uType == "Student") {
			ansB.push(<br></br>);
			ansB.push(<button onClick = {this.handleAnswer}>Answer Question</button>);
		}
		return(
			<tr>
				<td class = "post">
					{this.props.post.content}
					{ansB}
				</td>
				<td class = "name">Posted By {this.props.post.postedBy}</td>
			</tr>
		)
	}
}