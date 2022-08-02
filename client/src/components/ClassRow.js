import React from 'react';
export default class ClassRow extends React.Component {
	constructor(props) {
		super(props);
		this.handleClassPage = this.handleClassPage.bind(this);
	}
	handleClassPage() {
		this.props.handlePage("ClassFeed");
		this.props.handleClass(this.props.classs);
	}
	render() {
		if(this.props.uType == "Teacher") {
			return(
				<tr>
					<td><a onClick = {this.handleClassPage} href="#">{this.props.classs.name}</a></td>
					<td>{this.props.classs.students.length}</td>
				</tr>
			)
		} else {
			return(
				<tr>
					<td><a onClick = {this.handleClassPage} href="#">{this.props.classs.name}</a></td>
					<td>{this.props.classs.teacher}</td>
				</tr>
			)
		}
	}
}