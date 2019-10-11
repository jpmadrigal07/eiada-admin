const express = require("express");
const app = express();
const http = require('http');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const reload = require('reload');

// REQUIRING ROUTES
const indexRoutes = require("./routes/index");
const profileRoutes = require("./routes/profile");

// LOAD SEED
require('./seed');

const port = process.env.PORT || 3000;

// REDIS SESSION STORAGE

// redisClient.on('error', (err) => {
//     console.log('Redis error: ', err);
// });

// redisClient.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });

app.use(bodyParser.json({
	limit: '50mb'
}));
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(session({
	secret: "Shh, its a secret!",
	name: '_redisPractice',
	resave: false,
	saveUninitialized: true,
	store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 })
}));

app.use("/", indexRoutes);
app.use("/profile", profileRoutes);

// var server = http.createServer(app);

// Reload code here
// reload(app).then(function (reloadReturned) {
// 	server.listen(port, function () {
// 		console.log("EIADA has Started in PORT 3000 http://localhost:3000/");
// 	});
// }).catch(function (err) {
// 	console.error('Reload could not start, could not start server/sample app', err)
// })

app.listen(port, function () {
	console.log("EIADA has Started in PORT 3000 http://localhost:3000/");
});