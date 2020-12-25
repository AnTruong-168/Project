<?php
$username = $_POST['username'];
$product_id = $_POST['product_id'];
$success = false;

include('database.php');

$db = getDB();
if($db) {
    $query = 'CREATE TABLE IF NOT EXISTS cart (username VARCHAR(50) NOT NULL,
                                                id INT NOT NULL)';
    pg_query($query);

    $query = 'ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("username") REFERENCES "account"("username")';

    pg_query($query);

    $query = 'ALTER TABLE "cart" ADD CONSTRAINT "cart_fk1" FOREIGN KEY ("id") REFERENCES "product"("id")';

    pg_query($query);
    if( isset($username) && isset($product_id)) {
        $query = "INSERT INTO cart VALUES ('$username', '$product_id')";
        pg_query($query);
        $success = 1;
    }
}

echo json_encode(array('success' => $success));
?>
