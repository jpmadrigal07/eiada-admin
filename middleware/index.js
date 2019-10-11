const jwt = require("jsonwebtoken");

var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.session.token == undefined) {
		return next();
	}
	res.redirect("/profile/dashboard");
}

middlewareObj.isLoggedOut = (req, res, next) => {
	if (req.session.token != undefined) {
		return next();
	}
	res.redirect("/login");
}

middlewareObj.setToken = (req, res, next) => {
	let bearerHeader = "";
	if (typeof req.headers['authorization'] !== 'undefined') {
		bearerHeader = req.headers['authorization'];
	} else {
		bearerHeader = req.session.token;
	}
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

middlewareObj.verifyToken = (req, res, next) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
			console.log('yeh');
		} else {
			req.user = authData;
			next();
		}
	});
}

middlewareObj.hasAccess = (role) => {
	return function (req, res, next) {
		if (role != req.user.userRole) {
			res.redirect('/');
		} else next();
	}
}

module.exports = middlewareObj;