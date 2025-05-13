
<?php
require_once 'config.php';
header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Check if all challenges except the hackathon are completed
$sql = "SELECT COUNT(*) as total_completed 
        FROM user_progress 
        WHERE user_id = ? AND challenge_id != 'hackathon' AND completed = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Count total challenges excluding hackathon
$total_challenges_sql = "SELECT COUNT(*) as total FROM challenges WHERE id != 'hackathon'";
$total_result = $conn->query($total_challenges_sql);
$total_row = $total_result->fetch_assoc();

$is_unlocked = ($row['total_completed'] >= $total_row['total']);

// If hackathon is unlocked, check if we need to initialize the timer
if ($is_unlocked) {
    // Check if timer entry exists
    $check_timer_sql = "SELECT * FROM hackathon_timer WHERE user_id = ?";
    $check_stmt = $conn->prepare($check_timer_sql);
    $check_stmt->bind_param("i", $user_id);
    $check_stmt->execute();
    $timer_result = $check_stmt->get_result();
    
    // If no timer entry exists and hackathon is unlocked, create one
    if ($timer_result->num_rows == 0) {
        $insert_timer_sql = "INSERT INTO hackathon_timer (user_id, unlocked_at) VALUES (?, NOW())";
        $insert_stmt = $conn->prepare($insert_timer_sql);
        $insert_stmt->bind_param("i", $user_id);
        $insert_stmt->execute();
    }
    
    // Get timer data for the response
    $timer_sql = "SELECT 
                    unlocked_at, 
                    completed_at,
                    TIMESTAMPDIFF(SECOND, unlocked_at, NOW()) as elapsed_seconds,
                    completion_time_seconds
                  FROM hackathon_timer 
                  WHERE user_id = ?";
    $timer_stmt = $conn->prepare($timer_sql);
    $timer_stmt->bind_param("i", $user_id);
    $timer_stmt->execute();
    $timer_data = $timer_stmt->get_result()->fetch_assoc();
    
    echo json_encode([
        'success' => true, 
        'isUnlocked' => $is_unlocked,
        'timerData' => $timer_data
    ]);
} else {
    echo json_encode(['success' => true, 'isUnlocked' => $is_unlocked]);
}

$stmt->close();
$conn->close();
?>
