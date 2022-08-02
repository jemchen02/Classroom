import React from 'react';
export default class Welcome extends React.Component{
	constructor(props) {
		super(props);
		this.handleStudent = this.handleStudent.bind(this);
		this.handleTeacher = this.handleTeacher.bind(this);
	}
	handleStudent() {
		this.props.handleUType("Student");
		this.props.handlePage("LogReg");
	}
	handleTeacher() {
		this.props.handleUType("Teacher");
		this.props.handlePage("LogReg");
	}
	render() {
		return (
			<div>
				<br></br><br></br><br></br><br></br>
				<p class = "welcome">Are you a</p>
				<button class = "welcome" onClick = {this.handleStudent}>Student</button>
				<br></br><br></br><br></br><br></br>
				<button class = "welcome" onClick = {this.handleTeacher}>Teacher</button>
			</div>
		)
	}
}