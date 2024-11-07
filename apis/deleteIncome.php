<?php
include "connection";

$id =$_POST["id"];

$query = $connection->prepare("DELETE FROM incomes WHERE id=?");
$query->bind_param("i", $id);
if( $query->execute() == true ){
    $response =[
        "status"=> "success",
        "message"=> "deleted income with id $id"
    ];
    echo json_encode($response);
}else{
    echo "error deleting income";
}