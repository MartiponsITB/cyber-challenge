
<?php
require_once 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }
    
    $username = $data['username'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $email = $data['email'];
    
    // Check if username or email already exists
    $check_sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("ss", $username, $email);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
        exit;
    }
    
    // Insert new user
    $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $email);
    
    if ($stmt->execute()) {
        $user_id = $stmt->insert_id;
        
        // Create progress entries for all challenges
        $challenge_sql = "SELECT id FROM challenges";
        $challenge_result = $conn->query($challenge_sql);
        
        while ($row = $challenge_result->fetch_assoc()) {
            $progress_sql = "INSERT INTO user_progress (user_id, challenge_id, completed) VALUES (?, ?, 0)";
            $progress_stmt = $conn->prepare($progress_sql);
            $progress_stmt->bind_param("is", $user_id, $row['id']);
            $progress_stmt->execute();
        }
        
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $conn->error]);
    }
    
    $stmt->close();
    $conn->close();
}
?>
