const userModel = require('./models/users.js');
const classModel = require('./models/classes.js');
const postModel = require('./models/posts.js');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
var cors = require('cors');
const port = 8000;
let mongoose = require('mongoose')
let mongoDB = "mongodb://127.0.0.1:27017/classroom";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
	credentials: true
}));
app.use(session({
	secret: "asecretkey5192",
	cookie: {maxAge: 600000},
	resave: false,
	saveUninitialized: false
}));

app.post('/register', async (req, res) => {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	const uType = req.body.uType;
	const usernameSearch = await userModel.find({username:username});
	const nameSearch = await userModel.find({name:name});
	if(usernameSearch.length >= 1) {
		res.send("badUser");
	} else if(nameSearch.length >= 1) {
		res.send("badName");
	} else {
		bcrypt.hash(password, saltRounds, async function(err, hash) {
			if(err) console.log(err);
			const info = {name:name, username:username, password:hash, uType:uType, answered:[], corrects:0};
			const newUser = new userModel(info);
			await newUser.save();
			res.send("accepted");
		})
	}
})
app.post('/login', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const uType = req.body.uType;
	userModel.findOne({username:username, uType:uType}, (err, user) => {
		if(err) console.log(err);
		else if(!user) {
			res.send("Username not registered.-");
		}
		else bcrypt.compare(password, user.password, function(err, result) {
			if(err) console.log(err);
			if(result == true) {
				req.session.user = {name: user.name, answered:user.answered, uType: user.uType, corrects:user.corrects};
				res.send({name:user.name, answered:user.answered, uType: user.uType, corrects:user.corrects});
			} else {
				res.send("Incorrect password.-");
			}
		})
	})
})
app.get('/', async (req, res) => {
	if(req.session.user) {
		const user = await userModel.findOne({name:req.session.user.name});
		res.send({loggedIn: true, user: {name:user.name, answered:user.answered, uType: user.uType, corrects:user.corrects}});
	} else {
		res.send({loggedIn: false});
	}
});
app.post('/logout', (req,res) => {
	req.session.destroy(err => {
		if(err) console.log(err);
		res.redirect("/")
	})
})
app.get('/classes', (req, res) => {
	classModel.find({}, (err, result) => {
		if(err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
})
app.get('/posts', (req, res) => {
	postModel.find({}, (err, result) => {
		if(err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
})
app.post('/addClass', async (req,res) => {
	const newClass = new classModel(req.body);
	await newClass.save();
	res.json(newClass);
})
app.post('/joinStudent', async (req) => {
	const student = req.body.student;
	const className = req.body.className;
	await classModel.updateOne({name: className}, {$push: {students:student}});
	
})
app.post('/addPost', async (req, res) => {
	const postedBy = req.body.postedBy;
	const content = req.body.content;
	const answer = req.body.answer;
	const className = req.body.className;
	const newPost = new postModel({postedBy:postedBy, content:content, answer:answer});
	await newPost.save()
	await classModel.updateOne({name: className},{$push:{posts:newPost}});
	res.json(newPost);
	
})
app.post('/incrCorrect', async (req, res) => {
	const name = req.body.name;
	await userModel.updateOne({name:name},{$inc:{corrects:1}});
})
app.post('/addAnswered', async (req) => {
	const name = req.body.name;
	const content = req.body.content;
	const correct = req.body.correct;
	console.log(req.body);
	const post = await postModel.findOne({content:content});
	await userModel.updateOne({name:name},{$push:{answered:post}});
	if(correct) {
		await userModel.updateOne({name:name},{$inc:{corrects:1}});
	}
})
app.listen(port, () => {
  console.log('App listening on port 8000')
})
process.on('SIGINT', () => {
	if(db) {
		db.close().then(() => {console.log('Server closed. Database instance disconnected');
			process.exit(0);
			}).catch((err) => console.log(err));
	}
})