<?php

include "connection.php";

$id =$_POST["id"];
$amount =$_POST["amount"];
$note =$_POST["note"];
$userId =$_POST["userId"];

$query = $connection->prepare("INSERT INTO incomes VALUES (?,?,?,?)");
$query->bind_param("iisi", $id, $amount, $note, $userId);
if( $query->execute() == TRUE ){
    $response=[
        "status"=> "success",
        "message"=> "added income to DB"
    ];
    echo json_encode($response);
}else{
    echo "failed adding income";
}