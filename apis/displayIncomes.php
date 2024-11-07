<?php
include "connection.php";

$userId =$_POST["userId"];

$query = $connection->prepare("SELECT id,amount,note FROM incomes WHERE user_id=?");
$query->bind_param("i", $userId);
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