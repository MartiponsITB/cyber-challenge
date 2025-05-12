
<?php
require_once 'config.php';
header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT c.id, c.title, c.category, c.points, up.completed 
        FROM challenges c
        LEFT JOIN user_progress up ON c.id = up.challenge_id AND up.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$challenges = [];
while ($row = $result->fetch_assoc()) {
    $challenges[] = $row;
}

echo json_encode(['success' => true, 'challenges' => $challenges]);

$stmt->close();
$conn->close();
?>
