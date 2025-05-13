
<?php
require_once 'config.php';
header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['challenge_id']) || !isset($data['flag'])) {
        echo json_encode(['success' => false, 'message' => 'Missing challenge ID or flag']);
        exit;
    }
    
    $challenge_id = $data['challenge_id'];
    $flag = $data['flag'];
    $user_id = $_SESSION['user_id'];
    
    // Check if flag is correct
    $sql = "SELECT flag FROM challenges WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $challenge_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $challenge = $result->fetch_assoc();
        
        if ($flag === $challenge['flag']) {
            // Update user progress
            $update_sql = "UPDATE user_progress SET completed = 1, completed_at = NOW() WHERE user_id = ? AND challenge_id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("is", $user_id, $challenge_id);
            $update_stmt->execute();
            
            // If this is the hackathon challenge, update the timer
            if ($challenge_id === 'hackathon') {
                // Get the unlocked time
                $timer_sql = "SELECT unlocked_at FROM hackathon_timer WHERE user_id = ?";
                $timer_stmt = $conn->prepare($timer_sql);
                $timer_stmt->bind_param("i", $user_id);
                $timer_stmt->execute();
                $timer_result = $timer_stmt->get_result();
                
                if ($timer_result->num_rows === 1) {
                    $timer_data = $timer_result->fetch_assoc();
                    
                    // Calculate completion time in seconds
                    $completion_sql = "UPDATE hackathon_timer 
                                       SET completed_at = NOW(),
                                           completion_time_seconds = TIMESTAMPDIFF(SECOND, unlocked_at, NOW())
                                       WHERE user_id = ?";
                    $completion_stmt = $conn->prepare($completion_sql);
                    $completion_stmt->bind_param("i", $user_id);
                    $completion_stmt->execute();
                }
            }
            
            echo json_encode(['success' => true, 'message' => 'Flag is correct!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect flag']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Challenge not found']);
    }
    
    $stmt->close();
    $conn->close();
}
?>
