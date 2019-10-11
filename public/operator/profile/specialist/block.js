function blockSpecialist() {

    $("#messageWrapper1").html('<center><span class="dashboard-spinner spinner-xs" style="margin-bottom: 10px;"></span></center>');
    var submitButton = $("#submit-button");
    submitButton.prop('disabled', true);

    setTimeout(function(){

        var specialistID = $("#delete-specialist-id").val();
        var status = $("#delete-specialist-status").val();

        if (specialistID != "") {
            
            var formData = {
                status: status
            };

            $.ajax({
                type: "PUT",
                url: "/profile/specialist/block/" + specialistID,
                data: formData,
                success: function (res) {
                    if(res["message"] != undefined && res["error"] != undefined) {
                        if (res.error) {
                            submitButton.prop('disabled', false);
                            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">' + res.message.message + '</div>');
                            scrollUp();
                        } else {
                            scrollUp();
                            $("#messageWrapper1").html('<div class="alert alert-success" role="alert">' + res.message + ' Please wait.</div>');
                            setTimeout(function(){
                                window.location = '/profile/specialist/lists';
                            }, 1500); 
                        }
                    } else {
                        submitButton.prop('disabled', false);
                        scrollUp();
                        $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">' + res.message + '</div>');
                    }
                    console.log(res);
                },
                error: function (e) {
                    submitButton.prop('disabled', false);
                    $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Error: ' + e + '</div>');
                    scrollUp();    
                }
            });
        } else {
            submitButton.prop('disabled', false);
            $("#messageWrapper1").html('<div class="alert alert-danger" role="alert">Please complete the required inputs.</div>');
            scrollUp();  
        }

    }, 700); 

    function scrollUp() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);   
    }

}