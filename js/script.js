$(document).on("submit", "#register-form", Register);
$(document).on("submit", "#login-form", Login);
$(document).on("click", "#Check-email", CheckEmail);
function Register(e)
{
    e.preventDefault();
    if($("#confirm-password").val()===$("#password").val())
    {
        $.ajax(
            {
                type: "POST",
                url: "../php/register.php",
                data: {
                    username : $("#username").val(),
                    password : $("#password").val(),
                    fullname : $("#fullname").val(),
                    phone : $("#phone").val(),
                    birthday : $("#DOB").val()
                },
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

function Login(e)
{
    e.preventDefault();
    $.ajax(
        {
            type: "POST",
            url: "../php/login.php",
            data: {
                username : $("#username").val(),
                password : $("#password").val(),
            },
            success: function( result ) {
                result = $.parseJSON(result);
                
                if(result.success) {
                    alert("Login successfully!");
                    location.href="home.html";
                }
                else {
                    alert("Login failed!");
                }
            }
        }
    );
}
function Testing(e)
{
    e.preventDefault();
    if($("#confirm-password").val()===$("#password").val())
    {
        alert("Registered successfully"+"\nUsername: "+$("#username").val()+"\nPassword: "+$("#password").val());
    }
    else
    {
        alert("Password missmatch!")
    }
}