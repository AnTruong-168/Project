$(document).on("submit", "#register-form", Register);
$(document).on("submit", "#login-form", Login);
$("#Products").ready(ShowAllProduct);
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


function ShowAllProduct(){
    $("#Products").empty();
    var product=[
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"},
        {name:"Pikachu",price:"200.000",img:"https://images-na.ssl-images-amazon.com/images/I/61iWqqcq%2BKL._AC_SL1500_.jpg"}
    ];
   for(item of product ){
       var text = `
                <div id="Product_detail">
                <div><img class="img-fluid" src="${item.img}"></img></div>
                    <div>
                        ${item.name}
                    </div>
                    <div>
                        ${item.price}
                    </div>
                    </div> `;
                    
                       $("#Products").append(text);
   }
}