<!-- The query to include -->
<!-- INSERT INTO users (name,budget) VALUES ("ibrahim",1000) -->
 <?php

 include "connection.php";

 $userName = $_POST["name"];
 $budget = $_POST["budget"];

$query = $connection->prepare("INSERT INTO users (name, budget) VALUES (?, ?)");
$query->bind_param("si", $userName, $budget);

if($query->execute() === TRUE) {    
    $userId = $connection->insert_id;
    $response = [
        "status"=> "success",
        "message"=> "user: added $userName to DB",
        "userId"=> $userId,
    ];
    echo json_encode( $response );
}else{
    echo "Failed adding user";
}