 <?php


 include "connection.php";
 $data = json_decode(file_get_contents("php://input"), true);

 $userName = $data["name"];
 $budget = $data["budget"];

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
exit; // Ensures no other output is sent
