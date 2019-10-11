function editSpecialist() {

    $("#messageWrapper2").html('<center><span class="dashboard-spinner spinner-xs" style="margin-bottom: 10px;"></span></center>');
    var submitButton = $("#edit-button");
    submitButton.prop('disabled', true);

    setTimeout(function(){

        var specialistID = $('#edit-specialist-id').val();
        var firstName = $('#edit-first-name').val();
        var middleName = $('#edit-middle-name').val();
        var lastName = $('#edit-last-name').val();
        var email = $('#edit-email').val();
        var username = $('#edit-username').val();
        var password = $('#edit-password').val();
        var gender = $('#edit-gender').val();
        var roles = $('#edit-roles').val();
        var birthDate = $('#datetimepicker').val();
        
        
        if (specialistID != "" && firstName != "" && middleName != "" && lastName != "" && email != "" && username != "" && password != "" && gender != "" && birthDate != "" && roles != "") {
            submitButton.prop('disabled', true);

            var formData = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                gender: gender,
                birthDate: birthDate,
                roles: roles
            };

            console.log(roles);

            $.ajax({
                type: "PUT",
                url: "/profile/specialist/edit/" + specialistID,
                data: formData,
                success: function (res) {
                    if(res["message"] != undefined && res["error"] != undefined) {
                        if (res.error) {
                            submitButton.prop('disabled', false);
                            $("#messageWrapper2").html('<div class="alert alert-danger" role="alert">' + res.message.message + '</div>');
                            scrollUp();
                        } else {
                            scrollUp();
                            $("#messageWrapper2").html('<div class="alert alert-success" role="alert">' + res.message + ' Please wait.</div>');
                            setTimeout(function(){
                                window.location = '/profile/specialist/lists';
                            }, 1500); 
                        }
                    } else {
                        submitButton.prop('disabled', false);
                        scrollUp();
                        $("#messageWrapper2").html('<div class="alert alert-danger" role="alert">' + res.message + '</div>');
                    }
                    console.log(res);
                },
                error: function (e) {
                    submitButton.prop('disabled', false);
                    $("#messageWrapper2").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
                    scrollUp();    
                }
            });
        } else {
            submitButton.prop('disabled', false);
            $("#messageWrapper2").html('<div class="alert alert-danger" role="alert">Please complete the required inputs.</div>');
            scrollUp();  
        }

    }, 700); 

    function scrollUp() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);   
    }

}