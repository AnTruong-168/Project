<?php
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt the password.
$fullname = $_POST['fullname'];
$phone = $_POST['phone'];
$birthday = $_POST['DOB'];
$success = false;

include('database.php');

$db = getDB();
if($db) {
    $query = 'CREATE TABLE IF NOT EXISTS account (username VARCHAR(50) PRIMARY KEY,
                                                  password TEXT NOT NULL,
                                                  fullname VARCHAR(50) NOT NULL,
                                                  phone VARCHAR(11),
                                                  birthday DATE)';
    pg_query($query);

    if( isset($username) && isset($password) && isset($fullname) ) {
        $query = "INSERT INTO account VALUES ('$username', '$password', '$fullname',
                                              '$phone', '$birthday')";
        pg_query($query);
        $success = 1;
    }
}

echo json_encode(array('success' => $success));
?>