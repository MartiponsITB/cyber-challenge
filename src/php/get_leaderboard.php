
<?php
require_once 'config.php';
header('Content-Type: application/json');

// Get leaderboard data from the hackathon_timer table
$sql = "SELECT u.username, 
               ht.completion_time_seconds,
               (SELECT COUNT(*) FROM user_progress up WHERE up.user_id = u.id AND up.completed = 1) as challenges_completed,
               (SELECT SUM(c.points) FROM user_progress up 
                JOIN challenges c ON up.challenge_id = c.id 
                WHERE up.user_id = u.id AND up.completed = 1) as total_points
        FROM hackathon_timer ht
        JOIN users u ON ht.user_id = u.id
        WHERE ht.completed_at IS NOT NULL
        ORDER BY ht.completion_time_seconds ASC";

$result = $conn->query($sql);

$leaderboard = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Format time as HH:MM:SS
        $hours = floor($row['completion_time_seconds'] / 3600);
        $minutes = floor(($row['completion_time_seconds'] % 3600) / 60);
        $seconds = $row['completion_time_seconds'] % 60;
        
        $formatted_time = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        
        $leaderboard[] = [
            'name' => $row['username'],
            'challenges' => $row['challenges_completed'],
            'points' => $row['total_points'],
            'time' => $formatted_time,
            'seconds' => $row['completion_time_seconds']
        ];
    }
}

echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);

$conn->close();
?>
