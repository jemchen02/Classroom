import React from 'react';
import ClassRow from './ClassRow.js';
export default class FeedT extends React.Component{
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleCreateClass = this.handleCreateClass.bind(this);
		this.handleJoinClass = this.handleJoinClass.bind(this);
	}
	async handleLogout() {
		this.props.handleLogout();
	}
	async handleCreateClass() {
		this.props.handlePage("ClassForm");
	}
	async handleJoinClass() {
		this.props.handlePage("ClassJoin");
	}
	render() {
		if(this.props.uType == "Teacher") {
			let rows = [];
			for(let x of this.props.data.classes) {
				if(x.teacher == this.props.user.name)
					rows.push(<ClassRow handlePage = {this.props.handlePage} handleClass = {this.props.handleClass} data = {this.props.data} classs = {x} uType = {this.props.uType}/>)
			}
			return (
				<div>
					<p>Welcome, {this.props.user.name}</p>
					<button onClick = {this.handleLogout}>Logout</button>
					<br></br>
					<table>
						<thead><tr>
							<th class = "left">Class Name</th>
							<th class = "right">Number of Students</th>
						</tr></thead>
					<tbody>{rows}</tbody>
					
					</table>
					<button onClick = {this.handleCreateClass}>Create Class</button>
				</div>
			)
		} else {
			let rows = [];
			for(let x of this.props.data.classes) {
				if(x.students.includes(this.props.user.name)) {
					rows.push(<ClassRow handlePage = {this.props.handlePage} handleClass = {this.props.handleClass} data = {this.props.data} classs = {x} uType = {this.props.uType}/>)
				}
			}
			return (
				<div>
					<p>Welcome, {this.props.user.name}</p>
					<button onClick = {this.handleLogout}>Logout</button>
					<br></br>
					<table>
						<thead><tr>
							<th class = "left">Class Name</th>
							<th class = "right">Teacher</th>
						</tr></thead>
					<tbody>{rows}</tbody>
					
					</table>
					<button onClick = {this.handleJoinClass}>Join Class</button>
				</div>
			)
		}
	}
}