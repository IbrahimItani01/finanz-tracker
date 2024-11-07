<!-- The query to include -->
<!-- INSERT INTO users (name,budget) VALUES ("ibrahim",1000) -->
 <?php

 include("/apis/connection.php");

 $userName = $_POST["name"];
 $budget = $_POST["budget"];

 $queryScript = "INSERT INTO users (name,budget) VALUES ($userName,$budget)";