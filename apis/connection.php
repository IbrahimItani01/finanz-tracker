<?php

$connection = new mysqli(
    "localhost",
    "root",
    "",
    "finanz_db",
);

if ($connection->connect_error) {
    die("Error connecting with DB". $connection->connect_error);
}