 <?php


 include "connection.php";
//  $data = json_decode(file_get_contents("php://input"), true);

//  $userName = $data["name"];
//  $password = $data["password"];
//  $budget = $data["budget"];
$userName = $_POST["name"];
$password = $_POST["password"];
$budget = $_POST["budget"];

$hashed = password_hash($password,PASSWORD_DEFAULT);
$checkUserExist = $connection->prepare("SELECT password from users where name=?");
$checkUserExist->bind_param( "s", $userName);
$checkUserExist->execute();
$result = $checkUserExist->get_result();
if ($result->num_rows> 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row["password"]);
}

// $query = $connection->prepare("INSERT INTO users (name, budget, password) VALUES (?, ?,?)");
// $query->bind_param("sis", $userName, $budget,$hashed);

// if($query->execute() === TRUE) {    
//     $userId = $connection->insert_id;
//     $response = [
//         "status"=> "success",
//         "message"=> "user: added $userName to DB",
//         "userId"=> $userId,
//         "password is"=> $hashed,
//     ];
//     echo json_encode( $response );
// }else{
//     echo "Failed adding user";
// }
// exit; // Ensures no other output is sent
