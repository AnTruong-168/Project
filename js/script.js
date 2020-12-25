$(document).on("submit", "#register-form", Register);
$(document).on("submit", "#login-form", Login);
$(document).on("submit", "#addproduct-form", AddProduct);
$("#Products").ready(showProduct_php);
$("#cart_products").ready(showCart_php);
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
                    var user= $("#username").val();
                    localStorage.setItem("user",user);
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
                <div class="col-sm" id="Product_detail">
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
                            <td> VND</td>
                        </tr>
                    </div>
                <button id="btn-viewdetail" class="btn btn-success" data-product-id='${item.id}' onclick='viewDetail(this)'>Detail</button>
                <button data-product-id='${item.id}' onclick='addtoCart(this)' class="btn btn-warning" id="btn-addcart">Add to Cart</button>
                </div> `;
                    
                       $("#Products").append(text);
   }
}
function viewDetail(product){
    $("#product_d").empty();
    $("#product_n").empty();
    $("#product_p").empty();
    var ID= product.getAttribute('data-product-id'); //Get value from attribute data-product-id
    $.ajax({
        type: "POST", url: "../php/product_detail.php",
        data: {id: ID},
        success: function(result){
            result = $.parseJSON(result);
    ////////////////////////// USE DATA FROM RESULT ///////////////////////////////
            $("#product_d").append(result[0].pdes);
            $("#product_n").append(result[0].pname);
            $("#product_p").append(result[0].price+" VND");
            document.getElementById("imgchange").src = result[0].img;
        }
    });
}

function addtoCart(product)
{
    var ID= product.getAttribute('data-product-id');
    var user = localStorage.getItem("user");
    $.ajax({
            type: "POST",
            url:  "../php/addtoCart.php",
            data:
            {
                username: user,
                product_id: ID
            },
            success: function(result){
                result = $.parseJSON(result);
                if(result.success) {
                    alert("Added to Cart");
                }
                else {
                    alert("Failed to add item to Cart");
                }
            }
    });
}
function showCart_php()
{
    var user = localStorage.getItem("user");
    $.ajax({
        type: "POST", 
        url: "../php/showcart.php",
        data: 
        {
            username: user
        },
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                ShowCart(result);
            }
            else{
                return;
            }
        }
    });
}
function ShowCart(products){
    

   for(item of products){
       $.ajax({
          type: "POST",
          url: "../php/showproductbyid.php",
          data:
          {
              product_id: item.id
          },
          success: function(result){
              result = $.parseJSON(result);
              var divimg = document.createElement("div");
              divimg.id = "cart_product_img";
              var img = document.createElement("img");
              img.id = "img_link";
              divimg.appendChild(img);
              

              var divname = document.createElement("div");
              divname.id = "cart_product_name";
              
              var divprice = document.createElement("div");
              divprice.id = "cart_product_price";
              
              var divcartproduct = document.getElementById("cart_products");
              divcartproduct.appendChild(divimg);
              divcartproduct.appendChild(divname);
              divcartproduct.appendChild(divprice);
              document.getElementById('img_link').src(result[0].img);
              divprice.appendChild(result[0].price);
              divname.appendChild(result[0].pname);
              
          }
       });
   }
}
function logout()
{
    localStorage.removeItem("user");
}