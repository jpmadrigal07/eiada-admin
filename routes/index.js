const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");
const middleware = require("../middleware");
const config = require("../config");

router.get(["/", "/login"], middleware.isLoggedIn, function (req, res) {
	res.render("index/login", { pageTitle: 'EIADA - Login' });
});

router.post("/login", function (req, res) {
	axios.post(`${config.devBaseURL}/api/v1/user/session`, {
		username: req.body.username,
        password: req.body.password,
	  })
	  .then(function (response) {
		req.session.token = 'Bearer ' + response.data.token;
		res.send(response.data);
	  })
	  .catch(function (error) {

	  });
});

router.get("/logout", function (req, res) {
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;