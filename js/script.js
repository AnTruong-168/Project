$(document).on("submit", "#register-form", Register);
$(document).on("submit", "#login-form", Login);
$(document).on("submit", "#addproduct-form", AddProduct);
$(document).on("submit", "#Product-form", ViewDetail);
$("#Products").ready(showProduct_php);
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
                password : $("#password").val()
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

function AddProduct(e)
{
    e.preventDefault();
    if($("#product_category").val()>2 || $("#product_category").val()<0)
    {
        alert("Wrong product category!");
    }
    else
    {
        $.ajax(
            {
                type: "POST",
                url: "../php/addproduct.php",
                data: {
                    product_id : $("#product_id").val(),
                    product_name : $("#product_name").val(),
                    product_price : $("#product_price").val(),
                    product_type : $("#product_category").val(),
                    product_des : $("#product_des").val(),
                    product_img : $("#product_img").val()
                },
                success: function( result ) {
                    result = $.parseJSON(result);
                    
                    if(result.success) {
                        alert("Added product");
                        location.href="home.html";
                    }
                    else {
                        alert("Failed to add new product");
                        location.href="home.html"
                    }
                }
            }
        );
    } 
}

function showProduct_php(){
    $.ajax({
        type: "POST", url: "../php/showproduct.php",
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                ShowAllProduct(result);
            }
            else{
                return;
            }
        }
    });
}
function ShowAllProduct(products){
    $("#Products").empty();

   for(item of products){
       var text = `
                <div id="Product_detail">
<<<<<<< HEAD
                <div><img id="product_img" src="${item.img}" width="auto" height="200px"></img></div>
                    <div id="product_id">
                        <label class="d-flex">Product ID: </label>
                        ${item.id}
                    </div>
                    <div id="product_name">
                        <label>Product Name: </label>
                        ${item.product_name}
                    </div>
                    <div id="product_price">
                        <label>Price: </label>
                        ${item.price}
                    </div>
                <button class="btn btn-success" id="btn-viewdetail">Detail</button>
                <button class="btn btn-warning" id="btn-edit">Edit</button>
=======
                    <form id="Product-form">
                        <div><img id="product_img" src="${item.img}" width="auto" height="200px"></img></div>
                            <div id="product_id">
                                ${item.id}
                            </div>
                            <div id="product_name">
                                ${item.product_name}
                            </div>
                            <div id="product_price">
                                ${item.price}
                            </div>
                        <button type="submit" class="btn btn-success" id="btn-viewdetail">Detail</button>
                        <button class="btn btn-warning" id="btn-edit">Edit</button>
                    </form>
>>>>>>> f85deb6c7bc59c71b4ca836342ffe86448896c2e
                </div> `;
                    
                       $("#Products").append(text);
   }
}
function ViewDetail()
{
    alert("Product ID: "+$("#product_id").val());
}