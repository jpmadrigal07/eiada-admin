const axios = require("axios");
const config = require("./config");
const moment = require('moment');

var admin = {
    username: "admin",
    password: "admin123",
    email: "admin@admin.com",
    firstName: "Administrator",
    lastName: "Administrator",
    middleName: "Administrator",
    gender: "Male",
    birthDate: moment(),
	roles: "Administrator"
}

axios.get(`${config.devBaseURL}/api/v1/user?roles=Administrator`)
    .then(function (response) {
        if(response.data.message.length == 0) {
            axios.post(`${config.devBaseURL}/api/v1/user`, admin)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });

