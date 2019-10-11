function declineWithdrawRequest() {

    $("#messageWrapper2").html('<center><span class="dashboard-spinner spinner-xs" style="margin-bottom: 10px;"></span></center>');
    var submitButton = $("#submit-button");
    submitButton.prop('disabled', true);

    setTimeout(function(){

        var withdrawRequestID = $("#decline-withdraw-request-id").val();
        var reason = $("#decline-withdraw-request-reason").val();

        if (withdrawRequestID != "") {
            
            var formData = {
                declineReason: reason
            };

            $.ajax({
                type: "PUT",
                url: "/profile/withdrawal-requests/decline/" + withdrawRequestID,
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
                                location.reload();
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