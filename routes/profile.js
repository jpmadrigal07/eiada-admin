const express = require("express");
const router = express.Router({
    mergeParams: true
});
const axios = require("axios");
const middleware = require("../middleware");
const config = require("../config");
const moment = require('moment');

router.get("/", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    res.redirect("/profile/dashboard");
});

router.get("/dashboard", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {        
    res.render("profile/dashboard", {
        pageTitle: 'EIADA - Dashboard',
        pageName: 'Dashboard',
        pageSubName: '',
        moment: moment
    });
});

router.get("/patient", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    res.redirect("/profile/patient/lists");
});

router.get("/patient/lists", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/user?roles=Patient`)
        .then(function (foundPatient) {
            // handle success
            res.render("profile/patient/lists", {
                pageTitle: 'EIADA - Patients',
                pageName: 'Patients',
                pageSubName: '',
                filter: '',
                patient: foundPatient.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/patient/family-members/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/familymember?patientID=${req.params.id}`)
        .then(function (foundFamilyMembers) {
            // handle success
            res.render("profile/patient/familyMembers", {
                pageTitle: 'EIADA - Family Members',
                pageName: 'Patients',
                pageSubName: 'Family Members',
                familyMembers: foundFamilyMembers.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/patient/booking-addresses/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/address?userID=${req.params.id}`)
        .then(function (foundBookingAddresses) {
            // handle success
            res.render("profile/patient/bookingAddresses", {
                pageTitle: 'EIADA - Booking Addresses',
                pageName: 'Patients',
                pageSubName: 'Booking Addresses',
                bookingAddresses: foundBookingAddresses.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/patient/bookings/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?patientID=${req.params.id}`)
        .then(function (foundPatientBookings) {
            // handle success
            res.render("profile/patient/bookings", {
                pageTitle: 'EIADA - Patient Bookings',
                pageName: 'Patients',
                pageSubName: 'Bookings',
                bookings: foundPatientBookings.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/patient/lists/:search", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/user?search=${req.params.search}&roles=Patient`)
        .then(function (foundPatient) {
            // handle success
            res.render("profile/patient/lists", {
                pageTitle: 'EIADA - Patients',
                pageName: 'Patients',
                pageSubName: '',
                filter: req.params.search,
                patient: foundPatient.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/patient/add-new", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    res.render("profile/patient/addNew", {
        pageTitle: 'EIADA - Add Patient',
        pageName: 'Add Patient',
        pageSubName: '',
        moment: moment
    });
});

router.post("/patient", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.post(`${config.devBaseURL}/api/v1/user`, req.body)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.send(error);
    });
});

router.put("/patient/edit/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/user/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

router.put("/patient/block/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/user/block/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});



router.get("/specialist", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    res.redirect("/profile/specialist/lists");
});

router.get("/specialist/lists", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/user?roles=Specialist`)
        .then(function (foundSpecialist) {
            // handle success
            res.render("profile/specialist/lists", {
                pageTitle: 'EIADA - Specialists',
                pageName: 'Specialists',
                pageSubName: '',
                filter: '',
                specialist: foundSpecialist.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/expertise/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/specialistexpertise?specialistID=${req.params.id}`)
        .then(function (foundSpecialistExpertise) {
            // handle success
            res.render("profile/specialist/expertise", {
                pageTitle: 'EIADA - Specialists Expertise',
                pageName: 'Specialists',
                pageSubName: 'Expertise',
                expertise: foundSpecialistExpertise.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/bookings/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?specialistID=${req.params.id}`)
        .then(function (foundSpecialistBookings) {
            // handle success
            res.render("profile/specialist/bookings", {
                pageTitle: 'EIADA - Specialists Bookings',
                pageName: 'Specialists',
                pageSubName: 'Bookings',
                bookings: foundSpecialistBookings.data.message,
                moment: moment
            });
            console.log(foundSpecialistExpertise.data.message);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/withdrawal-requests/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/withdrawrequests?specialistID=${req.params.id}`)
        .then(function (foundWithdrawRequests) {
            // handle success
            res.render("profile/specialist/withdrawRequests", {
                pageTitle: 'EIADA - Specialists Expertise',
                pageName: 'Specialists',
                pageSubName: 'Withdraw Requests',
                withdrawRequest: foundWithdrawRequests.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/lists/:search", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/user?search=${req.params.search}&roles=Specialist`)
        .then(function (foundSpecialist) {
            // handle success
            res.render("profile/specialist/lists", {
                pageTitle: 'EIADA - Specialists',
                pageName: 'Specialists',
                pageSubName: '',
                filter: req.params.search,
                specialist: foundSpecialist.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/bookings/:specialistID", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/user?search=${req.params.search}&roles=Specialist`)
        .then(function (foundSpecialist) {
            // handle success
            res.render("profile/specialist/bookings", {
                pageTitle: 'EIADA - Specialists',
                pageName: 'Specialists',
                pageSubName: '',
                filter: req.params.search,
                specialist: foundSpecialist.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/specialist/add-new", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    res.render("profile/specialist/addNew", {
        pageTitle: 'EIADA - Add Specialist',
        pageName: 'Add Specialist',
        pageSubName: '',
        moment: moment
    });
});

router.post("/specialist", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.post(`${config.devBaseURL}/api/v1/user`, req.body)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.send(error);
    });
});

router.put("/specialist/edit/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/user/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

router.put("/specialist/approve/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/user/approve/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

router.put("/specialist/block/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/user/block/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

router.get("/withdrawal-requests", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/withdrawrequests`)
        .then(function (foundWithdrawRequests) {
            // handle success
            res.render("profile/withdrawalRequests", {
                pageTitle: 'EIADA - Withdrawal Requests',
                pageName: 'Withdrawal Requests',
                pageSubName: '',
                filter: '',
                withdrawRequest: foundWithdrawRequests.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/withdrawal-requests/:filter", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/withdrawrequests?withdrawRequest=${req.params.filter}`)
        .then(function (foundWithdrawRequests) {
            // handle success
            res.render("profile/withdrawalRequests", {
                pageTitle: 'EIADA - Withdrawal Requests',
                pageName: 'Withdrawal Requests',
                pageSubName: '',
                filter: '',
                withdrawRequest: foundWithdrawRequests.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.put("/withdrawal-requests/approve/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
        axios.put(`${config.devBaseURL}/api/v1/withdrawrequests/approve/${req.params.id}`, req.body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

router.put("/withdrawal-requests/decline/:id", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.put(`${config.devBaseURL}/api/v1/withdrawrequests/decline/${req.params.id}`, req.body)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.send(error);
    });
});

router.get("/payment-history", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?paymentHistory=all`)
        .then(function (foundPayment) {
            // handle success
            res.render("profile/paymentHistory", {
                pageTitle: 'EIADA - History of Payment',
                pageName: 'History of Payment',
                pageSubName: '',
                filter: '',
                paymentHistory: foundPayment.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/payment-history/:filter", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?paymentHistory=${req.params.filter}`)
        .then(function (foundPayment) {
            // handle success
            res.render("profile/paymentHistory", {
                pageTitle: 'EIADA - History of Payment',
                pageName: 'History of Payment',
                pageSubName: '',
                filter: req.params.filter,
                paymentHistory: foundPayment.data.message,
                moment: moment
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/booking-history", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?bookingHistory=all`)
        .then(function (foundBooking) {
            // handle success
            res.render("profile/bookingHistory", {
                pageTitle: 'EIADA - History of Booking',
                pageName: 'History of Booking',
                pageSubName: '',
                filter: '',
                bookingHistory: foundBooking.data.message,
                moment: moment
            });

            console.log(foundBooking.data.message);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

router.get("/booking-history/:filter", middleware.isLoggedOut, middleware.setToken, middleware.verifyToken, middleware.hasAccess('Administrator'), function (req, res) {
    axios.get(`${config.devBaseURL}/api/v1/booking?bookingHistory=${req.params.filter}`)
        .then(function (foundBooking) {
            // handle success
            res.render("profile/bookingHistory", {
                pageTitle: 'EIADA - History of Booking',
                pageName: 'History of Booking',
                pageSubName: '',
                filter: req.params.filter,
                bookingHistory: foundBooking.data.message,
                moment: moment
            });

            console.log(foundBooking.data.message);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

module.exports = router;