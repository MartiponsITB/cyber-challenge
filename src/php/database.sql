
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS cyber_challenge;
USE cyber_challenge;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    flag VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    points INT NOT NULL
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    user_id INT,
    challenge_id VARCHAR(20),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    PRIMARY KEY (user_id, challenge_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

-- Insert the challenge data
INSERT INTO challenges (id, title, flag, category, points) VALUES
('net-001', 'Repte de Xarxes', '853212745123:)', 'Xarxes', 500),
('sql-001', 'Atac SQL', '849351789513', 'Web', 750),
('exploit-001', 'Atac amb Exploit', '697425642756476', 'Exploit', 600),
('defense-001', 'Defensa de Sistemes', '98234582137', 'Defensa', 450),
('forensic-001', 'Anàlisi Forense', '55573655862', 'Forense', 550),
('hackathon', 'Repte Final', 'Gracies_Per_Participar<3', 'Especial', 1000);
