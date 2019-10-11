function login() {

    $("#messageWrapper1").html('<center><span class="dashboard-spinner spinner-xs" style="margin-bottom: 10px;"></span></center>');

    setTimeout(function(){

        var username = $("#username").val();
        var password = $("#password").val();
        var submitButton = $("#submitButton");
        
        if (username != "" && password != "") {
            submitButton.prop('disabled', true);
            var formData = {
                username: username,
                password: password,
            }
            $.ajax({
                type: "POST",
                url: "/login",
                data: formData,
                success: function (res) {
                    if(res["message"] != undefined) {
                        if (res.error) {
                            submitButton.prop('disabled', false);
                            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">' + res.message + '</div>');
                        } else {
                            $("#messageWrapper1").html('<div class="alert alert-success" role="alert">' + res.message + ' Please wait.</div>');
                            setTimeout(function(){
                                window.location = '/profile';
                            }, 1500); 
                        }
                    } else {
                        submitButton.prop('disabled', false);
                        $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">' + res + '</div>');
                    }
                    console.log(res);
                },
                error: function (e) {
                    submitButton.prop('disabled', false);
                    $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
                }
            });
        } else {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Please complete the required inputs.</div>');
        }

    }, 700); 

    function scrollUp() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);   
    }

}