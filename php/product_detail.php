<?php
$id = $_POST['id'];
include("database.php");
if(getdb()){
    $query="SELECT * FROM products where id = $id";
    $result=pg_query($query);

    if($result){
        $arr=pg_fetch_all($result);
        echo json_encode($arr); 
    }
}
?>