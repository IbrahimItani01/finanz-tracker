<?php
include "connection.php";

$id =$_POST["id"];

$query = $connection->prepare("DELETE FROM expenses WHERE id=?");
$query->bind_param("i", $id);
if( $query->execute() == true ){
    $response =[
        "status"=> "success",
        "message"=> "deleted expense with id $id"
    ];
    echo json_encode($response);
}else{
    echo "error deleting expense";
}