$(document).on("submit", "#register-form", Register);

function Register(e)
{
    e.preventDefault();
    if($("#confirm-password").val()===$("#password").val())
    {
        $.ajax(
            {
                type: "POST",
                url: "../php/register.php",
                data: $('register-form').serialize(),
                success: function( result ) {
                    result = $.parseJSON(result);
                    
                    if(result.success) {
                        alert("Registered successfully!");
                        location.href="login.html";
                    }
                    else {
                        alert("Registered unsuccessfully!");
                    }
                }
            }
        );
    }
    else
    {
        alert("Password mismatched!");
    }
}