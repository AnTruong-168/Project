$(document).on("submit", "#register-form", Register);
$(document).on("submit", "#login-form", Login);
$(document).on("submit", "#addproduct-form", AddProduct);
$("#Products").ready(showProduct_php);
var tmp;
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
                <div><img id="product_img" src="${item.img}" width="auto" height="200px"></img></div>
                    <div id="product_id">
                        <tr>
                            <td>ID: </td>
                            <td>${item.id}</td>
                        </tr>
                    </div>
                    <div id="product_name">
                        <tr>
                            <td>Name: </td>
                            <td>${item.pname}</td>
                        </tr>
                    </div>
                    <div id="product_price">
                        <tr>
                            <td>Price: </td>
                            <td>${item.price}</td>
                        </tr>
                    </div>
                <button id="btn-viewdetail" class="btn btn-success" data-product-id='${item.id}' onclick='viewDetail(this)'>Detail</button>
                <button class="btn btn-warning" id="btn-edit">Edit</button>
                </div> `;
                    
                       $("#Products").append(text);
   }
}
function viewDetail(product){
    $("#product_d").empty();
    $("#product_n").empty();
    var ID= product.getAttribute('data-product-id'); //Get value from attribute data-product-id
    $.ajax({
        type: "POST", url: "../php/product_detail.php",
        data: {id: ID},
        success: function(result){
            result = $.parseJSON(result);
	////////////////////////// USE DATA FROM RESULT ///////////////////////////////
            $("#product_d").append(result[0].description);
            $("#product_n").append(result[0].pname);

            document.getElementById("imgchange").src = result[0].img;
            
        }
    });
}