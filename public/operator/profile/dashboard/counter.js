function showRegisteredAccountsCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/user?registeredAccounts=all",
        success: function (res) {
            $('#registered-accounts').html(res.message.length);
        },
        error: function (e) {f
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showRegisteredAccountsCounts, 5000);

}

function showOnlinePatientCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/user?loginStatus=Online&roles=Patient",
        success: function (res) {
            $('#online-patients').html(res.message.length);
            console.log(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showOnlinePatientCounts, 5000);

}

function showOnlineSpecialistCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/user?loginStatus=Online&roles=Specialist",
        success: function (res) {
            $('#online-specialist').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showOnlineSpecialistCounts, 5000);

}


function showAvailableSpecialistTodayCounts() {

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/specialistweeklyschedule?weekDay=" + n,
        success: function (res) {
            $('#available-specialist-today').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showOnlineSpecialistCounts, 5000);

}

function showActiveBookingCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/booking?activeCount=all",
        success: function (res) {
            $('#active-booking').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showActiveBookingCounts, 5000);

}

function showWeeklyTransactionCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/booking?weeklyTransactionCount=all",
        success: function (res) {
            $('#weekly-transaction').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showWeeklyTransactionCounts, 5000);

}

function showMonthlyTransactionCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/booking?monthlyTransactionCount=all",
        success: function (res) {
            $('#monthly-transaction').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showMonthlyTransactionCounts, 5000);

}

function showWithdrawRequestCounts() {

    $.ajax({
        type: "GET",
        url: "https://calm-thicket-79937.herokuapp.com/api/v1/withdrawrequests?withdrawRequest=all",
        success: function (res) {
            $('#pending-withdraw-requests').html(res.message.length);
        },
        error: function (e) {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
            scrollUp();
        }
    });

    setTimeout(showWithdrawRequestCounts, 5000);

}

showRegisteredAccountsCounts();
showOnlineSpecialistCounts();
showOnlinePatientCounts();
showActiveBookingCounts();
showWeeklyTransactionCounts();
showMonthlyTransactionCounts();
showAvailableSpecialistTodayCounts();
showWithdrawRequestCounts();