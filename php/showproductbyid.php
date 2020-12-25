<?php
$product_id = $_POST['product_id'];
include("database.php");
if(getdb()){
    $query="SELECT * FROM products where id = '$product_id'";
    $result=pg_query($query);

    if($result){
        $arr=pg_fetch_all($result);
        echo json_encode($arr); 
    }
}
?>