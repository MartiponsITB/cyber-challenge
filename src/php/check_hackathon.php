
<?php
require_once 'config.php';
header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Count completed challenges excluding hackathon
$sql = "SELECT COUNT(*) as completed FROM user_progress up 
        JOIN challenges c ON up.challenge_id = c.id 
        WHERE up.user_id = ? AND up.completed = 1 AND c.id != 'hackathon'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Get total challenges excluding hackathon
$total_sql = "SELECT COUNT(*) as total FROM challenges WHERE id != 'hackathon'";
$total_result = $conn->query($total_sql);
$total_row = $total_result->fetch_assoc();

$is_unlocked = ($row['completed'] >= $total_row['total']);

echo json_encode([
    'success' => true,
    'isUnlocked' => $is_unlocked,
    'completed' => $row['completed'],
    'total' => $total_row['total']
]);

$stmt->close();
$conn->close();
?>
