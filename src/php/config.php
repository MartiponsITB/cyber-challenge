
<?php
// Database connection
$host = "localhost";
$user = "root";
$password = "";
$database = "cyber_challenge";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
