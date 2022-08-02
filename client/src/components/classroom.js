import React from 'react';
import axios from 'axios';
import Welcome from './Welcome.js';
import LogReg from './LogReg.js';
import Login from './Login.js';
import Register from './Register.js';
import Feed from './feed.js';
import ClassForm from './ClassForm.js';
import ClassJoin from './ClassJoin.js';
import ClassFeed from './ClassFeed.js';
import PostForm from './PostForm.js';
import PostQuestion from './PostQuestion.js';
import Aform from './Aform.js';
export default class Classroom extends React.Component{
	constructor(props) {
		super(props);
		this.state = {page:"Welcome", Class:"", uType:"", user:"", post:"", data:{classes:[]}};
		this.handlePage = this.handlePage.bind(this);
		this.handleUType = this.handleUType.bind(this);
		this.handleUser = this.handleUser.bind(this);
		this.handleData = this.handleData.bind(this);
		this.handleClass = this.handleClass.bind(this);
		this.handlePost = this.handlePost.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogout() {
		this.setState({user:""});
		axios.post('http://localhost:8000/logout').then(res => {
			console.log(res);
			this.handlePage("Welcome");
		})
	}
	handlePost(post) {
		this.setState({post:post});
	}
	handleClass(Class) {
		this.setState({Class: Class});
	}
	handlePage(page) {
		this.setState({page: page});
	}
	handleUType(uType) {
		this.setState({uType: uType});
	}
	handleUser(user) {
		this.setState({user: user});
	}
	handleData(data) {
		this.setState({data: data});
	}
	async componentDidMount() {
		axios.defaults.withCredentials = true;
		var posts;
		await axios.get('http://localhost:8000/posts').then(res => {
			posts = res.data;
		}) 
		await axios.get('http://localhost:8000/classes').then(res => {
			let data = this.state.data;
			data.classes = res.data;
			this.setState({data:data});
		})
		var classPosts;
		for(let x of this.state.data.classes) {
			classPosts = [];
			for(let y of posts) {
				if(x.posts.includes(y._id)) {
					classPosts.push(y)
				}
			}
			x.posts = classPosts;
		}
		var data;
		await axios.get('http://localhost:8000/').then(res => {
			data = res.data;
			if(data.loggedIn) {
				this.handleUser(data.user);
				console.log(data.user);
				this.handlePage("Feed");
				this.handleUType(data.user.uType);
			} else {
				this.handlePage("Welcome");
			}
		})
	}
	render() {
		var currPage = null;
			switch(this.state.page) {
				case "Welcome":
					currPage = <Welcome
					handlePage = {this.handlePage}
					handleUType = {this.handleUType} 
					/>;
					break;
				case "LogReg":
					currPage = <LogReg
					handlePage = {this.handlePage}
					/>;
					break;
				case "Login":
					currPage = <Login
					handlePage = {this.handlePage}
					uType = {this.state.uType}
					handleUser = {this.handleUser}
					data = {this.state.data}
					/>;
					break;
				case "Register":
					currPage = <Register
					handlePage = {this.handlePage}
					uType = {this.state.uType}
					data = {this.state.data}
					handleData = {this.handleData}
					/>;
					break;
				case "Feed":
					currPage = <Feed
					handlePage = {this.handlePage}
					handleUser = {this.handleUser}
					handleClass = {this.handleClass}
					handleLogout = {this.handleLogout}
					uType = {this.state.uType}
					user = {this.state.user}
					data = {this.state.data}
					/>;
					break;
				case "ClassForm":
					currPage = <ClassForm
					handlePage = {this.handlePage}
					user = {this.state.user}
					data = {this.state.data}
					handleData = {this.handleData} />;
					break;
				case "ClassJoin":
					currPage = <ClassJoin
					handlePage = {this.handlePage}
					user = {this.state.user}
					data = {this.state.data}
					handleData = {this.handleData} />;
					break;
				case "ClassFeed":
					currPage = <ClassFeed
					handlePage = {this.handlePage}
					Class = {this.state.Class}
					handleClass = {this.handleClass}
					user = {this.state.user}
					data = {this.state.data}
					handleData = {this.handleData}
					handlePost = {this.handlePost}
					uType = {this.state.uType} />;
					break;
				case "PostForm":
					currPage = <PostForm 
					handlePage = {this.handlePage}
					Class = {this.state.Class}
					user = {this.state.user}
					data = {this.state.data}
					handleData = {this.handleData} />;
					break;
				case "PostQuestion":
					currPage = <PostQuestion 
					handlePage = {this.handlePage}
					Class = {this.state.Class}
					user = {this.state.user}
					data = {this.state.data}
					handleData = {this.handleData} />;
					break;
				case "aForm":
					currPage = <Aform
					handlePage = {this.handlePage}
					user = {this.state.user}
					data = {this.state.data}
					post = {this.state.post}
					handlePost = {this.handlePost}
					handleData = {this.handleData} />;
					break;
				default:
					currPage = null;
			}
		return (
			<div id = "main">
				{currPage}
			</div>
		)
	}
}