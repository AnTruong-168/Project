<?php
$username = $_POST['username'];

include("database.php");
if(getdb()){
    $query="SELECT * FROM cart where username = '$username'";
    $result=pg_query($query);

    if($result){
        $arr=pg_fetch_all($result);
        echo json_encode($arr); 
    }
}
?>