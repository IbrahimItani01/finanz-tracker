<?php
include "connection.php";
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

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