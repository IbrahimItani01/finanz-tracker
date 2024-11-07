<?php
include "connection.php";
$id = $_POST["id"];

$query = $connection->prepare("DELETE FROM users WHERE id=?");
$query->bind_param("i", $id);
if($query->execute()){
    $response = [
        "status"=> "success",
        "message"=> "successfully deleted user with id $id"
    ];
    echo json_encode($response);
}
else{
    echo "Error deleting user with id $id";
}