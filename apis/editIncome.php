<?php

include "connection.php";

$id =$_POST["id"];
$amount =$_POST["amount"];
$note =$_POST["note"];

$query = $connection->prepare("UPDATE incomes SET amount =?,note =? WHERE id =?");
$query->bind_param("isi",  $amount, $note,$id);
if($query->execute()){
    $response = [
        "status"=> "success",
        "message"=> "edited income"
    ];
    echo json_encode($response);
}else{
    echo "Error editing income";
}