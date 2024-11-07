<?php
include "connection.php";

$id =$_POST["id"];

$query = $connection->prepare("SELECT name,budget FROM users WHERE id=?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
if($result->num_rows > 0){
    $array =[];
    while($row = $result->fetch_assoc()){
        $array[] = $row;
    }
    echo json_encode($array);
}else{
    $response=[
        "status"=> "error",
        "message"=> "empty result",
    ];
    echo json_encode($response);
}