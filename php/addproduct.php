<?php
$product_id = $_POST['product_id'];
$product_name = $_POST['product_name'];
$product_des = $_POST['product_des'];
$product_price = $_POST['product_price'];
$product_img = $_POST['product_img'];
$success = false;

include('database.php');

$db = getDB();
if($db) {
    $query = 'CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY ,
                                                   product_name VARCHAR(255) NOT NULL,
                                                   product_description TEXT NOT NULL,
                                                   price INT NOT NULL,
                                                   img TEXT NOT NULL)';
    pg_query($query);

    if( isset($product_id) && isset($product_name) && isset($product_price) ) {
        $query = "INSERT INTO products VALUES ('$product_id', '$product_name', '$product_des',
                                              '$product_price', '$product_img')";
        pg_query($query);
        $success = 1;
    }
}

echo json_encode(array('success' => $success));
?>






?>